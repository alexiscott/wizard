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

  tagName: 'li',

  selected: false,

  nextScreen: 0,

  setNextScreen: function(screenId) {
    this.nextScreen = screenId;
  },

  initialize: function(){
    this.render();
    new namespace.views.Nav();
  },
  screenTemplate: _.template('<h1 id="section-title" class="wizard__question">{{sectionTitle}}</h1>{{ title }} <br /> <div class="wizard__tip">{{ description}}</div>'),
  render: function(){
     console.log("THIS", this);
    this.$el.html(this.screenTemplate(this.model.toJSON()));
    var buttonsView = new namespace.views.ButtonsView({ model: this.model });
    return this;
  }
});

/////////////
// Buttons //
/////////////

namespace.views.ButtonsView = Backbone.View.extend({
  el: ".wizard__buttons",

  initialize: function() {
    this.render();
  },

  buttonsTemplate: _.template('<a href="{{id}}" class="">{{title}}</a>'),

  render: function() {
    var buttons = this.model.get("buttons");
    var that = this;
       that.$el.html("");
     _.each(buttons, function(b) {
       var view =  new namespace.views.ButtonView({button: b});
       that.$el.append(view.render().el);
    });
    return this;
  }
});

////////////
// Button //
////////////

namespace.views.ButtonView = Backbone.View.extend({
  tagName: "div",

  className: "buttons",
  initialize: function(options) {
    this.options = options || {};
    this.button = this.options.button;
  },

  events: {
    "click .wizard__button": "markSelected"
  },

  markSelected: function() {
  //  console.log("Mark selected", this);
    // Set  controller:
    namespace.views.wizard.selected = true;
    namespace.views.wizard.nextSlide = this.button.buttonLinkTo;
    //console.log("THIS", this.nextSlide);
    event.preventDefault();
},

  buttonTemplate: _.template('<a href="{{id}}" class="wizard__button button">{{title}}</a>'),

  render: function() {
    this.$el.html(this.buttonTemplate({title: this.button.buttonTitle, id: this.button.id}));
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
    namespace.views.wizard.setNextScreen(3);
    console.log("Event target:", e.currentTarget);
    console.log("next scr:", namespace.views.wizard.nextScreen);
    this.render(namespace.views.wizard.nextScreen);
  },

  render: function(slideId) {
//    this.$el.html("NAV");
    //console.log("FIND", namespace.collections.screens.find({id: 4}));

    // Remove el 
    namespace.views.wizard.remove();

    console.log("slide", slideId);
    namespace.views.wizard = new namespace.views.Wizard({ model : namespace.collections.screens.find({id: 4}) });

$(".c").append(namespace.views.wizard.render().el);

   // namespace.views.wiz.unbind();
//   var newScreen =  namespace.collections.screens.find({id: slideId}) 
    console.log("new Screen: ", this.model);
//   var w = new namespace.views.wizard({ model : newScreen});
//    var foo =  namespace.views.wizard({ model : namespace.collections.screens.first() });
//    console.log("foo", foo);
  }

});




