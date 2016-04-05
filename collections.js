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

    id:                parseInt(obj.field_screen_id), // Use integer in JSON?
    buttons:           obj.buttons,
    sectionTitle:      obj.field_section,
    title:             obj.title,
    description:       obj.field_description
  });  
  namespace.collections.screens.add(s);
});


