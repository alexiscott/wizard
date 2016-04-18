/////////////////
// Collections //
/////////////////

var namespace = namespace ||  {};
namespace.collections = {}

namespace.collections.Screens = Backbone.Collection.extend({

  model: namespace.models.Screen,

  url: "http://localhost:3412",

  next: function(bid) {
    var m = this.find({current: true}), nm;
    m.set({current: false});
    nm = this.find({Nid: m.get("buttons")[bid.charAt(bid.length - 1)]["Destination Screen"]["target_id"]});

    namespace.views.wizard = new namespace.views.Wizard({
      model: nm
    });
    
    nm.set({current: true});

  }


});


//////////////
// Sections //
//////////////

namespace.collections.Sections = Backbone.Collection.extend({
  model: namespace.models.Section

});

namespace.collections.sections = new namespace.collections.Sections();



