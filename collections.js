/*
 * Collections
 */

var wiz = wiz || {};
wiz.collections = {};

(function () {
  'use strict';

  wiz.collections.Chosen = Backbone.Collection.extend({

    model: wiz.models.Screen,

    getResults: function () {
      return _.chain(this.models).map(function (m) {
        if (!(_.isUndefined(m.get('buttons')))) {
          if (!(_.isUndefined(m.get('chosenBid')))) {
            if (!(_.isUndefined(m.get('buttons')[m.get('chosenBid')]['Button Result Text']))) {
              return m.get('buttons')[m.get('chosenBid')];
            }
          }
        }
      }, this).filter(_.identity).value();
    }
  });

  wiz.collections.chosen = new wiz.collections.Chosen({});

  wiz.collections.chosen.on('add', function (m) {

    // Trigger rendering of the newly added model.
    var model = this.find({
      Nid: m.get('Nid')
    });
    wiz.wizard = new wiz.views.Wizard({
      model: model
    });

    wiz.instance.goto(wiz.wizard);
  });


  wiz.collections.Screens = Backbone.Collection.extend({

    model: wiz.models.Screen,
    url: 'http://localhost:3412',
    // url: "http://homer/api/json/business-portal-wizard",

    getSectionIcons: function () {
      return _.chain(this.models).map(
        function (m) {
          var re = /^\d+/i;
          if (m.get('Name').match(re)) {
            return m.get('Name');
          }
        }).filter(_.identity).unique().sort().value();
    },

    getSectionIds: function () {
      return _.map(this.getSectionIcons(), function (i) {
        return i;
      }, this);
    },

    getSections: function () {
      return _.chain(
        wiz.collections.screens.models).map(
          function (m) {
            var name = m.get('Name');
            var tid = m.get('section').tid;
            var icon = m.get('icon');
            var id = name.charAt(0);
            var re = /^\d+/i;
            if (id.match(re)) {
              return {
                id: id,
                name: name,
                tid: tid,
                icon: icon
              };
            }
          })
        .filter(_.identity)
        .unique(
          function (o) {
            return o.id;
          })
        .sortBy(
          function (o) {
            return o.id;
          }).value();
    }
  });
}());
