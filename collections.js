/////////////////
// Collections //
/////////////////

var namespace = namespace ||  {};
namespace.collections = {}

namespace.collections.Screens = Backbone.Collection.extend({
  model: namespace.models.Screen,

  //localStorage: new Backbone.LocalStorage('todos-backbone'),

  chosen: function () {
    return this.where({chosen: true});
  },


    
});

// Create backbone collection "screens".
namespace.collections.screens = new namespace.collections.Screens();

// Add "screen" models to our backbone "screens" collection.
_.each(bp_wizard_data, function(obj, index) {

  var screenId = parseInt(obj.field_screen_id);

  var s = new namespace.models.Screen({

    id:                screenId, // Use integer in JSON?
    buttons:           _.map(obj.buttons, function(button) {
      return {
        dest: parseInt(button["Button Anchor Destination"]["#markup"]),
        title: button["Button Title"]["#markup"],
        result: button["Button Result"]["#markup"],
      };
    }),
    sectionTitle:     sections_lookup[obj.field_section],
    sectionCssId:     "section-" + obj.field_section,
    title:            obj.title,
    description:      obj.field_description
  });  
  namespace.collections.screens.add(s);
});

namespace.collections.screens.models[2].set({resultsPage: true}); // CHANGE to last().




