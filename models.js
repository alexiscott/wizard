  // Model constructor Screen.

var namespace = namespace ||  {};
namespace.models = {};


////////////
// Screen //
////////////

namespace.models.Screen = Backbone.Model.extend({
  defaults: {
    chosen: false,
    resultsPage: false,
    title: "",
    description: "",
    buttons: []

  },
});


/////////////
// Section //
/////////////

namespace.models.Section = Backbone.Model.extend({});

