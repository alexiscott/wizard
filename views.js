var namespace = namespace || {};
namespace.views = {};

// User moustachs style templates.
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g

};

////////////
// Wizard //
////////////

var obj = {
  t: function() {
    console.log("fired t");
  }
}

namespace.views.Wizard = Backbone.View.extend({

  tagName: 'div',

  currentScreen: undefined,

  selected: false,

  getCurrentScreen: function() {
    return parseInt(this.currentScreen);
  },

  /* Set the currentScreen Property. */
  setScreen: function(screenId) {
    this.currentScreen = screenId;
  },

  setResult: function(result) {
    if (!_.isEmpty(result)) {
      this.model.set({result: result});
    }
  },
  setScreenChosen: function() {
    this.model.set({chosen: true});
  },

  advanceScreen: function() {
    if (this.selected) {
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

  screenTemplate: _.template('<h1 id="section-title" class="wizard__question">{{sectionTitle}}</h1>{{ title }} <br /> <div class="wizard__tip">{{ description}}</div>'),

  render: function(){

    if (this.model.get("resultsPage")) {
      console.log("Results Page: ");
      var resultsView = new namespace.views.ResultsView({ collection: this.collection });
      return true;
    };

    this.$el.html(this.screenTemplate(this.model.toJSON()));
    var buttonsView = new namespace.views.Buttons({ model: this.model });
    buttonsView.render();
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
    var that = this;
     _.each(buttons, function(b) {
       var buttonView =  new namespace.views.Button({button: b, model: that.model});
       that.$el.append(buttonView.render().el);
    });
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
    namespace.views.wizard.setResult($(event.currentTarget).attr("d-result"));
    this.$el.toggleClass("active");
    event.preventDefault();
},

  render: function() {
    this.$el.attr("d-result", this.button.result);
    this.$el.attr("go-to-id", this.button.dest);
    this.$el.attr("href", "#");
    this.$el.text(this.button.title);
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
    namespace.views.wizard = new namespace.views.Wizard({ model : namespace.collections.screens.find({id: namespace.views.wizard.getCurrentScreen() }) });
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
    var that = this;
    var r = _.each(namespace.collections.screens.chosen(), function(s) {
      if (s.get("result") !== undefined) {
       var resultView =  new namespace.views.Result({model: s});
       that.$el.append(resultView.render().el);
      }
    }); 

  }
});

////////////
// Result //
////////////

namespace.views.Result = Backbone.View.extend({
  
  tagName: "li",
  
  render: function() {
    this.$el.text(this.model.get("result"));    
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
    this.on("h", this.render);
  },

  render:function() {
    var screens = namespace.collections.screens.where({sectionId: this.sectionId});
    var graphic;    
    _.each(screens, function(s) {

      if (s.get("id") === namespace.views.wizard.model.get("id")) {
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
