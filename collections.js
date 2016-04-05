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
    buttons:           _.map(obj.buttons, function(button) {
      return {
        dest: parseInt(button["Button Anchor Destination"]["#markup"]),
        title: button["Button Title"]["#markup"]
      };
    }),
    sectionTitle:      obj.field_section,
    title:             obj.title,
    description:       obj.field_description
  });  
  console.log("Screen adding to collection: ", s.get("buttons"));
  namespace.collections.screens.add(s);
});


