  // Model constructor Screen.

var namespace = namespace ||  {};
namespace.models = {};


////////////
// Screen //
////////////

namespace.models.Screen = Backbone.Model.extend({
  defaults: {
    chosen: false,
    title: "",
    description: "",
    buttons: [],
    Color: "#EEEEEE"

  },
});


/////////////
// Section //
/////////////

namespace.models.Section = Backbone.Model.extend({});

