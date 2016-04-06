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

  currentScreen: 0,

  selected: false,

  initialize: function(){
    new namespace.views.Nav();
  },

  getCurrentScreen: function() {
    return parseInt(this.currentScreen);
  },

  /* Set the currentScreen Property. */
  setScreen: function(screenId) {
    this.currentScreen = screenId;
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

  screenTemplate: _.template('<h1 id="section-title" class="wizard__question">{{sectionTitle}}</h1>{{ title }} <br /> <div class="wizard__tip">{{ description}}</div>'),

  render: function(){
    console.log("wizard view: ", this);
    this.$el.html(this.screenTemplate(this.model.toJSON()));
    var buttonsView = new namespace.views.ButtonsView({ model: this.model });
    buttonsView.render();
    return this;
  }
});

/////////////
// Buttons //
/////////////

namespace.views.ButtonsView = Backbone.View.extend({
  el: ".wizard__buttons",

  buttonsTemplate: _.template('<a href="{{id}}" class="">{{title}}</a>'),

  render: function() {
    this.$el.find("a").remove();
    var buttons = this.model.get("buttons");
    var that = this;
     _.each(buttons, function(b) {
       var buttonView =  new namespace.views.ButtonView({button: b, model: that.model});
       that.$el.append(buttonView.render().el);
    });
    return this;
  }
});

//////////////
// A Button //
//////////////

namespace.views.ButtonView = Backbone.View.extend({

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
    this.$el.toggleClass("active");
    event.preventDefault();
},

  render: function() {
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
    $(".wizard__content-block").append(namespace.views.wizard.render().el);
  }

});




