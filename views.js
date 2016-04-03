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

     _.each(buttons, function(button) {
      var view =  new namespace.views.ButtonView({model: button});
       that.$el.append(view.render().el);
    });
    return this;
  }
});


namespace.views.ButtonView = Backbone.View.extend({
  tagName: "div",

  className: "changeme",

  events: {
    "click .wizard__button": "transitionUp",
    "click .wizard__button": "tranistionDown",
  },

  transitionUp: function() {
    console.log("Transition up");
    event.preventDefault();
    this.model.set({selected: true});
},

  buttonTemplate: _.template('<a href="{{id}}" class="wizard__button">{{title}}</a>'),
  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.buttonTemplate({title: this.model.buttonTitle, id: this.model.id}));
    return this;
  }
});
