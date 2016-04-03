  // Model construction.

var namespace = namespace ||  {};
namespace.models = {};

namespace.models.Screen = Backbone.Model.extend({
  defaults: {
    foo: "default"
  }
});

namespace.models.Button = Backbone.Model.extend({
  defaults: {
    selected: false,
    title: "untitled",
    result: "resultless",
    anchor: "1"
  }
});



