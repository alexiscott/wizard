var namespace = namespace || {};

(function($) { 

    ///////////////////////////////////////////
    // Create backbone collection "screens". //
    ///////////////////////////////////////////

namespace.collections.screens = new namespace.collections.Screens();

namespace.collections.screens.fetch({

  success: function(data) {

    // @TODO -add first screen checkbox to drupal.
    // Initialize the Wizard for rendering.
    namespace.views.wizard = new namespace.views.Wizard({
      model: namespace.collections.screens.find({Nid: "19"}, this)
    });
    
    // Set the current screen on the wizard.
    namespace.views.wizard.setScreen(namespace.collections.screens.first().get("id"));


    // Add sections models to the sections collection.
    _.each(data.models, function(screen) {
     var section = new namespace.models.Section({id: screen.get("section").tid, title: screen.get("Name")});
      namespace.collections.sections.add(section);
    });

    // Initialize the Nav 
    new namespace.views.Nav();

    // Initialize the Progress bar and progress draw.
    new namespace.views.ProgressBar().render().el;
    new namespace.views.ProgressDrawer().render().el;

    // Render the wizard.
    $(".wizard__content-block").html(namespace.views.wizard.render().el);

  }
});

})(jQuery);
