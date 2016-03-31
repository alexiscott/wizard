var namespace = {};

// wizard.js Wizard view.
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
    console.log("wizard", this.el);
  },

  render: function() {
    console.log("render happens");
//    var t = template('ui/wizard');
//    $(this.el).html("REPLACE ME dynamic");
    
    this.progressIndicator = $("#progress_indicator");
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
    this.currentView = currentStep.view;
    console.log("current view", this.currentView);
    console.log("current step container", this.currentStepContainer);
    this.currentStepContainer.html(this.currentView.render());
//    this.currentStepContainer.html("stuff"); // AIS

    this.renderProgressIndicator();
    
    if (prevStep) {
      this.prevStepButton.html("Prev: " + prevStep.title).show()
      
    } else {
      this.prevStepButton.hide();
      
    };
    if (nextStep) {
      this.nextStepButton.html("Next: " + nextStep.title);
      
    } else {
      this.nextStepButton.html("Finish");
      
    };
    
  },
  
  nextStep: function() {
    console.log("clicked on next step");
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
var MyModel = Backbone.Model.extend({});


// Views.
namespace.views.WizardStepOne = Backbone.View.extend({
  // It's the first function called when this view it's instantiated.
  el: ".current_step_container",
  initialize: function(){
    this.render();  
  },
  // $el - it's a cached jQuery object (el), in which you can use jQuery functions
  //       to push content. Like the Hello World in this case.
  render: function(){
    this.$el.html("I am screen one specific"); 
  }
});


namespace.views.WizardStepTwo = Backbone.View.extend({
  el: ".current_step_container",
  initialize: function(){
    this.render();  
  },
  render: function(){
    this.$el.html("I am screen two specific"); 
  }
});

namespace.views.WizardStepThree = Backbone.View.extend({
  el: ".current_step_container",
  // It's the first function called when this view it's instantiated.
  initialize: function(){
    this.render();  
  },
  render: function(){
    this.$el.html("I am screen 3 specific"); 
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
    var myModel = new MyModel;
    var steps = [
      {
        step_number :       1,
        title :             "Title of Step 1",
        instructions :      "Instructions or description of what the user needs to do for this step",
        view :              new namespace.views.WizardStepOne({ model : myModel })
        
      },
      {
        step_number :       2,
        title :             "Title of Step 2",
        instructions :      "Instructions or description of what the user needs to do for this step",
        view :              new namespace.views.WizardStepTwo({ model : myModel })
        
      },
      {
        step_number :       3,
        title :             "Title of Step 3",
        instructions :      "Instructions or description of what the user needs to do for this step",
        view :              new namespace.views.WizardStepThree({ model : myModel })
        
      }
      
    ];
    
    var view = new namespace.ui.Wizard({ 
      model : myModel, 
      steps : steps 
    });
    $("#current_step").html(view.render().el);
    console.log("render current step");
    
  }});


// Initialize.
var myWizard = new namespace.views.MyWizard ();

