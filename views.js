var wiz = wiz || {};
wiz.views = {};
wiz.extensions = {};

// User moustachs style templates.
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g

};


(function($) {
  $( document ).ready(function() {

    ////////////////
    // Extensions //
    ////////////////

    wiz.extensions.View = Backbone.View.extend({

      render: function(options) {

        options = options || {};

        if (options.page === true) {
          this.$el.addClass('page');
        }

        return this;

      },

      transitionIn: function (callback) {

        var view = this, delay

        var transitionIn = function () {
          view.$el.addClass('is-visible');
          view.$el.on('transitionend', function () {
            if (_.isFunction(callback)) {
              callback();
            }
          })
        };

        _.delay(transitionIn, 20);

      },

      transitionOut: function (callback) {

        var view = this;

        view.$el.removeClass('is-visible');
        view.$el.on('transitionend', function () {
          if (_.isFunction(callback)) {
            callback();
          };
        });

      }

    });


/////////
// APP //
/////////

wiz.views.App = wiz.extensions.View.extend({
  el: "#wizard",
  
  goto: function (view) {

    var previous = this.currentPage || null;
    var next = view;

    if (previous) {
      previous.transitionOut(function () {
        previous.remove();
      });
    }

    next.render({ page: true });
    this.$el.append( next.$el );
    next.transitionIn();
    this.currentPage = next;
  }
});


    ////////////
    // Wizard //
    ////////////

    wiz.views.Wizard = wiz.extensions.View.extend({

      className: "wizard",

      render: function() {

        // Clean up dom elements and events.// @TODO needed now we remove the whole view?
        // $(".wizard__buttons").find("a").remove();

        var header = new wiz.views.Header({model: this.model});
        this.$el.append(header.render().el);

        var nav = new wiz.views.Nav({model: this.model});
        this.$el.append(nav.render().el);

        var bar = new wiz.views.ProgressBar();
        this.$el.append(bar.render().el);

        // var drawer = new wiz.views.ProgressDrawer({model: this.model});
        // this.$el.append(drawer.render().el);

        // Styles for all sections:
        this.$el.css("background", "#" + this.model.get("Primary Color"));


        switch (this.model.get("screen-type")) {
        case "start":
          console.log("APP: Start");
          var intro = new wiz.views.Intro({ model: this.model });
          this.$el.append(intro.render().el);
          break;
        case "section":
          console.log("APP: Section");
          var intro = new wiz.views.IntroWithIllustration({ model: this.model });
          this.$el.append(intro.render().el);
          break;
        case "question":
          console.log("APP: question");
          var buttons = new wiz.views.Buttons({ model: this.model });
          this.$el.append(buttons.render().el);
          break;
        default:
          console.log("APP: No screen type defined");
          break;
        }

        return wiz.extensions.View.prototype.render.apply(this, arguments);
      }
    });

////////////
// Header //
////////////

wiz.views.Header = Backbone.View.extend({
  el: ".wizard__header",
  template: _.template($('#header-template').html()),
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});


///////////
// Intro //
///////////

wiz.views.Intro = Backbone.View.extend({
  className: ".wizard__intro-block",
  template: _.template($('#intro').html()),
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

/////////////////////////////
// Intro with Illustration //
/////////////////////////////

wiz.views.IntroWithIllustration = Backbone.View.extend({
  className: ".wizard__intro-block",
  template: _.template($('#intro-with-illustration').html()),
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});


/////////////
// Buttons //
/////////////

wiz.views.Buttons = Backbone.View.extend({
  className: "wizard__buttons",
  template: _.template($('#buttons').html()),

  render: function() {
    var buttons = this.model.get("buttons");
      if (buttons.length > 0) {
        _.each(buttons, function(b, index) {
          console.log("style", b.Style);
          if (b.Style["#markup"] === "Button") {
            var button =  new wiz.views.Button({
              button: b,
              model: this.model,
              index: index,
              className: "wizard__button"
            });
            // @TODO fix so as to include wrapper.
//           this.$el.html(this.template(this.model.toJSON()));
            this.$el.append(button.render().el);
          }
          if (b.Style["#markup"] === "Link") {
            var button =  new wiz.views.Button({
              button: b,
              model: this.model,
              index: index,
              className: "wizard__tip_button"
            });
            this.$el.append(button.render().el);
          }
          if (b.Style["#markup"] === "Next") {
            // Set selected.
          }
        }, this);
      }
    return this;
  }
});

//////////////
// A Button //
//////////////

wiz.views.Button = Backbone.View.extend({

  tagName: "a",

  initialize: function(options) {
    this.options = options || {};
    this.button = this.options.button;
    this.index = this.options.index;
  },

  events: {
    "click": "markSelected"
  },

  markSelected: function(event) {
    wiz.collections.chosen.toggleSelected();
     if (wiz.collections.chosen.selected) {
       this.$el.addClass("wizard__button--selected");
     } else {
       $(".wizard__button").removeClass("wizard__button--selected");
    }
    var m = wiz.collections.chosen.last();
    var bidString =  $(event.currentTarget).attr("id");
    var bid = bidString.charAt(bidString.length -1);
    if (m.get("buttons")[bid]["Destination Screen"] !== undefined) {
      var nid = m.get("buttons")[bid]["Destination Screen"]["target_id"];
    } else {
      console.log("APP: Destination screen not defined.");
      return;
    }
    // @TODO check for undefined button results.
    //var resultText =  m.get("buttons")[bid]["Button Result Text"]["#markup"];

    m.set({
      next: nid,
      chosenBid: bid,
      chosenResultText: "@TODO"
    });

    event.preventDefault();
},

  render: function() {
    this.$el.attr("href", "#");
    this.$el.attr("id", "button-id-" + this.index);
    this.$el.text(this.button["Button Title"]["#markup"]);
    return this;
  }
});



/////////
// Nav //
/////////

wiz.views.Nav = Backbone.View.extend({
 
 className: "wizard__nav",

  initialize: function() {
//    this.$el.find(".wizard__arrow-up").hide();
  },

  events:  {
    "click .wizard__arrow-up": "backArrowClick",
    "click .wizard__arrow-down": "forwardArrowClick"
  },

  backArrowClick: function() {

    if (wiz.collections.chosen.length > 1) {
      var last = wiz.collections.chosen.last();
      wiz.collections.chosen.remove(last);

      var view = new wiz.views.Wizard({
        model:  wiz.collections.chosen.last()
      });
      wiz.instance.goto(view);
    }

    event.preventDefault();
  },

  forwardArrowClick: function(event) {
    var m =  wiz.collections.screens.find({
      "Nid": this.model.get("next")
    });
    wiz.collections.chosen.add(m);
    event.preventDefault();
  },

  render: function() {
    var arrows = new wiz.views.NavArrows();
    this.$el.append(arrows.render().el);
    return this;
  }

});


////////////////
// NAV ARROWS //
////////////////

wiz.views.NavArrows = Backbone.View.extend({
  tagName: "a",

   navTemplate: _.template('<a href="#" class="wizard__arrow-up">back</a><a href="#" class="wizard__arrow-down">forward</a>'),

  render: function() {
    this.$el.html("FOOBAR");
    this.$el.html(this.navTemplate());
    return this;
  }
});



////////////////////////
// // Results View /////
////////////////////////

wiz.views.ResultsView = Backbone.View.extend({
  el: ".wizard__content--results-list",

  initialize: function() {
    this.$el.append("<h5>Results</h5>");
    var results = [];
    results = wiz.collections.screens.getResults();
    _.each(results, function(r) {
      var resultView = new wiz.views.Result({result: r});
      this.$el.append(resultView.render().el);
    }, this);

  }
});

////////////
// Result //
////////////

wiz.views.Result = Backbone.View.extend({

  tagName: "li",

  initialize: function(options) {
    this.result = options.result;
  },

  render: function() {
    this.$el.html(this.result);
    return this;
  }


});


//////////////////
// Progress Bar //
//////////////////

wiz.views.ProgressBar = Backbone.View.extend({

  template: _.template($('#progress').html()),
  className: ".wizard__progress-bar",

  initialize: function() {
    this.$el.addClass("section-1");
    Backbone.on("current:update", this.changeIndicator, this);
  },

  changeIndicator: function() {
    this.$el.removeClass(function(index, css) {
      return (css.match (/\bsection-\S+/g) || []).join(' ');
    });
    this.$el.addClass("section-" + wiz.views.wizard.model.get("section").tid);
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  }

});


/////////////////////
// Progress Drawer //
/////////////////////

wiz.views.ProgressDrawer = Backbone.View.extend({

  el: "wizard__progress-drawer",

  initialize: function() {
    Backbone.on("screen:add", this.render, this);
  },

  render: function() {
    this.$el.find("ul").remove();
    this.$el.find("li").remove();
    this.$el.css("background", "#" + this.model.get("drawer-color"));

    var progress = wiz.collections.sections.models;
    _.each(progress, function(section) {
      var s = new wiz.views.Section({model: section}).render().el;
      this.$el.append(s);
    }, this);

    return this;
  }

});


wiz.views.Section = Backbone.View.extend({

  tagName: "li",

  template: _.template("<h5>{{name}}</h5>"),

  render: function() {
    this.$el.append(this.template({name: this.model.get("title")}));
    var sectionSteps = new wiz.views.SectionSteps({
      sectionId: this.model.get("id"),
      model: this.model
    }).render().el;
    this.$el.append(sectionSteps);
    return this;
  }

});




wiz.views.SectionSteps = Backbone.View.extend({
  tagName: "ul",

  initialize: function(options) {
    this.options = options || {};
    this.sectionId = this.options.sectionId;
  },

  render:function() {

    // @TODO move this method into the collection.
    // @TODO Sort screen by section ID.
    var screens = _.filter(wiz.collections.screens.models, function(s){
      return s.attributes.section.tid === this.sectionId;
    }, this);

    var graphic;
    _.each(screens, function(s) {
      if (s.get("Nid") === this.model.get("Nid")) {
        graphic = " O ";
      } else {
        graphic = " | ";
      }
      var sectionStepItem = new wiz.views.SectionStepItem({graphic: graphic}).render().el;
      this.$el.append(sectionStepItem);
    }, this );
    return this;
  }
});



wiz.views.SectionStepItem = Backbone.View.extend({
  tagName: "li",

  initialize: function(options) {
    this.options = options || {};
    this.graphic = this.options.graphic;
  },

  render: function() {
    this.$el.html(this.graphic);
    return this;
  }
});

  });

})(jQuery);
