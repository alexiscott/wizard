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
          //console.log("transition", callback);
          view.$el.one('transitionend', function () {
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
        view.$el.one('transitionend', function () {
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

      className: "wiz",

      render: function() {

        // Styles for all sections:
        this.$el.css("background", "#" + this.model.get("Primary Color"));


        switch (this.model.get("screen-type")) {
        case "start":
          console.log("APP: Start");

          var start = new wiz.views.Start({model: this.model});
          this.$el.append(start.render().el);

          var nav = new wiz.views.Nav({model: this.model});
          this.$el.append(nav.render().el);
          break;
        case "section":
          console.log("APP: Section");

          var header = new wiz.views.Header({model: this.model});
          this.$el.append(header.render().el);

          var intro = new wiz.views.IntroWithIllustration({ model: this.model });
          this.$el.append(intro.render().el);

          var nav = new wiz.views.Nav({model: this.model});
          this.$el.append(nav.render().el);

          break;
        case "question":
          console.log("APP: question");

          var headerForQuestion = new wiz.views.HeaderForQuestion({model: this.model});
          this.$el.append(headerForQuestion.render().el);

          var question = new wiz.views.Question({model: this.model});
          this.$el.append(question.render().el);

          var buttons = new wiz.views.Buttons({ model: this.model });
          this.$el.append(buttons.render().el);

          var tip = new wiz.views.Tip({model: this.model});
          this.$el.append(tip.render().el);

          var linkButton = new wiz.views.ButtonLink({ model: this.model });
          this.$el.append(linkButton.render().el);

          var nav = new wiz.views.Nav({model: this.model});
          this.$el.append(nav.render().el);
          break;
        case "contextual help":
          console.log("APP: contextual help");

          var header = new wiz.views.HeaderForContextual({model: this.model});
          this.$el.append(header.render().el);

          var nav = new wiz.views.Nav({model: this.model});
          this.$el.append(nav.render().el);
          break;

        case "confirmation":
          console.log("APP: confirmation");

          var header = new wiz.views.Header({model: this.model});
          this.$el.append(header.render().el);

          var question = new wiz.views.Question({model: this.model});
          this.$el.append(question.render().el);

          var intro = new wiz.views.IntroWithIllustration({ model: this.model });
          this.$el.append(intro.render().el);

          var results = new wiz.views.ResultsView({model: this.model});
          this.$el.append(results.render().el);

          var nav = new wiz.views.NavStartOver({model: this.model});
          this.$el.append(nav.render().el);
          break;

        case "address lookup":
          console.log("APP: address lookup");
          console.log(this.model);

          var headerForQuestion = new wiz.views.HeaderForQuestion({model: this.model});
          this.$el.append(headerForQuestion.render().el);

          var question = new wiz.views.Question({model: this.model});
          this.$el.append(question.render().el);

          var intro = new wiz.views.Intro({ model: this.model });
          this.$el.append(intro.render().el);

          var nav = new wiz.views.NavForAddress({model: this.model});
          this.$el.append(nav.render().el);

          break;

        default:
          console.log("APP: No screen type defined", this.model.get("screen-type") );
          break;
        }

        var bar = new wiz.views.ProgressBar({model: this.model});
        this.$el.append(bar.render().el);

        // var drawer = new wiz.views.ProgressDrawer({
        //   model: this.model,
        // });
        // this.$el.append(drawer.render().el);

        return wiz.extensions.View.prototype.render.apply(this, arguments);
      }
    });

////////////
// Header //
////////////

wiz.views.Header = Backbone.View.extend({
  className: ".wizard__header constrained",
  template: _.template($('#header-template').html()),
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

/////////////////////////
// Header for question //
/////////////////////////

wiz.views.HeaderForQuestion = Backbone.View.extend({
  className: ".wizard__header constrained",
  template: _.template($('#header-for-question-template').html()),
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

/////////////////////////
// Header for context  //
/////////////////////////

wiz.views.HeaderForContextual = Backbone.View.extend({
  className: ".wizard__header constrained",
  template: _.template($('#header-for-contextual-template').html()),
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

///////////
// Intro //
///////////

wiz.views.Intro = Backbone.View.extend({
  className: ".wizard__intro-block constrained",
  template: _.template($('#intro-template').html()),
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

///////////
// Start //
///////////

wiz.views.Start = Backbone.View.extend({
  className: ".wizard__intro-block constrained",
  template: _.template($('#start-template').html()),
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

/////////////////////////////
// Intro with Illustration //
/////////////////////////////

wiz.views.IntroWithIllustration = Backbone.View.extend({
  className: ".wizard__intro-block constrained",
  template: _.template($('#intro-with-illustration-template').html()),
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

//////////////
// Question //
//////////////

wiz.views.Question = Backbone.View.extend({
  template: _.template($('#question-template').html()),
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});


/////////////
// Buttons //
/////////////

wiz.views.Buttons = Backbone.View.extend({
  className: "wizard__buttons constrained",
  template: _.template($('#buttons-template').html()),

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
            this.$el.append(button.render().el);
          }
        }, this);
      }
    return this;
  }
});

/////////////////
// Button Link //
/////////////////

wiz.views.ButtonLink = Backbone.View.extend({
  className: "wizard__buttons constrained",
  template: _.template($('#buttons-template').html()),

  render: function() {
    var buttons = this.model.get("buttons");
      if (buttons.length > 0) {
        _.each(buttons, function(b, index) {
          console.log("style", b.Style);
          if (b.Style["#markup"] === "Link") {
            var button =  new wiz.views.Button({
              button: b,
              model: this.model,
              index: index,
              className: "wizard__tip_button"
            });
            this.$el.append(button.render().el);
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
    var resultText;

    wiz.collections.chosen.toggleSelected();
     if (wiz.collections.chosen.selected) {
       this.$el.addClass("wizard__button--selected");
       Backbone.trigger("button:selected");

     } else {
      $(".wizard__button").removeClass("wizard__button--selected");
       Backbone.trigger("button:deselected");
    }
    var m = wiz.collections.chosen.last();
    var bidString =  $(event.currentTarget).attr("id");
    var bid = bidString.charAt(bidString.length -1);
    if (m.get("buttons")[bid]["Destination Screen"] !== undefined) {
      var nid = m.get("buttons")[bid]["Destination Screen"]["target_id"];
    } else {
      console.log("APP: Destination screen not defined: ", m.get("buttons"));
      return;
    }

    m.set({
      next: nid,
      chosenBid: bid,
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
// TIP //
/////////

wiz.views.Tip = Backbone.View.extend({
  template: _.template($('#tip-template').html()),
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});



/////////
// Nav //
/////////

wiz.views.Nav = Backbone.View.extend({

 className: "wizard__nav",

  initialize: function() {
    Backbone.on("button:selected", this.forwardEnabled, this);
    Backbone.on("button:deselected", this.forwardDisabled, this);
  },

  forwardEnabled: function() {
    this.$el.find(".wizard__arrow-down").addClass("enabled");
  },

  forwardDisabled: function() {
    this.$el.find(".wizard__arrow-down").removeClass("enabled");
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
    switch (this.model.get("screen-type")) {
    case "start":
      var arrows = new wiz.views.NavStart();
      this.$el.append(arrows.render().el);
      break;
    case "section":
      var arrows = new wiz.views.NavSection();
      this.$el.append(arrows.render().el);
      break;
    case "question":
      var arrows = new wiz.views.NavQuestion();
      this.$el.append(arrows.render().el);
      break;
    case "contextual help":
      var arrows = new wiz.views.NavContextualHelp();
      this.$el.append(arrows.render().el);
      break;
    }
    return this;
  }

});


///////////////
// NAV START //
///////////////

wiz.views.NavStart = Backbone.View.extend({
  template: _.template($('#wizard-nav-start-template').html()),
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});

/////////////////
// NAV ADDRESS //
/////////////////

wiz.views.NavForAddress = Backbone.View.extend({
  template: _.template($('#wizard-nav-address-template').html()),
  events:  {
    "click .wizard__address_back_button": "backArrowClick"
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
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});

/////////////////
// NAV SECTION //
/////////////////

wiz.views.NavSection = Backbone.View.extend({
  template: _.template($('#wizard-nav-section-template').html()),
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});


//////////////////
// NAV Question //
//////////////////

wiz.views.NavQuestion = Backbone.View.extend({
  template: _.template($('#wizard-nav-question-template').html()),
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});

/////////////////////////
// Nav Contextual Help //
/////////////////////////

wiz.views.NavContextualHelp = Backbone.View.extend({
  template: _.template($('#wizard-nav-contextual-help-template').html()),
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});


////////////////////
// Nav Start Over //
////////////////////

wiz.views.NavStartOver = Backbone.View.extend({
  template: _.template($('#wizard-nav-start-over-template').html()),
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});

////////////////////////
// // Results View /////
////////////////////////

wiz.views.ResultsView = Backbone.View.extend({
  className: ".wizard__content--results-list",

  initialize: function() {
    this.$el.append("<h5>Results</h5>");
    var results = [];
    results = wiz.collections.chosen.getResults();
    console.log("res:", results);
    _.each(results, function(r, index) {
      var result = new wiz.views.Result({result: r, index: index});
      this.$el.append(result.render().el);
    }, this);
  }
});

////////////
// Result //
////////////

wiz.views.Result = Backbone.View.extend({

  tagName: "li",

  template: _.template($('#results-template').html()),

  initialize: function(options) {
    this.result = options.result;
    this.index = options.index + 1;
  },

  render: function() {
    this.$el.append(this.template({result: this.result, index: this.index}));
    return this;
  }

});


//////////////////
// Progress Bar //
//////////////////

wiz.views.ProgressBar = Backbone.View.extend({

  template: _.template($('#progress-bar-section-template').html()),
  templateWithIcon: _.template($('#progress-bar-section-with-icon-template').html()),
  className: "wizard__progress-bar--simple",

  render: function() {
    var currentSection = this.model.get("section").tid;
    var sections = wiz.collections.screens.getSections();
    _.each(sections, function(section) {
      if (currentSection === section.tid) {
        this.$el.append(this.templateWithIcon({icon: section.icon}));
      } else {
        this.$el.append(this.template());
      }
    }, this);
    return this;
  }

});



/////////////////////
// Progress Drawer //
/////////////////////

wiz.views.ProgressDrawer = Backbone.View.extend({

  className: "wizard__progress-drawer",

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
