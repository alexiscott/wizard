var namespace = namespace || {};

(function($) { 

  ///////////////////////////////////////////
  // Create backbone collection "screens". //
  ///////////////////////////////////////////

namespace.collections.screens = new namespace.collections.Screens();

namespace.collections.screens.fetch({

  success: function(data) {
    
    // Initialize the Wizard for rendering with the first model.
    namespace.views.wizard = new namespace.views.Wizard({
      model: namespace.collections.screens.find({Nid: "19"}, this)
    });
    
    namespace.views.wizard.model.set({
      current: true, 
      first: true, 
      chosen: true});

    // Add sections models to the sections collection.
    _.each(data.models, function(screen) {
     var section = new namespace.models.Section({id: screen.get("section").tid, title: screen.get("Name")});
      namespace.collections.sections.add(section);
    });

    // Initialize nav.
    new namespace.views.Nav({});

  }
});

})(jQuery);
