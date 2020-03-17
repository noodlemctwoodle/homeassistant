


# UnRAID Monitoring View for HKI
## Version 1.1
![unraid-monitor](https://github.com/noodlemctwoodle/homeassistant/blob/master/www/images/github/views/unraid.png)

What this Dashboard does
 - View arrayStatus
 - View arrayProtection
 - View diskSpace
 - Start/Stop Containers
 - View total per disk used space
 - View total per disk free space
 - View System Temperatures
 - View CPU usage
 - View RAM usage

 You can find the config [here](https://github.com/noodlemctwoodle/homeassistant/blob/master/user_content/views/computers_user_content.yaml)

 ## Credits
 - [Jimz011](https://github.com/jimz011) Thanks for your assistance and ideas on this :)
 - [Stephan](https://github.com/Stephan296) Thanks for creating the version sensor curl request and exploring the correct configuration for the UnRAID-API.
 - [ElectricBrainUK](https://github.com/ElectricBrainUK/UnraidAPI) Thanks for creating this API for us to use and making this dashboard possible
 - [123](https://community.home-assistant.io/u/123/summary) Thanks for solving the problem with parenthesis 


## Required Home Assistant Configuration


```yaml
input_text:
  card_containers:
    initial: Containers
  software_version:
    initial: Version
```

This [images](https://github.com/noodlemctwoodle/homeassistant/tree/master/www/images/hardware) are used in the view
 - unraid_logo.png

These [images](https://github.com/noodlemctwoodle/homeassistant/tree/master/www/images/software) are required for the containers
 - lidarr.png
 - nzbget.png
 - plex.png
 - radarr.png
 - sonarr.png
 - unraid-api.png


Bar-Card is required to be installed from HACs and added to lovelace/views/resources.yaml

```yaml
# Bar Card
  - url: /hacsfiles/bar-card/bar-card.js
    type: js
```

### Setup MQTT on Home Assistant
Im not going to go through the setup for MQTT as there is plenty of guides out there. If you are running Home Assistant (Hassio) Docker then you can just install the addon package. and the integration. 

These need to be configured and working before you proceed to configure the UnRAID-API
 - Mosquitto broker
 - MQTT Integration

<u>When setting up the MQTT integration, ensure that you tick the box to enable discovery.</u>


Home Assistant have documentation [here](https://github.com/home-assistant/hassio-addons/blob/master/mosquitto/README.md) on the add-on package.

Test you can connect to the MQTT instance

```
mosquitto_sub -h 192.168.1.201 -u 'username' -P 'password' -t "#"
```

### Setup Glances for UnRAID

Requirements:
 - Glances Docker Container installed on UnRAID
 - Glances Integration for Home Assistant setup to pull data from UnRAID


## UNRAID-API Container Configuration

Install the [UnRAID-API](https://github.com/ElectricBrainUK/UnraidAPI) on your UnRAID server, this can alo be installed from the UnRAID App Store.

![unraid-api-container](https://github.com/noodlemctwoodle/homeassistant/blob/master/www/images/github/unraid-api/unraid-api.png)

When you get to the configuration screen for the container following keys need to be added to the default container configuration

|Name|Type|Default|Description|
|---|---|---|---|
|MQTTRefreshRate|number|5|Time in seconds to poll for updates|
|MQTTCacheTime|number|1|Time in minutes after which all entities will be updated in MQTT|

As an example this is the value for key 7, you will need to replicate it for key 8 found in the table above. 

![Container Key](https://github.com/noodlemctwoodle/homeassistant/blob/master/www/images/github/unraid-api/key-7.png)

You will also need to configure your MQTT Broker, replacing the fields marked in Yellow.

![Container MQTT](https://github.com/noodlemctwoodle/homeassistant/blob/master/www/images/github/unraid-api/container-configuration.png)

### Starting The Container
When you start the container for the first time you must browse to the login screen of the UnRAID-API Web-UI and login with your UnRAID credentials. If this step is missed the API will not work. 

![Web-UI](https://github.com/noodlemctwoodle/homeassistant/blob/master/www/images/github/unraid-api/web-ui.png)

### Check Home Assistant
Once the UnRAID-API container is up and running check the mqtt integration, you should now have some UnRAID entities. If not please reboot your Home Assistant instance, once your Home Assistant instance has rebooted wait at least 3 minutes for entities to appear in the integration. 

![mqtt-integration](https://github.com/noodlemctwoodle/homeassistant/blob/master/www/images/github/unraid-api/mqtt.png)

### Setting Up Sensors

You need the following [Sensors](https://github.com/noodlemctwoodle/homeassistant/blob/master/configuration/sensors/template/unraid.yaml) to be configured in Home Assistant for the view to to collect:
 - arrayStatus
 - arrayProtection
 - diskSpace
 - latestRelease



# If you want to buy me a coffee you can. 
I don't expect anything for my work and if you are thinking of donating you should consider donating the main developers of HKI or UNRAID-API. 
I don't drink beer, I don't like going outside because I might catch something, so if you want to buy me a coffee I would greatly appreciate it. 


<a href="https://www.buymeacoffee.com/noodlemctwoodleF" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>