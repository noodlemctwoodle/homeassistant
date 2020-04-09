# Home Assistant Core - Configuration for Homekit-Infused and Dwains-Theme


### Home Assistant Update Sensor

To find out when a new version is available for your specific Home Assistant build, create the following sensor.

```YAML
sensor:
  - platform: rest
    resource: https://s3.amazonaws.com/hassio-version/stable.json
    name: Latest Version
    value_template: "{{ value_json.homeassistant.default }}"
    scan_interval: 3600
```
This sensor will check once an hour for new version. Adjust ‘scan_interval’ to change this timeframe. The interval is in seconds. (3600 seconds = 60 minutes = 1 hour)

You need to change "{{ value_json.info.default }}" to match your build type. The json output showing all the options is below.


```JSON
{
  "channel": "stable",
  "supervisor": "138",
  "homeassistant": {
    "default": "0.81.5",
    "qemux86": "0.81.5",
    "qemux86-64": "0.81.5",
    "qemuarm": "0.81.5",
    "qemuarm-64": "0.81.5",
    "intel-nuc": "0.81.5",
    "raspberrypi": "0.81.5",
    "raspberrypi2": "0.81.5",
    "raspberrypi3": "0.81.5",
    "raspberrypi3-64": "0.81.5",
    "tinker": "0.81.5",
    "odroid-c2": "0.81.5",
    "odroid-xu": "0.81.5"
  },
  "hassos": {
    "ova": "1.12",
    "rpi": "1.12",
    "rpi0-w": "1.12",
    "rpi2": "1.12",
    "rpi3": "1.12",
    "rpi3-64": "1.12",
    "tinker": "2.2",
    "odroid-c2": "2.2"
  },
  "hassos-cli": "7"
}
```


### Update notifications! Core, HACS, Supervisor and Addons

Thanks to [CentralCommand](https://community.home-assistant.io/t/update-notifications-core-hacs-supervisor-and-addons/182295) for the excellant write up. If you require any assistance or further configuration please refer back the the post on the Home Assistant Communiuty. I Take zero credit for any of this write up. 

To start we need sensors that tell us when updates are available. For Core and HACS we’re good to go since those come standard with binary_sensor.updater for Core and sensor.hacs for HACS. However there is no sensor for Supervisor and its addons so we need to make one.

Took me a bit to figure out but you can call into the Supervisor’s API from a commandline sensor, doing that gave me everything I needed. Here’s the config I used for that sensor:

```YAML
sensor:
# Sensor to track available updates for supervisor & addons
- platform: command_line
  name: Supervisor updates
  command: 'curl http://supervisor/supervisor/info -H "Authorization: Bearer $(printenv SUPERVISOR_TOKEN)" | jq ''{"newest_version":.data.version_latest,"current_version":.data.version,"addons":[.data.addons[] | select(.version != .installed)]}'''
  value_template: "{{ value_json.addons | length }}"
  json_attributes:
  - newest_version
  - current_version
  - addons
```

Warning - this code requires supervisor version 213
Supervisor is still in early stages and so clearly changes must be expected. If you haven’t updated to 213 yet then you’ll need to change `.data.version_latest` above to `.data.last_version` as it appears the response schema to this API was changed in that release.

```YAML
binary_sensor:

- platform: template
  sensors:
    # True if there's an update available for supervisor
    updater_supervisor:
      friendly_name: 'Updater - Supervisor'
      device_class: problem
      entity_id:
      - sensor.supervisor_updates
      value_template: "{{ state_attr('sensor.supervisor_updates', 'current_version') != state_attr('sensor.supervisor_updates', 'newest_version') }}"
      availability_template: "{{ (states('sensor.supervisor_updates') | int(-1)) > -1 }}"

    # True if there's updates available for any HACS components
    updater_hacs:
      friendly_name: 'Updater - HACS'
      device_class: problem
      entity_id:
      - sensor.hacs
      value_template: "{{ states('sensor.hacs') | int > 0 }}"

    # True if there's updates available for any addons
    updater_addons:
      friendly_name: 'Updater - Addons'
      device_class: problem
      entity_id:
      - sensor.supervisor_updates
      value_template: "{{ states('sensor.supervisor_updates') | int > 0 }}"
```

Just like `binary_sensor.updater` these will set themselves to on when the piece of HA they are tracking needs an update and be off otherwise.

Now that we have these we can build alerts to notify me when something needs an update and then remind me periodically if I haven’t updated yet. I have the reminder time set to 6 hours but you can set it however you want. 

```YAML
alert:

# Update is available - un-acknowledgeble, auto-dismiss, me only
# Wait 5 minutes before first to give core config check time to run
  ha_update_available:
    name: HA has an update
    entity_id: binary_sensor.updater
    state: 'on'
    can_acknowledge: false
    repeat: 
    - 5
    - 360
    title: 'Update for HA available'
    message: "New version is {{ state_attr('binary_sensor.updater', 'newest_version') }}. Currently on {{ states('sensor.current_version') }}"
    notifiers:
    - 'me'
    data:
      tag: 'ha-update-available'
      url: 'http://hassio.local/hassio/addon/core_check_config'
      ttl: 21600

  # Supervisor update is available - un-acknowledgeable, auto-dismiss, me only
  supervisor_update_available:
    name: Supervisor has an update
    entity_id: binary_sensor.updater_supervisor
    state: 'on'
    can_acknowledge: false
    repeat: 360
    title: 'Update for HA Supervisor available'
    message: "New version is {{ state_attr('sensor.supervisor_updates', 'newest_version') }}. Currently on {{ state_attr('sensor.supervisor_updates', 'current_version') }}"
    notifiers:
    - 'me'
    data:
      tag: 'supervisor-update-available'
      url: 'http://hassio.local/hassio/dashboard'
      ttl: 21600

  # HACS repos have updates available - unacknowledgeable, auto-dismiss, me only
  hacs_update_available:
    name: HACS repos have updates
    entity_id: binary_sensor.updater_hacs
    state: 'on'
    can_acknowledge: false
    repeat: 360
    title: "Updates available in {{ states('sensor.hacs') }} HACS repo{% if states('sensor.hacs') | int > 1 %}s{% endif %}"
    message: ""
    notifiers:
      - 'me'
    data:
      tag: 'hacs-update-available'
      url: 'http://hassio.local/hacs/installed'
      ttl: 21600

  # Addons have updates available - unacknowledgeable, auto-dismiss, me only
  addon_update_available:
    name: Addons have updates
    entity_id: binary_sensor.updater_addons
    state: 'on'
    can_acknowledge: false
    repeat: 360
    title: "Updates available for {{ states('sensor.supervisor_updates') }} HA addon{% if states('sensor.supervisor_updates') | int > 1 %}s{% endif %}"
    message: ""
    notifiers:
    - 'me'
    data:
      tag: 'addon-update-available'
      url: 'http://hassio.local/hassio/dashboard'
      ttl: 21600
```















## Home Assistant Core Addon Suppport

'a0d7b954_adguard' is the add-on name hassio uses. To retrieve the name for your add-on, go to the supervisor panel, and then click on your addon. Once on the add-on page, look at the URL for that page in your browser. The name is at the end of the URL. For example this adguard add-on URL ends in '/hassio/addon/a0d7b954_adguard'

secret llt is a 'long lived token'. To obtain a long lived token, go to your users profile page and scroll all the way to the bottom. Create a token and copy it in to your config. Once you close the window with the LLT you cannot view the token again so be sure to record it. My secret is formatted as follows: 

    llt: "Bearer adfasdfadsfadsfasdfasdfasdfNiJ9.eyJpc3adfasdfasdfTZlZWQ0Nzsuperlongstring of numberslettersetc" 
    
*Be sure to add the Bearer before the token and place the entire thing in quotes.*

The rest sensor pulls the state of the add-on (if its running or not) and then also pulls the `version` which is the current running version of the add-on. It also pulls `last_version` which is the latest available version the add-on can pull. A later version may be available on Github, but the add-on hasn’t synced and doesn’t see the version yet.



```yaml
  - platform: rest
    resource: http://1.2.3.4:8123/api/hassio/addons/a0d7b954_adguard/info
    name: adguard
    value_template: '{{ value_json.data.state }}'
    scan_interval: 60
    headers:
      Authorization: !secret llt
      Content-Type: application/json
    json_attributes_path: "$.data"
    json_attributes:
      - version
      - last_version
```

Further examples can be found in my configuration [here](https://github.com/noodlemctwoodle/homeassistant/blob/515880839aec18d3081431d9cf037985da848645/packages/ha-core/areas/cabinet/devices/home_assistant/ha_monitor.yaml#L4)

The rest sensor may throw errors on startup if Homeassistant can’t pull the data on startup. I just ignore these as the sensor will continue to try to update and usually does on the second try.

### Switch Template

Create a switch to show/control the add-on state and an automation to turn the other automation on at startup.

```yaml
      glances_addon:
        value_template: "{{ is_state('sensor.glances_addon', 'started') }}"
        turn_on:
          service: hassio.addon_start
          data:
            addon: a0d7b954_glances
        turn_off:
          service: hassio.addon_stop
          data:
            addon: a0d7b954_glances
```

Further examples can be found in my configuration [here](https://github.com/noodlemctwoodle/homeassistant/blob/515880839aec18d3081431d9cf037985da848645/packages/ha-core/areas/cabinet/devices/home_assistant/ha_monitor.yaml#L170)


[Source](https://community.home-assistant.io/t/get-notified-of-available-hassio-addon-updates/176626)


### Automation Configuration

This automation to delay some automation and get a notification when Home Assistant starts. There are other ways to delay an automation triggering via condition but this is how I do it.

```yaml
  - alias: Home Assistant Started
    trigger:
      platform: homeassistant
      event: start
    action:
      - delay:
          minutes: 1
      - service: homeassistant.turn_on
        entity_id: automation.addon_update_available
```

```yaml
  - alias: "New Home Assitant Version"
    trigger:
      - platform: state
        entity_id: sensor.hassio_version
    action:
      service: notify.notify
      data:
        title: "New Home Assistant Version"
        message: "Version {{ states.sensor.latest_version.state }} is available!"
```



## SNMP

More information can be found [here](https://github.com/noodlemctwoodle/homeassistant/tree/master/.github/wiki/guides/unraid#some-of-the-sensors-discovered-to-far)
