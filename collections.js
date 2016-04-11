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



