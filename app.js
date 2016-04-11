var namespace = namespace || {};

(function($) { 

    ///////////////////////////////////////////
    // Create backbone collection "screens". //
    ///////////////////////////////////////////

namespace.collections.screens = new namespace.collections.Screens();

namespace.collections.screens.fetch({

  success: function() {


    // This should come from property in node.
//    this.last().set({resultsPage: true}); // CHANGE to last() or FLag @TODO


    // Make view from first model in collection.
    // @TODO -add first screen checkbox to drupal.
    namespace.views.wizard = new namespace.views.Wizard({ model : namespace.collections.screens.find({screen_id: "1"}) });
    
    // Set the current screen in the wizard.
    namespace.views.wizard.setScreen(namespace.collections.screens.first().get("id"));

    namespace.views.nav =  new namespace.views.Nav();

    namespace.views.progress =  new namespace.views.Progress().render().el;

    $(".wizard__content-block").html(namespace.views.wizard.render().el);


  }
});

})(jQuery);
