var namespace = namespace || {};

(function($) { 

    ///////////////////////////////////////////
    // Create backbone collection "screens". //
    ///////////////////////////////////////////

namespace.collections.screens = new namespace.collections.Screens();

namespace.collections.screens.fetch({

  success: function() {



    // @TODO -add first screen checkbox to drupal.
    namespace.views.wizard = new namespace.views.Wizard({ model : namespace.collections.screens.find({screen_id: "1"}) });
    
    // Set the current screen on the wizard.
    namespace.views.wizard.setScreen(namespace.collections.screens.first().get("id"));

    namespace.views.nav =  new namespace.views.Nav();

    // @ TODO loading sections dynamically, possible?
    //    namespace.views.progress =  new namespace.views.Progress().render().el;

    $(".wizard__content-block").html(namespace.views.wizard.render().el);


  }
});

})(jQuery);
