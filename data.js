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
    screenId: 1, 
    screenTitle: "Are you sure you want to go through with this?",
    screenDescription: "Introductory screen to get started",
    section: 1,
    sectionTitle: "Intro Section",
    buttons: [
      {
        buttonTitle: "Yes",
        buttonResult: "You decided to go through with this",
        buttonLinkTo: 2
      },
      {
        buttonTitle: "No",
        buttonResult: "We regret that this was not for you.",
        buttonLinkTo: 3
      },
    ]
  },
    {
    screenId: 2, 
    screenTitle: "Do you live in the LA area?",
    screenDescription: "Getting a feel for where you are at",
    section: 1,
    sectionTitle: "Intro Section",
    buttons: [
      {
        buttonTitle: "Yes",
        buttonResult: "Good to have another LA'er on board.",
        buttonLinkTo: 4
      },
      {
        buttonTitle: "No",
        buttonResult: "We only can help people living in the LA area.",
        buttonLinkTo: 3
      },
    ]
  },

    {
    screenId: 3, 
    screenTitle: "Sorry we can't help you",
    screenDescription: "Try something else instead",
    section: 1,
    sectionTitle: "SEC 1",
    buttons: []
  },

    {
    screenId: 4, 
    screenTitle: "What color pyjamas do you wear?",
    screenDescription: "Or maybe they are chequered",
    section: 2,
    sectionTitle: "SEC 2",
    buttons: [
      {
        buttonTitle: "Blue",
        buttonResult: "Blue pyjama person.",
        buttonLinkTo: 5
      },
      {
        buttonTitle: "Any other color or chequered",
        buttonResult: "Uptight chequerer pyjama person.",
        buttonLinkTo: 6
      },
    ]
  },


  ];
