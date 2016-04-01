


//////////
// DATA //
//////////

var bp_wizard_sections = {
  section1: {
    color: "#FCC",
    icon: "foo.jpg",
    jurisdiction: "Information about Jurisdiction",
    title: "1/ Register your business"
  },
  section2: {
    color: "#FFC",
    icon: "foo.jpg",
    jurisdiction: "More Information about Jurisdiction",
    title: "2/ Name your business"
  }
}


var bp_wizard_data = 
  [
    {
    screenId: 0, 
    screenTitle: "Title of Screen",
    screenDescription: "Screen description",
    section: 123,
    buttons: [
      {
        buttonTitle: "Yes",
        buttonResult: "Bad choice",
        buttonLinkTo: 0
      },
      {
        buttonTitle: "No",
        buttonResult: "Better choice",
        buttonLinkTo: 1
      },
    ]
  },
    {
    screenId: 1, 
    screenTitle: "2 Title of Screen",
    screenDescription: "2 Screen description",
    section: 123,
    buttons: [
      {
        buttonTitle: "2 Yes",
        buttonResult: "2 Bad choice",
        buttonLinkTo: 0
      },
      {
        buttonTitle: "2 No",
        buttonResult: "2 Better choice",
        buttonLinkTo: 1
      },
    ]
  }
  ];


var namespace = {};


/////////////////
// WIZARD VIEW //
/////////////////

namespace.ui = {};
namespace.ui.Wizard = Backbone.View.extend({  
  id: 'wizard',
  el: '#wizard',
  events: {
    "click #next_step_button" : "nextStep",
    "click #prev_step_button" : "prevStep"
  },
  
  initialize: function(options) {
    this.options = options || {};
    _.bindAll(this, 'render');
    this.currentStep = 0;
  },

  render: function() {
    this.progressIndicator = $("#progress_indicator");
    this.section_title = $("h1#section_title");
    this.title = $("h2#step_title");
    this.instructions = $("p#step_instructions");
    this.currentStepContainer = $(".current_step_container");
    this.nextStepButton = $("#next_step_button");
    this.prevStepButton = $("#prev_step_button");
    this.renderCurrentStep();
    return this;
  },
  
  renderProgressIndicator: function() {
    this.progressIndicator.empty();
    _.each(this.options.steps, _.bind(function(step) {
      var text =  "(" + step.step_number + ") " + step.title + ">>> ";
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

    this.title.html(currentStep.title);
    this.instructions.html(currentStep.instructions);
    this.section_title.html(currentStep.section_title);
    this.currentView = currentStep.view;
    console.log("current view", this.currentView);
    console.log("current step container", this.currentStepContainer);
    this.currentStepContainer.html(this.currentView.render());

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
var MyModel = Backbone.Model.extend({
   defaults: {
     buttonTitle: 'button Title Default'
   }
});

///////////////////////
// WIZARD STEP VIEWS //
///////////////////////

namespace.views.WizardStepOne = Backbone.View.extend({
  el: ".current_step_container",
  initialize: function(){
    this.render();  
  },
  render: function(){
    var result = this.model.get("screenTitle");
    console.log("RESULT:", result);
    this.$el.html(result); 
  }
});


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
    var steps = _.map(bp_wizard_data, function(obj) {

      var myModel = new MyModel({
        screenId: obj.screenId,
        screenTitle: obj.screenTitle
      });

      return {
        step_number :       1,
        section_title:      "STATIC SECTION TITLE",
        title :             "Title of Step 1",
        instructions :     "STATIC INSTRUCTIONS",
        view :              new namespace.views.WizardStepOne({ model : myModel })
      }

    });


    console.log("Steps: ", steps);


    var view = new namespace.ui.Wizard({ 
      steps : steps 
    });
    $("#current_step").html(view.render().el);
    console.log("render current step");
    
  }});


// Initialize.
var myWizard = new namespace.views.MyWizard ();

