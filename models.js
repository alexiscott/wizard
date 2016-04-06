  // Model constructor Screen.

var namespace = namespace ||  {};
namespace.models = {};

namespace.models.Screen = Backbone.Model.extend({
  defaults: {
    chosen: false,
    selected: false
  },

  setSelected: function() {
    this.set({selected: true});
  },


});




