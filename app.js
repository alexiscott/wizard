var namespace = namespace || {};

// Make view from first model in collection.
namespace.views.wiz = new namespace.views.wizard({ model : namespace.collections.screens.first() });

