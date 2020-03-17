




### Setup MQTT on Home Assistant
Im not going to go through the setup for MQTT as there is plenty of guides out there. If you are running Home Assistant (Hassio) Docker then you can just install the addon package. and the integration. 

These need to be configured and working before you proceed to configure the UnRAID-API
 - Mosquitto broker
 - MQTT Integration

Home Assistant have documentation [here](https://github.com/home-assistant/hassio-addons/blob/master/mosquitto/README.md) on the add-on package.

### UNRAID-API Container Configuration

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