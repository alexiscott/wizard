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
    sectionTitle: "SEC 1",
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
    sectionTitle: "SEC 2",
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
  }
  ];
