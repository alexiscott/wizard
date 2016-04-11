var namespace = namespace || {};
namespace.views = {};

// User moustachs style templates.
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g

};

////////////
// Wizard //
////////////

namespace.views.Wizard = Backbone.View.extend({

  tagName: 'div',

  currentScreen: undefined,

  selected: false,

  getCurrentScreen: function() {
    return this.currentScreen;
  },

  /* Set the currentScreen Property. */
  setScreen: function(screenId) {
    this.currentScreen = screenId;
  },

  setDataResult: function(result) {
    if (!_.isEmpty(result)) {
      this.model.set({chosenResult: result});
    }
  },
  setScreenChosen: function() {
    this.model.set({chosen: true});
  },

  isConfirmationScreen: function() {
   return parseInt(this.model.get("Confirmation Screen"));
  },

  advanceScreen: function() {
    if (this.selected && !this.isConfirmationScreen()) {
      this.selected = false;
      return true;
    }
   return false;
  },

  goBackScreen: function() {
    // @TODO Check for multiple back clicks.
    if (this.getCurrentScreen !== 0) {
      var chosen = _.last(namespace.collections.screens.chosen());
      this.setScreen(chosen.get("id"));
      return true;
    }
    return false;
  },

  screenTemplate: _.template('<h1 id="section-title" class="wizard__question">{{section.tid}} / {{Name}} </h1>{{ title }} <br /> <div class="wizard__tip">{{Description}}</div>'),

  render: function(){
    
    // If on the results page just print that out:
    if (this.model.get("Confirmation Screen") === "1") {
      var resultsView = new namespace.views.ResultsView({ collection: this.collection });
      return true;
    } else {
      this.$el.html(this.screenTemplate(this.model.toJSON()));
      $("#wizard").css("background", this.model.get("Color"));
      // @TODO fix button selection class logic
      var buttonsView = new namespace.views.Buttons({ model: this.model });
      buttonsView.render();
    }
    return this;
  }
});

/////////////
// Buttons //
/////////////

namespace.views.Buttons = Backbone.View.extend({
  el: ".wizard__buttons",

  render: function() {
    this.$el.find("a").remove();
    var buttons = this.model.get("buttons");
     _.each(buttons, function(b) {
       var buttonView =  new namespace.views.Button({button: b, model: this.model});
       this.$el.append(buttonView.render().el);
    }, this);
    return this;
  }
});

//////////////
// A Button //
//////////////

namespace.views.Button = Backbone.View.extend({

  tagName: "a",

  className: "wizard__button",

  initialize: function(options) {
    this.options = options || {};
    this.button = this.options.button;
  },

  events: {
    "click": "markSelected"
  },

  /* Mark selected, used for forward arrow functionality. 
   * And setup the next screen from the DOM.
   */
  markSelected: function(event) {
    namespace.views.wizard.selected = true;
    namespace.views.wizard.setScreen($(event.currentTarget).attr("go-to-id"));
    namespace.views.wizard.setDataResult($(event.currentTarget).attr("d-result"));
    this.$el.toggleClass("active");
    event.preventDefault();
},

  render: function() {
    this.$el.attr("d-result", this.button["Button Result Text"]["#markup"]);
    this.$el.attr("go-to-id", this.button["Destination Screen"]["target_id"]);
    this.$el.attr("href", "#");
    this.$el.text(this.button["Button Title"]["#markup"]);
    return this;
  }
});

/////////
// Nav //
/////////

namespace.views.Nav = Backbone.View.extend({
  el: ".wizard__nav",
  
  events:  {
    "click .wizard__arrow-up": "backArrowClick",
    "click .wizard__arrow-down": "forwardArrowClick"
  },

  backArrowClick: function(event) {
    if(namespace.views.wizard.goBackScreen()) {
      this.render();
    };

    event.preventDefault();
  },

  forwardArrowClick: function(event) {

    if(namespace.views.wizard.advanceScreen()) {
      this.render();
    }
    event.preventDefault();
  },

  render: function() {
    namespace.views.wizard.setScreenChosen();
    namespace.views.wizard.remove();

     namespace.views.wizard = new namespace.views.Wizard({ 
       model : namespace.collections.screens.find({
         Nid: namespace.views.wizard.getCurrentScreen()
       }) 
     });

    Backbone.trigger("current:update");
    $(".wizard__content-block").append(namespace.views.wizard.render().el);
  }

});


////////////////////////
// // Results View /////
////////////////////////

namespace.views.ResultsView = Backbone.View.extend({

  el: ".wizard__content--results-list",

  initialize: function() {
    this.$el.append("<h5>Results</h5>");
    var r = _.each(namespace.collections.screens.chosen(), function(s) {
      if (s.get("chosenResult") !== undefined) {
       var resultView =  new namespace.views.Result({model: s});
       this.$el.append(resultView.render().el);
      }
    }, this); 
  }
});

////////////
// Result //
////////////

namespace.views.Result = Backbone.View.extend({
  
  tagName: "li",
  
  render: function() {
    this.$el.html(this.model.get("chosenResult"));    
    return this;
  }

});


//////////////
// Progress //
//////////////


namespace.views.Progress = Backbone.View.extend({
  
  el: ".wizard__progress-bar",

  initialize: function() {
    Backbone.on("current:update", this.render, this);
  },

  render: function() {
    this.$el.find("ul").remove();
    this.$el.find("li").remove();

    var progress = namespace.collections.sections.models;

    _.each(progress, function(section) {
      var s = new namespace.views.Section({model: section}).render().el;
      this.$el.append(s);
    }, this);

    return this;
  }

});


namespace.views.Section = Backbone.View.extend({
  
  tagName: "li",

  template: _.template("<h5>{{name}}</h5>"),
  
  render: function() {
    this.$el.append(this.template({name: this.model.get("title")}));    
    var sectionSteps = new namespace.views.SectionSteps({sectionId: this.model.get("id")}).render().el;
    this.$el.append(sectionSteps);
    return this;
  }

});


namespace.views.SectionSteps = Backbone.View.extend({

  tagName: "ul",

  initialize: function(options) {
    this.options = options || {};
    this.sectionId = this.options.sectionId;
  },

  render:function() {
    
    // @TODO move this method into the collection.
    // @TODO Sort screen by section ID.
    var screens = _.filter(namespace.collections.screens.models, function(s){
      return s.attributes.section.tid === this.sectionId;
    }, this);

    var graphic;    
    _.each(screens, function(s) {
      if (s.get("Nid") === namespace.views.wizard.model.get("Nid")) {
        graphic = " O ";
      } else {
        graphic = " | ";
      }
      var sectionStepItem = new namespace.views.SectionStepItem({graphic: graphic}).render().el;
      this.$el.append(sectionStepItem);
    }, this );
    return this;
  }
});



namespace.views.SectionStepItem = Backbone.View.extend({
  tagName: "li",

  initialize: function(options) {
    this.options = options || {};
    this.graphic = this.options.graphic;
  },

  render: function() {
    this.$el.html(this.graphic);
    return this;
  }
});
