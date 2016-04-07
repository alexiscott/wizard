var sections_lookup = 
  {
    "1": "First section",
    "2": "Second section",
    "3": "third section",
  };


var bp_wizard_data = [
  {
    "field_section": "1",
    "field_description": "Start of section screen",
    "field_screen_id": "1",
    "title": "SCREEN 1",
    "nid": "10",

    "buttons": [
      {
        "Button Anchor Destination": {
          "#markup": "2"
        },
        "Button Title": {
          "#markup": "Yes"
        },
        "Button Result": {
          "#markup": ""
        }
      }
    ]
  },
  {
    "field_section": "1",
    "field_description": "Welcome to the second screen",
    "field_screen_id": "2",
    "title": "SCREEN 2",
    "nid": "11",
    "buttons": [
      {
        "Button Anchor Destination": {
          "#markup": "3"
        },
        "Button Title": {
          "#markup": "Yes"
        },
        "Button Result": {
          "#markup": "Good choice."
        }
      },
      {
        "Button Anchor Destination": {
          "#markup": "3"
        },
        "Button Title": {
          "#markup": "No"
        },
        "Button Result": {
          "#markup": "Bad choice."
        }
      }
    ]
  },

  {
    "field_section": "2",
    "field_description": "Well, the way they make shows is, they make one show. That show&#039;s called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they&#039;re going to make more shows. Some pilots get picked and become television programs. Some don&#039;t, become nothing. ",
    "field_screen_id": "3",
    "title": "SCREEN 3",
    "nid": "10",
    "buttons": [
      {
        "Button Result Text": {
          "#markup": "<p>Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.<\/p>"
        },
        "Button Anchor Destination": {
          "#markup": "4"
        },
        "Button Title": {
          "#markup": "Yes"
        },
        "Button Result": {
          "#markup": "Great choice"
        }
      },
      {
        "Button Result": {
          "#markup": "<p>The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.<\/p>"
        },
        "Button Anchor Destination": {
          "#markup": "2.3"
        },
        "Button Title": {
          "#markup": "No"
        },
        "Button Result": {
          "#markup": "Terrible choice"
        }
      }
    ]
  },

  {
    "field_section": "3",
    "field_description": "",
    "field_screen_id": "4",
    "title": "SCREEN 4: Congratulations, these are your results:",
    "nid": "10",

    "buttons": [
      {
        "Button Anchor Destination": {
          "#markup": "LAST" // AIS Special.
        },
        "Button Title": {
        },
        "Button Result": {
          "#markup": ""
        }
      }
    ]

  }

]
