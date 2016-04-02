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
  screenTemplate: _.template('<h1 id="section-title">{{sectionTitle}}</h1>{{ title }} <br /> <p id="screen-instructions">{{ description}}</p>'),
  render: function(){
    console.log(this.model.toJSON());
    this.$el.html(this.screenTemplate(this.model.toJSON()));
    // Buttons render here.
//    var buttonsView = new namespace.views.ButtonsView({ el: '#buttons', model: this.model });
  }
});


namespace.views.ButtonsView = Backbone.View.extend({

  initialize: function() {
    this.render();
  },

  events: {
    "click .but": "transitionUp",
    "click .but": "tranistionDown",
},

  transitionUp: function() {
    console.log("Transition up");
    event.preventDefault();
},

  tranistionDown: function() {
    console.log("Transition down");
    this.model.set({selected: true});
    console.log("sel: ", this.model.get('selected'));
    event.preventDefault();
  },

  render: function() {
    // Move loop into parent function.
    var buttons = this.model.get("buttons");
    var b = '';
     _.each(buttons, function(button) {
       var compiled = _.template('<a href="" class="but button"><%= title %></a>');
       b = b + compiled({title: button.buttonTitle});
    });
    console.log(this);
    $(this.el).html(b);
  }
});

