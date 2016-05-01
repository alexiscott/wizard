var wiz = wiz || {};
wiz.views = {};

// User moustachs style templates.
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g

};

function showView(view, element) {
  if (window.currentView){
//    window.currentView.remove();
  }

  window.currentView = view;
  window.currentView.render();

  console.log("current", window.currentView.el);
  $("#wizard").append(window.currentView.el);

  //console.log("element", element);
  if (element !== undefined) {

  } else {
//    element.append(this.currentView.el);
  }
  
};


(function($) {
  $( document ).ready(function() {



    ////////////
    // Wizard //
    ////////////

    wiz.views.Wizard = Backbone.View.extend({

      className: "wiz",

      events:  {
        "click .wizard__progress-bar--simple": "showDrawer",
        "click .wizard__progress-drawer": "hideDrawer",
      },

      showDrawer: function() {
        $(".wizard__progress-drawer").show();
      },

      hideDrawer: function() {
        $(".wizard__progress-drawer").hide();
      },

      render: function() {

        // Styles for all sections:
          $("#wizard").css("background", "#" + this.model.get("Primary Color"));

          var start = new wiz.views.Start({model: this.model});
        //  this.$el.append(start.render().el);
        showView(start, this.$el);

        var nav = new wiz.views.Nav({model: this.model});
        showView(nav, this.$el);


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
      className: "wizard__intro-block constrained",
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
      render: function() {
       this.$el.css("background", "#" + this.model.get("drawer-color"));
       var bar = new wiz.views.ProgressBar({model: this.model});
       this.$el.append(bar.render().el);
       var progressDrawerContents = new wiz.views.ProgressDrawerContents({model: this.model});
       this.$el.append(progressDrawerContents.render().el);
       return this;
        }
    });

    //////////////////////////////
    // Progress drawer contents //
    //////////////////////////////

    wiz.views.ProgressDrawerContents = Backbone.View.extend({
      template: _.template($('#progress-drawer-contents-template').html()),
      className: "progress-drawer_contents",
      render: function() {
        var currentSection = this.model.get("section").tid;
        var sections = wiz.collections.screens.getSections();

        _.each(sections, function(section) {
          var sectionScreens = wiz.collections.screens.getScreensBySectionId(section.tid);
          // This is the section the user is currently in:
          if (currentSection === section.tid) {
            this.$el.append(this.template({
              name: section.name,
              jurisdiction: section.jurisdiction
            }));
            this.$el.find(".wizard__progress-drawer-contents-section")
              .addClass("current");
            // This is for all other sections:
          } else {
            this.$el.append(this.template({
              name: section.name,
              jurisdiction: section.jurisdiction
            }));
            // var statusIcons = new wiz.views.ProgressStatusIcons();
            // this.$el.find(".wizard__progress-drawer-contents-section")
            // .append(statusIcons.render().el);
            
          }
        }, this);
        return this;
      }
    });


    // Progress Bar Status Icons

    wiz.views.ProgressStatusIcons = Backbone.View.extend({
      className: ".wizard__progress-drawer_status_icons",
      template: _.template($('#progress-drawer-status-icons-template').html()),
      render: function() {
        this.$el.append(this.template());
        return this;
      }
    });


  });
})(jQuery);
