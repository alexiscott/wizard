/////////////////
// Collections //
/////////////////

var namespace = namespace ||  {};
namespace.collections = {}

namespace.collections.Screens = Backbone.Collection.extend({

  model: namespace.models.Screen,

  url: "http://homer/api/json/business-portal-wizard",

  chosen: function () {
    return this.where({chosen: true});
  },
    
});


//////////////
// Sections //
//////////////

namespace.collections.Sections = Backbone.Collection.extend({
    model: namespace.models.Section
});

namespace.collections.sections = new namespace.collections.Sections();

_.each(sections_lookup, function(t, id) {

  var section = new namespace.models.Section({id: parseInt(id), title: t});
  
  namespace.collections.sections.add(section);

});

