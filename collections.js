/////////////////
// Collections //
/////////////////

var wiz = wiz ||  {};
wiz.collections = {}


////////////////
// Chosen     //
////////////////

wiz.collections.Chosen = Backbone.Collection.extend ({

  model: wiz.models.Screen,
  selected: false,
  toggleSelected: function() {
    this.selected = !this.selected;
  },

  getResults: function() {
    return _.chain(this.models).map(function(m) {
      if (m.get("buttons") !== undefined) {
        if (m.get("chosenBid") !== undefined) {
          if (m.get("buttons")[m.get("chosenBid")]["Button Result Text"] !== undefined) {
            return m.get("buttons")[m.get("chosenBid")]["Button Result Text"]["#markup"];
          }
        }
      }
    }, this).filter(_.identity).value();
  }
});

wiz.collections.chosen = new wiz.collections.Chosen({});

wiz.collections.chosen.on("add", function(m) {

  // Remove any existing wizard dom and events.

  // Trigger rendering of the newly added model.
   var model = this.find({
     Nid: m.get("Nid")
   });

  var view = new wiz.views.Wizard({
    model: model
  });

  showView(view, "wiz");

});


wiz.collections.Screens = Backbone.Collection.extend({

  model: wiz.models.Screen,

  url: "http://homer/api/json/business-portal-wizard",

  getSections: function() {
    return _.chain(
      wiz.collections.screens.models).map(
      function(m) {
        var name = m.get("Name");
        var tid = m.get("section").tid;
        var icon = m.get("icon");
        var jurisdiction = m.get("jurisdiction");
        var id = name.charAt(0);
        var re = /^\d+/i;
        if (id.match(re)) {
          return {
            id: id,
            name: name,
            tid: tid,
            icon: icon
          }
        };
      })
      .filter(_.identity)
      .unique(
        function(o) {
          return o.id;
        })
      .sortBy(
          function(o) {
            return o.id;
          }).value();
  },

  getScreensBySectionId: function(sectionId) {
    return  _.filter(this.models, function(s){
      // console.log("screen", s.get("section").tid);
      // console.log("section id", sectionId);
      return s.get("section").tid === sectionId;
    }, this);
  }
});
