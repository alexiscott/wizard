/////////////////
// Collections //
/////////////////

var namespace = namespace ||  {};
namespace.collections = {}

namespace.collections.Screens = Backbone.Collection.extend({

  model: namespace.models.Screen,

  url: "http://localhost:3412",

  prev: function() {
    if (namespace.controller.chosen.length > 1) {
      namespace.controller.chosen.pop();
      var m = this.find({current: true}), nm;
      m.set({current: false});
      nm = this.find({
        Nid: _.last(namespace.controller.chosen)
      });
      namespace.views.wizard = new namespace.views.Wizard({
        model: nm
      });
      nm.set({chosen: true,current: true});
    }
    this.logging();
  },

  next: function(bid) {
    var m = this.find({current: true}), nm;
    m.set({current: false});
    // New model nm
    nm = this.find({
      Nid: m.get("buttons")[bid.charAt(bid.length - 1)]["Destination Screen"]["target_id"]
    });
    namespace.controller.chosen.push(nm.get("Nid"));
    namespace.views.wizard = new namespace.views.Wizard({
      model: nm
    });    
    nm.set({chosen: true, current: true, bid: bid});
    this.logging();
  },

  getResults: function() {
    return _.map(namespace.controller.chosen, function(s) {
      var m;
      m = this.find({
        Nid: s
      });      
      console.log("m", m);
      var bid = m.get("bid");
      return m.get("buttons")[bid.charAt(bid.length - 1)]["Button Result Text"]["#markup"]; 
      

    }, this);
  },

  logging: function() {
    console.log(namespace.controller.chosen);
  },

});


//////////////
// Sections //
//////////////

namespace.collections.Sections = Backbone.Collection.extend({
  model: namespace.models.Section

});

namespace.collections.sections = new namespace.collections.Sections();



