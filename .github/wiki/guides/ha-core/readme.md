# Home Assistant Core - Configuration for Homekit-Infused and Dwains-Theme

## Home Assistant Core Addon Suppport

[Source](https://community.home-assistant.io/t/get-notified-of-available-hassio-addon-updates/176626)

'a0d7b954_adguard' is the add-on name hassio uses. To retrieve the name for your add-on, go to the supervisor panel, and then click on your addon. Once on the add-on page, look at the URL for that page in your browser. The name is at the end of the URL. For example this adguard add-on URL ends in '/hassio/addon/a0d7b954_adguard'

secret llt is a 'long lived token'. To obtain a long lived token, go to your users profile page and scroll all the way to the bottom. Create a token and copy it in to your config. Once you close the window with the LLT you cannot view the token again so be sure to record it. My secret is formatted as follows: 

    llt: "Bearer adfasdfadsfadsfasdfasdfasdfNiJ9.eyJpc3adfasdfasdfTZlZWQ0Nzsuperlongstring of numberslettersetc" 
    
*Be sure to add the Bearer before the token and place the entire thing in quotes.*

The rest sensor pulls the state of the add-on (if its running or not) and then also pulls the version which is the current running version of the add-on. It also pulls last_version which is the latest available version the add-on can pull. A later version may be available on Github, but the add-on hasn’t synced and doesn’t see the version yet.

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

## SNMP

More information can be found [here](https://github.com/noodlemctwoodle/homeassistant/tree/master/.github/wiki/guides/unraid#some-of-the-sensors-discovered-to-far)
