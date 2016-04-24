
var wiz = wiz || {};

(function($) {
  $( document ).ready(function() {

    
    window.wiz.instance = new wiz.views.App();

    // Initialize collection.
    wiz.collections.screens = new wiz.collections.Screens();
    wiz.collections.screens.fetch({

      async: false,

      success: function(data) {

        // Add the start screen to the chosen collection.
        var m = wiz.collections.screens.find({"screen-type": "start"}, this);
        if (m === undefined) {
          console.log("APP ERROR: You will need a start screen defined.");
          return;
        } else {
          wiz.collections.chosen.add(m);
        }

        // Add sections models to the sections collection.
        _.each(data.models, function(screen) {
          var section = new wiz.models.Section({id: screen.get("section").tid, title: screen.get("Name")});
          wiz.collections.sections.add(section);
        });
      },

      error: function(collection, response, options) {
        console.log("Fetch error: ")
      }

    });
  });
})(jQuery);
