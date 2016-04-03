var namespace = namespace || {};
namespace.views = {};

// User moustach style templates.
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g

};

namespace.views.wizard = Backbone.View.extend({
  el: "#current-step-container",
  initialize: function(){
    this.render();
  },
  screenTemplate: _.template('<h1 id="section-title" class="wizard__question">{{sectionTitle}}</h1>{{ title }} <br /> <div class="wizard__tip">{{ description}}</div>'),
  render: function(){
    console.log(this.model.toJSON());
    this.$el.html(this.screenTemplate(this.model.toJSON()));
    var buttonsView = new namespace.views.ButtonsView({ model: this.model });
    return this;
  }
});


namespace.views.ButtonsView = Backbone.View.extend({
  el: ".wizard__buttons",

  initialize: function() {
    this.render();
  },

  buttonsTemplate: _.template('<a href="{{id}}" class="">{{title}}</a>'),

  render: function() {
    var buttons = this.model.get("buttons");
    var that = this;
     _.each(buttons, function(b) {
       var view =  new namespace.views.ButtonView({button: b});
       that.$el.append(view.render().el);
    });
    return this;
  }
});


namespace.views.ButtonView = Backbone.View.extend({
  tagName: "div",

  selected: false,

  nextSlide: 0,

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
    this.selected = true;
   this.nextSlide = this.button.buttonLinkTo;
    console.log("THIS", this.nextSlide);
    event.preventDefault();
},

  buttonTemplate: _.template('<a href="{{id}}" class="wizard__button button">{{title}}</a>'),

  render: function() {
    this.$el.html(this.buttonTemplate({title: this.button.buttonTitle, id: this.button.id}));
    return this;
  }
});


namespace.views.Nav = Backbone.View.extend({
  el: ".wizard__nav",
  
  events:  {
    "click .wizard__arrow-up": "arrowClick",
    "click .wizard__arrow-down--filled": "arrowClick"
  },

  initialize: function() {
    this.render();
  },
  
  arrowClick: function(e) {
    console.log(e.currentTarget);
  },

  render: function() {
//    this.$el.html("NAV");
  }

});

var nav = new namespace.views.Nav();
