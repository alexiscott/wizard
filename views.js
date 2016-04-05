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

  selected: false,

  nextScreen: 0,

  previousScreen: 0,

  setSelected: function() {
    this.selected = true;
    console.log("Selected state: ", this.selected);
  },

  setPreviousScreen: function(screenId) {
    console.log("SET Previous screen ID", screenId);
    this.previousScreen = screenId;
  },

  setNextScreen: function(screenId) {
    this.nextScreen = screenId;
    console.log("SET Next screen ID", screenId);
  },

  initialize: function(){
    new namespace.views.Nav();
    this.setupInitialButtonStates();
  },

  setupInitialButtonStates() {
    /* If the first button has no title, then treat it as a buttonless screen
     *  and set the states for navigation.
     */
    console.log("Wizard model", this.model);
    var button = this.model.get("buttons")[0];
    var nextScreenId = 0;
    console.log("first button", button);
    if (button["Button Anchor Destination"]["#markup"] 
        && button['Button Title']["#markup"] === undefined ) {
      nextScreenId = parseInt(button["Button Anchor Destination"]["#markup"]);
      console.log("Next Screen ID", nextScreenId);
      this.setSelected();
      this.setNextScreen(nextScreenId);
    }
  },

  screenTemplate: _.template('<h1 id="section-title" class="wizard__question">{{sectionTitle}}</h1>{{ title }} <br /> <div class="wizard__tip">{{ description}}</div>'),

  render: function(){
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
       console.log("button", b);
       var buttonView =  new namespace.views.ButtonView({button: b});
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

  markSelected: function(e) {
    namespace.views.wizard.selected = true;
    namespace.views.wizard.setNextScreen($(e.currentTarget).attr("go-to-id"));
    
    console.log(namespace.views.wizard.nextScreen);    
    this.$el.toggleClass("active");
    console.log("event on mark selected.", e);
    event.preventDefault();
},

  render: function() {
    this.$el.attr("go-to-id", this.button["Button Anchor Destination"]["#markup"]);
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

  backArrowClick: function(e) {
    var psNum = parseInt(namespace.views.wizard.previousScreen);
    console.log("back arrow clicked");
    console.log("P", namespace.views.wizard.previousScreen);
    event.preventDefault();
    if(namespace.views.wizard.selected && psNum > 0) {
      this.render(psNum);
    }
  },

  forwardArrowClick: function(e) {
    var nsNum = parseInt(namespace.views.wizard.nextScreen);
    console.log("forward arrow clicked");
    // IF selected arrow.
    console.log("Next Number: ", nsNum);
    if(namespace.views.wizard.selected && nsNum > 0) {
      namespace.views.wizard.setPreviousScreen(nsNum);
      this.render(nsNum);
    }
    event.preventDefault();
  },

  render: function(screenNum) {
    namespace.views.wizard.remove();
    namespace.views.wizard = new namespace.views.Wizard({ model : namespace.collections.screens.find({id: screenNum }) });
    $(".wizard__content-block").append(namespace.views.wizard.render().el);

   // console.log("new Screen: ", this.model);
  }

});




