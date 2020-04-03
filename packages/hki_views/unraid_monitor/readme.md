# UnRAID Monitoring View for HKI
## Version 0.4

![unraid-monitor](https://github.com/noodlemctwoodle/homeassistant/blob/master/www/images/github/views/unraid.gif)

### UnRAID Data Monitoring Feeds

| [UnRAID-API](https://github.com/noodlemctwoodle/homeassistant/blob/master/packages/ha-core/areas/cabinet/devices/unraid/readme.md#unraid-api-configuration) | [UnRAID-SNMP](https://github.com/noodlemctwoodle/homeassistant/blob/master/packages/ha-core/areas/cabinet/devices/unraid/readme.md#unraid-snmp-configuration) | [UnRAID Glances Container](https://github.com/nicolargo/glances) |
|-----------------------|-----------------|--------------------------------|
| View arrayStatus      | HDD Array Temps | View total per disk used space |
| View arrayProtection  | LAN Throughput  | View total per disk free space |
| Total arrayDiskSpace  | Disk Space      | View CPU usage                 |
| Start/Stop Containers | CPU Load        | View RAM usage                 |

Version 0.1
 - Initial view
 - Glances container support
 - Glances Home Assistant Integration

Version 0.2
 - Added swipe card for docker containers
 - UnRAID-API added
 - Container Support

Version 0.3
 - Added SNMP [config](https://github.com/noodlemctwoodle/homeassistant/blob/master/packages/ha-core/areas/cabinet/devices/unraid/unraid_monitoring.yaml) Line 36 onwards
 - Moved temperature cards to swipe-card to reduce screen real estate
 - combined disk usage into swipe card
 - Added HDD temperatures to temperatures swipe-card
 - Added LAN Throughput bar graph to resources swipe-card
 - Removed Tap actions on mini-graph-card and bar-card
 - Fixed graph height issue on swipe-card
 - Added bullets to swipe card and removed progress bar
 - Fixed template issue on 'Array Usage' when Home Assistant gets value of unavailable or none

Version 0.4
 - Changed release version numbers
 - Fixed icon colours to match the rest of HKI views
 - Fixed issue with bar-card border radius
 - Fixed Mini-Graph-Card line colours
 - Fixed Font Size


 HKI UnRAID view can be found [here](https://github.com/noodlemctwoodle/homeassistant/blob/master/user_content/views/computers_user_content.yaml)

 #### Credits
 - [Jimz011](https://github.com/jimz011) Thanks for your assistance and ideas on this :)
 - [Stephan](https://github.com/Stephan296) Thanks for creating the version sensor curl request and exploring the correct configuration for the UnRAID-API.
 - [ElectricBrainUK](https://github.com/ElectricBrainUK/UnraidAPI) Thanks for creating this API for us to use and making this dashboard possible
 - [123](https://community.home-assistant.io/u/123/summary) Thanks for solving the problem with parenthesis
 - [Avi](https://github.com/abeksis/My-HomeAssistant-Config) Thanks for creating the awesome graphics used in v1.2 containers swipe-card and also providing code snips. 
 - [OnlyMe](https://github.com/Holewijn/home-assistant-config) Thanks for adding the additional container images
