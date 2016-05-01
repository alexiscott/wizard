
var wiz = wiz || {};

(function($) {
  $( document ).ready(function() {

    // Initialize collections
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
      },

      error: function(collection, response, options) {
        console.log("Fetch error: ")
      }

    });
  });
})(jQuery);
