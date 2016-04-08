var namespace = namespace || {};

// Make view from first model in collection.
namespace.views.wizard = new namespace.views.Wizard({ model : namespace.collections.screens.first() });
namespace.views.wizard.setScreen(namespace.collections.screens.first().get("id"));

namespace.views.nav =  new namespace.views.Nav();

namespace.views.progress =  new namespace.views.Progress().render().el;

$(".wizard__content-block").html(namespace.views.wizard.render().el);
