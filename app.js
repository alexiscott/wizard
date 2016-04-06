var namespace = namespace || {};

// Make view from first model in collection.
namespace.views.wizard = new namespace.views.Wizard({ model : namespace.collections.screens.first() });

namespace.views.nav =  new namespace.views.Nav();

$(".wizard__content-block").html(namespace.views.wizard.render().el);
