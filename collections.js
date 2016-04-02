/////////////////
// Collections //
/////////////////

var namespace = namespace ||  {};
namespace.collections = {}

namespace.collections.Screens = Backbone.Collection.extend({
      model: namespace.models.Screen    
});

// Create backbone collection "screens".
namespace.collections.screens = new namespace.collections.Screens();

// Add "screen" models to our backbone "screens" collection.
_.each(bp_wizard_data, function(obj, index) {
  var s = new namespace.models.Screen({
    id: obj.screenId,
    buttons: obj.buttons,
    sectionTitle:            obj.sectionTitle,
    title:             obj.screenTitle,
    description:       obj.screenDescription
  });  
  namespace.collections.screens.add(s);
});


