var namespace = {};

/////////////////
// WIZARD VIEW //
/////////////////

namespace.ui = {};
namespace.ui.Wizard = Backbone.View.extend({  
  id: 'wizard',
  el: '#wizard',
  events: {
    "click #next-step" : "nextStep",
    "click #prev-step" : "prevStep"
  },
  
  initialize: function(options) {
    this.options = options || {};
    _.bindAll(this, 'render');
    this.currentStep = 0;
  },

  render: function() {
    this.progressIndicator = $("#progress-indicator");
    this.sectionTitle = $("h1#section-title");
    this.stepTitle = $("h2#step-title");
    this.stepDescription = $("p#step-instructions");
    this.nextStepButton = $("#next-step");
    this.prevStepButton = $("#prev-step");
    this.renderCurrentStep();
    return this;
  },
  
  renderProgressIndicator: function() {
    this.progressIndicator.empty();
    _.each(this.options.steps, _.bind(function(step) {
      var text =  "(" + step.step_number + ") " + step.section_title + ">>> ";
      var el = document.createElement('span');
      $(el).text(text);
      if (step.step_number == this.currentStep + 1) $(el).addClass('active');
      this.progressIndicator.append(el);
    }, this));
  },
  
  renderCurrentStep: function() {
    var currentStep = this.options.steps[this.currentStep];
    if (!this.isFirstStep()) var prevStep = this.options.steps[this.currentStep - 1];
    var nextStep = this.options.steps[this.currentStep + 1];
    this.sectionTitle.html(currentStep.section_title);
    this.stepTitle.html(currentStep.screen_title);
    this.stepDescription.html(currentStep.screen_description);
    this.currentView = currentStep.view;
    this.renderProgressIndicator();
    
    if (prevStep) {
      this.prevStepButton.html("<<").show()
    } else {
      this.prevStepButton.hide();
    };
    if (nextStep) {
      this.nextStepButton.html(">>");
    } else {
      this.nextStepButton.html("Finish");
    };
  },
  
  nextStep: function() {
    //    if (this.currentView.validate()) {
    if (!this.isLastStep()) {
      //       this.currentView.validate();
      this.currentStep += 1;
      this.renderCurrentStep();
    } else {
      //     this.save();
    };
    //    };
  },
  
  prevStep: function() {
    if (!this.isFirstStep()) {
      this.currentStep -= 1;
      this.renderCurrentStep();
    };
  },
  
  isFirstStep: function() {
    return (this.currentStep == 0);
  },
  
  isLastStep: function() {
    return (this.currentStep == this.options.steps.length - 1);
  }
});




// backbone view that calls the wizard ui element
namespace.views = {};

///////////////////////
// WIZARD STEP VIEWS //
///////////////////////

namespace.views.WizardStepOne = Backbone.View.extend({
  el: "#current-step-container",
  initialize: function(){
    this.render();  
  },
  render: function(){
    // Buttons render here.
    var buttonsView = new ButtonsView({ el: '#buttons', model: this.model });
  }
});


var ButtonsView = Backbone.View.extend({

  initialize: function() {
    this.render();
  },

  events: {
    "click .but": "transitionUp",
    "click .but": "tranistionDown",
},

  transitionUp: function() {
    console.log("Transition up");
    event.preventDefault();
},

  tranistionDown: function() {
    console.log("Transition down");
    event.preventDefault();
  },

  render: function() {
    // Move loop into parent function.
    var buttons = this.model.get("buttons");
    var b = '';
     _.each(buttons, function(button) {
       var compiled = _.template('<a href="" class="but"><%= title %></a>');
       b = b + compiled({title: button.buttonTitle});
    });
    console.log(this);
    $(this.el).html(b);
  }
});




  // Model construction.
namespace.views.MyWizard = Backbone.View.extend({
  initialize: function() {
    _.bindAll(this, 'render', 'wizardMethod');    
    this.render();
  },

  render: function() {
    this.wizardMethod();
    return this;
  },

  wizardMethod: function() {

    var Screen = Backbone.Model.extend({
      defaults: {
        foobar: 'Foobar'
      }
    });

    var steps = _.map(bp_wizard_data, function(obj, index) {

      var screen = new Screen({
        screenId: obj.screenId,
        buttons: obj.buttons
      });

      return {
        step_number:             index + 1,
        section_title:            obj.sectionTitle,
        screen_title:             obj.screenTitle,
        screen_description:       obj.screenDescription,
        view :                    new namespace.views.WizardStepOne({ model : screen })
      }
    });
    console.log("Steps: ", steps);

    var view = new namespace.ui.Wizard({ 
      steps : steps 
    });

    $("#current_step").html(view.render().el);
  }});


// Initialize.
var myWizard = new namespace.views.MyWizard ();

