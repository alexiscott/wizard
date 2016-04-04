var namespace = namespace || {};

// Make view from first model in collection.
namespace.views.wizard = new namespace.views.Wizard({ model : namespace.collections.screens.first() });

$(".c").append(namespace.views.wizard.render().el);
