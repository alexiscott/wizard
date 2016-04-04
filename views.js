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

  setNextScreen: function(screenId) {
    this.nextScreen = screenId;
  },

  initialize: function(){
    new namespace.views.Nav();
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
       var buttonView =  new namespace.views.ButtonView({button: b});
       that.$el.append(buttonView.render().el);
    });
    return this;
  }
});

////////////
// Button //
////////////

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
    console.log("e", e);
    event.preventDefault();
},

  render: function() {
    console.log("el", this.button.buttonLinkTo);
    this.$el.attr("go-to-id", this.button.buttonLinkTo);
    this.$el.attr("href", "#");
    this.$el.text(this.button.buttonTitle);
    return this;
  }
});

/////////
// Nav //
/////////

namespace.views.Nav = Backbone.View.extend({
  el: ".wizard__nav",
  
  events:  {
    "click .wizard__arrow-up": "arrowClick",
    "click .wizard__arrow-down--filled": "arrowClick"
  },

  arrowClick: function(e) {
    // IF selected arrow.
    if(namespace.views.wizard.selected) {
      this.render();
    }
  },

  render: function() {
    var nsNum = parseInt(namespace.views.wizard.nextScreen);
    namespace.views.wizard.remove();
    namespace.views.wizard = new namespace.views.Wizard({ model : namespace.collections.screens.find({id: nsNum }) });
    $(".wizard__content-block").append(namespace.views.wizard.render().el);

   // console.log("new Screen: ", this.model);
  }

});




