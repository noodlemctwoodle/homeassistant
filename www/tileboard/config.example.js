/*
 This is an example configuration file.

 COPY OR RENAME THIS FILE TO config.js.

 Make sure you use real IDs from your HA entities.
*/


var CONFIG = {
   customTheme: CUSTOM_THEMES.TRANSPARENT, // CUSTOM_THEMES.TRANSPARENT, CUSTOM_THEMES.MATERIAL, CUSTOM_THEMES.MOBILE, CUSTOM_THEMES.COMPACT, CUSTOM_THEMES.HOMEKIT, CUSTOM_THEMES.WINPHONE, CUSTOM_THEMES.WIN95
   transition: TRANSITIONS.ANIMATED_GPU, //ANIMATED or SIMPLE (better perfomance)
   entitySize: ENTITY_SIZES.NORMAL, //SMALL, BIG are available
   tileSize: 150,
   tileMargin: 6,
   serverUrl: "http://hassio.local:8123",
   wsUrl: "ws://hassio.local:8123/api/websocket",
   authToken: null, // optional: make an long live token and put it here
   //googleApiKey: "XXXXXXXXXX", // Required if you are using Google Maps for device tracker
   debug: false, // Prints entities and state change info to the console.

   // next fields are optional
   events: [],
   timeFormat: 24,
   menuPosition: MENU_POSITIONS.LEFT, // or BOTTOM
   hideScrollbar: false, // horizontal scrollbar
   groupsAlign: GROUP_ALIGNS.HORIZONTALLY, // or VERTICALLY

   header: { // https://github.com/resoai/TileBoard/wiki/Header-configuration
      styles: {
         padding: '10px 130px 0',
         fontSize: '15px'
      },
      right: [],
      left: [
//         {
//            type: HEADER_ITEMS.DATETIME,
//            dateFormat: 'EEEE, LLLL dd', //https://docs.angularjs.org/api/ng/filter/date
//         }
      ]
   },


   /*screensaver: {// optional. https://github.com/resoai/TileBoard/wiki/Screensaver-configuration
      timeout: 300, // after 5 mins of inactive
      slidesTimeout: 10, // 10s for one slide
      styles: { fontSize: '40px' },
      leftBottom: [{ type: SCREENSAVER_ITEMS.DATETIME }], // put datetime to the left-bottom of screensaver
      slides: [
         { bg: 'images/bg1.jpeg' },
         {
            bg: 'images/bg2.png',
            rightTop: [ // put text to the 2nd slide
               {
                  type: SCREENSAVER_ITEMS.CUSTOM_HTML,
                  html: 'Welcome to the <b>TileBoard</b>',
                  styles: { fontSize: '40px' }
               }
            ]
         },
         { bg: 'images/bg3.jpg' }
      ]
   },*/

   pages: [
      {
         title: 'Main page',
         bg: 'images/bg4.jpg',
         icon: 'mdi-thermostat', // home icon
         groups: [
            {
               title: 'House Climate',
               width: 3,
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     id: "climate.living_room",
                     type: TYPES.CLIMATE,
                     unit: 'C',
                     state: function (item, entity) {
                        return 'Current '
                           + entity.attributes.current_temperature;
 //                          + entity.attributes.unit_of_measurement;
                     }
                  }, 
                  {
                     position: [1, 0],
                     type: TYPES.SENSOR,
                     title: 'Living Room',
                     id: 'sensor.living_room_thermostat_temperature',
                     unit: 'C', // override default entity unit
                     state: false, // hidding state
                     filter: function (value) { // optional
                        var num = parseFloat(value);
                        return num && !isNaN(num) ? num.toFixed(1) : value;
                     }
                  },
                  {
                     position: [1, 1],
                     type: TYPES.SENSOR,
                     title: 'Bathroom',
                     id: 'sensor.bathroom_temperature',
                     unit: 'C', // override default entity unit
                     state: false, // hidding state
                     filter: function (value) { // optional
                        var num = parseFloat(value);
                        return num && !isNaN(num) ? num.toFixed(1) : value;
                     }
                  },
                  {
                     position: [0, 2],
                     type: TYPES.SENSOR,
                     title: 'Landing',
                     id: 'sensor.landing_temperature',
                     unit: 'C', // override default entity unit
                     state: false, // hidding state
                     filter: function (value) { // optional
                        var num = parseFloat(value);
                        return num && !isNaN(num) ? num.toFixed(1) : value;
                     }
                  },
                  {
                     position: [0, 1],
                     type: TYPES.SENSOR,
                     title: 'Hall',
                     id: 'sensor.hall_temperature',
                     unit: 'C', // override default entity unit
                     state: false, // hidding state
                     filter: function (value) { // optional
                        var num = parseFloat(value);
                        return num && !isNaN(num) ? num.toFixed(1) : value;
                     }
                  },
                  {
                     position: [2, 0],
                     height: 2,
                     //classes: ['-compact'], // enable this if you want a little square tile (1x1)
                     type: TYPES.WEATHER,
                     id: 'group.weather',
                     state: '&sensor.dark_sky_summary.state', // label with weather summary (e.g. Sunny)
                     icon: '&sensor.dark_sky_icon.state',
                     //iconImage: '&sensor.dark_sky_icon.state', // use this one if you want to replace icon with image
                     icons: {
                        'clear-day': 'clear',
                        'clear-night': 'nt-clear',
                        'cloudy': 'cloudy',
                        'rain': 'rain',
                        'sleet': 'sleet',
                        'snow': 'snow',
                        'wind': 'hazy',
                        'fog': 'fog',
                        'partly-cloudy-day': 'partlycloudy',
                        'partly-cloudy-night': 'nt-partlycloudy'
                     },
                     fields: { // most of that fields are optional
                        summary: '&sensor.dark_sky_summary.state',
                        temperature: '&sensor.dark_sky_temperature.state',
                        temperatureUnit: '&sensor.dark_sky_temperature.attributes.unit_of_measurement',
                        windSpeed: '&sensor.dark_sky_wind_speed.state',
                        windSpeedUnit: '&sensor.dark_sky_wind_speed.attributes.unit_of_measurement',
                        humidity: '&sensor.dark_sky_humidity.state',
                        humidityUnit: '&sensor.dark_sky_humidity.attributes.unit_of_measurement',
                  
                        list: [
                           // custom line
                           'Feels like '
                              + '&sensor.dark_sky_apparent_temperature.state'
                              + '&sensor.dark_sky_apparent_temperature.attributes.unit_of_measurement',
                  
                           // another custom line
                           'Pressure '
                              + '&sensor.dark_sky_pressure.state'
                              + '&sensor.dark_sky_pressure.attributes.unit_of_measurement',
                  
                           // yet another custom line
                           '&sensor.dark_sky_precip_probability.state'
                              + '&sensor.dark_sky_precip_probability.attributes.unit_of_measurement'
                              + ' chance of rain'
                        ]
                     }
                  },
//                  {
//                     position: [0, 1], // [x, y]
//                     width: 1,
//                     type: TYPES.SENSOR,
//                     id: 'updater.updater',
//                     state: '@attributes.release_notes' // https://github.com/resoai/TileBoard/wiki/Templates
//                  }
               ]
            },
            {
               title: 'Cameras',
               width: 2,
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     id: 'camera.front_door',
                     type: TYPES.CAMERA,
                     bgSize: 'cover',
                     width: 2,
                     state: false,
                     fullscreen: {
                        type: TYPES.CAMERA,
                        refresh: 1500, // can be number in milliseconds
                        bgSize: 'contain'
                     },
                     refresh: function () { // can also be a function
                        return 3000 + Math.random() * 1000
                     }
                  },
                  {
                     position: [0, 1],
                     id: 'camera.backyard_back_garden',
                     type: TYPES.CAMERA,
                     bgSize: 'cover',
                     width: 2,
                     state: false,
                     fullscreen: {
                        type: TYPES.CAMERA,
                        refresh: 1500, // can be number in milliseconds
                        bgSize: 'contain'
                     },
                     refresh: function () { // can also be a function
                        return 3000 + Math.random() * 1000
                     }
                  }
               ]
            }

         ]
      },
      {
         title: 'Second page',
         bg: 'images/bg4.jpg',
         icon: 'mdi-home-outline',
         groups: [
            {
               title: 'House Lighting',
               width: 2,
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     type: TYPES.SWITCH,
                     id: 'switch.downstairs_lights',
                     title: 'Downstairs',
                     subtitle: 'Lights',
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     }
                  },
                  {
                     position: [1, 0],
                     type: TYPES.SWITCH,
                     id: 'switch.upstairs_lights',
                     title: 'Upstairs',
                     subtitle: 'Lights',
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     }
                  }
               ]
            },
            {
               title: 'Motion Sensors',
               width: 3,
               height: 3,
               items: [
                  {
                     position: [0, 0],
                     type: TYPES.SENSOR_ICON,
                     title: 'Landing',
                     id: 'sensor.landing_motion_sensor',
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: 'mdi-account-alert',
                        off: 'mdi-account'
                     },
                  },
                  {
                     position: [1, 0],
                     type: TYPES.SENSOR_ICON,
                     title: 'Hall',
                     id: 'sensor.hall_motion_sensor',
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: 'mdi-account-alert',
                        off: 'mdi-account'
                     },
                  },
                  {
                     position: [0, 1],
                     type: TYPES.SENSOR_ICON,
                     title: 'Bathroom',
                     id: 'sensor.landing_motion_sensor',
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: 'mdi-account-alert',
                        off: 'mdi-account'
                     },
                  }
               ]
            }
         ]
      },
      {
         title: 'Third page',
         bg: 'images/bg4.jpg',
         icon: 'mdi-numeric-1-box-outline',
         groups: [
            {
               title: 'Ground Floor Lights',
               width: 3,
               height: 5,
               items: [
                  {
                     position: [0, 0],
                     title: 'Living Room',
                     subtitle: 'Pendant',
                     id: 'light.living_room_pendant',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     },
                     sliders: [
                        {
                           title: 'Brightness',
                           field: 'brightness',
                           max: 254,
                           min: 1,
                           step: 5,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "brightness"
                           }
                        },
                        {
                           title: 'Color temp',
                           field: 'color_temp',
                           max: 500,
                           min: 153,
                           step: 15,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "color_temp"
                           }
                        }
                     ]
                  },
                  {
                     position: [1, 0],
                     title: 'Living Room',
                     subtitle: 'Lamp',
                     id: 'light.living_room_lamp',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     },
                     sliders: [
                        {
                           title: 'Brightness',
                           field: 'brightness',
                           max: 254,
                           min: 1,
                           step: 5,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "brightness"
                           }
                        },
                        {
                           title: 'Color temp',
                           field: 'color_temp',
                           max: 500,
                           min: 153,
                           step: 15,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "color_temp"
                           }
                        }
                     ]
                  },
                  {
                     position: [0, 1],
                     title: 'Kitchen',
                     subtitle: 'Spotlights',
                     id: 'light.kitchen_spotlights',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     },
                     sliders: [
                        {
                           title: 'Brightness',
                           field: 'brightness',
                           max: 254,
                           min: 1,
                           step: 5,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "brightness"
                           }
                        },
                        {
                           title: 'Color temp',
                           field: 'color_temp',
                           max: 500,
                           min: 153,
                           step: 15,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "color_temp"
                           }
                        }
                     ]
                  },
                  {
                     position: [1, 1],
                     title: 'Dining Room',
                     subtitle: 'Spotlights',
                     id: 'light.dining_room_spot_1',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     },
                     sliders: [
                        {
                           title: 'Brightness',
                           field: 'brightness',
                           max: 254,
                           min: 1,
                           step: 5,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "brightness"
                           }
                        },
                        {
                           title: 'Color temp',
                           field: 'color_temp',
                           max: 500,
                           min: 153,
                           step: 15,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "color_temp"
                           }
                        }
                     ]
                  },
                  {
                     position: [2, 1],
                     title: 'Back Door',
                     subtitle: 'Pendant',
                     id: 'light.back_door',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     },
                     sliders: [
                        {
                           title: 'Brightness',
                           field: 'brightness',
                           max: 254,
                           min: 1,
                           step: 5,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "brightness"
                           }
                        },
                        {
                           title: 'Color temp',
                           field: 'color_temp',
                           max: 500,
                           min: 153,
                           step: 15,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "color_temp"
                           }
                        }
                     ]
                  },
                  {
                     position: [0, 2],
                     title: 'Hall ',
                     subtitle: 'Spotlights',
                     id: 'light.hall_spotlights',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     },
                     sliders: [
                        {
                           title: 'Brightness',
                           field: 'brightness',
                           max: 254,
                           min: 1,
                           step: 5,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "brightness"
                           }
                        },
                        {
                           title: 'Color temp',
                           field: 'color_temp',
                           max: 500,
                           min: 153,
                           step: 15,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "color_temp"
                           }
                        }
                     ]
                  },
                  {
                     position: [0, 3],
                     title: 'Bathroom ',
                     subtitle: 'Pendant',
                     id: 'light.bathroom',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     },
                     sliders: [
                        {
                           title: 'Brightness',
                           field: 'brightness',
                           max: 254,
                           min: 1,
                           step: 5,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "brightness"
                           }
                        },
                        {
                           title: 'Color temp',
                           field: 'color_temp',
                           max: 500,
                           min: 153,
                           step: 15,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "color_temp"
                           }
                        }
                     ]
                  },
               ]
            },
         ]
      },
      {
         title: 'Forth page',
         bg: 'images/bg4.jpg',
         icon: 'mdi-numeric-2-box-outline',
         groups: [
            {
               title: 'Second Floor Lights',
               width: 3,
               height: 5,
               items: [
                  {
                     position: [0, 0],
                     title: 'Landing',
                     subtitle: 'Spotlights',
                     id: 'light.landing_spot',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     },
                     sliders: [
                        {
                           title: 'Brightness',
                           field: 'brightness',
                           max: 254,
                           min: 1,
                           step: 5,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "brightness"
                           }
                        },
                        {
                           title: 'Color temp',
                           field: 'color_temp',
                           max: 500,
                           min: 153,
                           step: 15,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "color_temp"
                           }
                        }
                     ]
                  },
                  {
                     position: [1, 0],
                     title: 'Bedroom',
                     subtitle: 'Pendants',
                     id: 'light.bedroom_spotlights',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     },
                     sliders: [
                        {
                           title: 'Brightness',
                           field: 'brightness',
                           max: 254,
                           min: 1,
                           step: 5,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "brightness"
                           }
                        },
                        {
                           title: 'Color temp',
                           field: 'color_temp',
                           max: 500,
                           min: 153,
                           step: 15,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "color_temp"
                           }
                        }
                     ]
                  },
                  {
                     position: [0, 1],
                     title: 'Bedroom',
                     subtitle: 'Lamp',
                     id: 'light.bedroom_lamp',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     },
                     sliders: [
                        {
                           title: 'Brightness',
                           field: 'brightness',
                           max: 254,
                           min: 1,
                           step: 5,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "brightness"
                           }
                        },
                        {
                           title: 'Color temp',
                           field: 'color_temp',
                           max: 500,
                           min: 153,
                           step: 15,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "color_temp"
                           }
                        }
                     ]
                  },
                  {
                     position: [1, 1],
                     title: 'Craft Room',
                     subtitle: 'Pendant',
                     id: 'light.craft_room_2',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     },
                     sliders: [
                        {
                           title: 'Brightness',
                           field: 'brightness',
                           max: 254,
                           min: 1,
                           step: 5,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "brightness"
                           }
                        },
                        {
                           title: 'Color temp',
                           field: 'color_temp',
                           max: 500,
                           min: 153,
                           step: 15,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "color_temp"
                           }
                        }
                     ]
                  },
                  {
                     position: [2, 1],
                     title: 'Office',
                     subtitle: 'Spotlights',
                     id: 'light.office_spotlights',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     },
                     sliders: [
                        {
                           title: 'Brightness',
                           field: 'brightness',
                           max: 254,
                           min: 1,
                           step: 5,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "brightness"
                           }
                        },
                        {
                           title: 'Color temp',
                           field: 'color_temp',
                           max: 500,
                           min: 153,
                           step: 15,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "color_temp"
                           }
                        }
                     ]
                  },
                  {
                     position: [0, 2],
                     title: 'Office ',
                     subtitle: 'Shadow',
                     id: 'light.office_shadow',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     },
                     sliders: [
                        {
                           title: 'Brightness',
                           field: 'brightness',
                           max: 254,
                           min: 1,
                           step: 5,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "brightness"
                           }
                        },
                        {
                           title: 'Color temp',
                           field: 'color_temp',
                           max: 500,
                           min: 153,
                           step: 15,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "color_temp"
                           }
                        }
                     ]
                  },
                  {
                     position: [0, 3],
                     title: 'Office ',
                     subtitle: 'Bloom',
                     id: 'light.office_bloom',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     },
                     sliders: [
                        {
                           title: 'Brightness',
                           field: 'brightness',
                           max: 254,
                           min: 1,
                           step: 5,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "brightness"
                           }
                        },
                        {
                           title: 'Color temp',
                           field: 'color_temp',
                           max: 500,
                           min: 153,
                           step: 15,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "color_temp"
                           }
                        }
                     ]
                  },
                  {
                     position: [0, 3],
                     title: 'Office ',
                     subtitle: 'Desk',
                     id: 'light.office_desk',
                     type: TYPES.LIGHT,
                     states: {
                        on: "On",
                        off: "Off"
                     },
                     icons: {
                        on: "mdi-lightbulb-on",
                        off: "mdi-lightbulb",
                     },
                     sliders: [
                        {
                           title: 'Brightness',
                           field: 'brightness',
                           max: 254,
                           min: 1,
                           step: 5,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "brightness"
                           }
                        },
                        {
                           title: 'Color temp',
                           field: 'color_temp',
                           max: 500,
                           min: 153,
                           step: 15,
                           request: {
                              type: "call_service",
                              domain: "light",
                              service: "turn_on",
                              field: "color_temp"
                           }
                        }
                     ]
                  },
               ]
            },
         ]
      }      
   ]
}
