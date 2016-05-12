  // Model constructor Screen.

var wiz = wiz || {};
wiz.models = {};

(function ($) {
  'use strict';

  wiz.models.Screen = Backbone.Model.extend({
    defaults: {
      chosen: false,
      title: '',
      description: '',
      buttons: [],
      Color: '#EEEEEE',
      next: '',
      chosenResultText: '',
      selected: false
    },

    initialize: function () {
      this.setNextScreen();
    },

    controlSelected: function (bidString) {
      var storedBid = this.get('chosenBid');
      var bid = bidString.charAt(bidString.length - 1);
      if (bid !== storedBid) {
        this.set({
          selected: true,
          storedBid: bid
        });
      }
      if (bid === storedBid) {
        this.set({selected: !this.get('selected')});
      }
    },

  // This is called when a button is clicked on.
    setNext: function (bidString) {
      var bid = bidString.charAt(bidString.length - 1);
      if (!(_.isUndefined(this.get('buttons')[bid]['Destination Screen']))) {
        this.set({
          next: this.get('buttons')[bid]['Destination Screen']['target_id'],
          chosenBid: bid
        });
      }
      else {
        return;
      }
    },

  // This is called on model initialising.
    setNextScreen: function () {
    // Set the next screen, when we have that information available:
      switch (this.get('buttons').length) {
        case 1:
        case 2:
          if (!(_.isUndefined(this.get('buttons')[0]['Destination Screen']))) {
            this.set(
              {next: this.get('buttons')[0]['Destination Screen']['target_id']});
          }
          break;
      }
    }

  });

})(jQuery);
