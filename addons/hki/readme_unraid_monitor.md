# UnRAID Monitoring View for HKI
#### Version 0.4

![unraid-monitor](../../images/views/unraid.png)

### UnRAID Data Monitoring Feeds

| [UnRAID-API](../../guides/unraid_metrics.md#unraid-api-configuration) | [UnRAID-SNMP](../../guides/unraid_metrics.md#unraid-snmp-configuration) | [UnRAID Glances Container](https://github.com/hassio-addons/addon-glances/blob/v0.7.1/README.md) |
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
 - Added SNMP [config](https://github.com/noodlemctwoodle/homeassistant/blob/4fc9a4634a3bf423a8cec746b7c5d4f542dd697a/packages/ha_core/areas/cabinet/devices/unraid_monitoring.yaml#L59)
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
 - Fixed Font Size Bar-Card Colour overlap issue

Version 0.5
 - Fixed issue with Bar-Card 3.0.5
 - Merged features from Dwains-Theme UnRAID Addon
    - Added disk usagew percentages for Cache, USB, Backups
 - Added Graph card for Cache & Backup usage
 - Added an additional [sensor](https://github.com/noodlemctwoodle/homeassistant/blob/4fc9a4634a3bf423a8cec746b7c5d4f542dd697a/packages/ha_core/areas/cabinet/devices/unraid_monitoring.yaml#L17) as a workaround for Bar-Card severity


 HKI UnRAID view can be found [here](https://github.com/noodlemctwoodle/homeassistant/blob/master/homekit-infused/user/views/system/unraid-docker.yaml)

 #### Credits
 - [Jimz011](https://github.com/jimz011) Thanks for your assistance and ideas on this :)
 - [Stephan](https://github.com/Stephan296) Thanks for creating the version sensor curl request and exploring the correct configuration for the UnRAID-API.
 - [ElectricBrainUK](https://github.com/ElectricBrainUK/UnraidAPI) Thanks for creating this API for us to use and making this dashboard possible
 - [123](https://community.home-assistant.io/u/123/summary) Thanks for solving the problem with parenthesis
 - [Avi](https://github.com/abeksis/My-HomeAssistant-Config) Thanks for creating the awesome graphics used in v1.2 containers swipe-card and also providing code snips. 
 - [OnlyMe](https://github.com/Holewijn/home-assistant-config) Thanks for adding the additional container images

### Donations

If you like my work please feel free to buy me a coffee

<a href="https://www.buymeacoffee.com/noodlemctwoodle" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
