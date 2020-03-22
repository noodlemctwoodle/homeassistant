# Home Asssistant Configuration

Open source home automation that puts local control and privacy first. Powered by a worldwide community of tinkerers and DIY enthusiasts. 

Be sure to <a class="github-button" href="https://github.com/noodlemctwoodle/homeassistant" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-star" aria-label="Star noodlemctwoodle/homeassistant on GitHub">Star</a> my repo

## Home Assistant Hardware Configuration
- Intel NUC i3 Gen 7
- Ubunbu Server 19.10
- Docker CE
- [Home Kit Infused](https://github.com/jimz011/homekit-infused)

## Hassio Installation on Ubuntu Server and Docker CE
The [Hassio](https://github.com/noodlemctwoodle/hassio/wiki/Install-Hass.io) guide describes how to install Hass.io on Ubuntu Server running Docker CE, configure custom storage paths using the pre-created script from [Home Assistant](https://github.com/home-assistant/hassio-installer) and exposed to the internet using Nabu Casa

## HKI Documentation can be found here
[Documentation](https://jimz011.github.io/homekit-infused/)

# UnRAID Monitoring View for HKI
## Version 1.2

![unraid-monitor](https://github.com/noodlemctwoodle/homeassistant/blob/unraid-view-1.2-dev/www/images/github/views/unraid.gif)

### UnRAID Data Monitoring Feeds

| [UnRAID-API](https://github.com/noodlemctwoodle/homeassistant/tree/master/user_content) | [UnRAID-SNMP](https://github.com/noodlemctwoodle/homeassistant/tree/master/configuration/sensors/monitoring/unraid) | [UnRAID Glances Container](https://github.com/nicolargo/glances) |
|-----------------------|-----------------|--------------------------------|
| View arrayStatus      | HDD Array Temps | View total per disk used space |
| View arrayProtection  | LAN Throughput  | View total per disk free space |
| Total arrayDiskSpace  | Disk Space      | View CPU usage                 |
| Start/Stop Containers | CPU Load        | View RAM usage                 |

Version 1.0
 - Initial view
 - Glances container support
 - Glances Home Assistant Integration

Version 1.1
 - Added swipe card for docker containers
 - UnRAID-API added
 - Container Support

Version 1.2
 - Added SNMP [config](https://github.com/noodlemctwoodle/homeassistant/tree/unraid-view-1.2-dev/configuration/sensors/monitoring/unraid)
 - Moved temperature cards to swipe-card to reduce screen real estate
 - combined disk usage into swipe card
 - Added HDD temperatures to temperatures swipe-card
 - Added LAN Throughput bar graph to resources swipe-card
 - Removed Tap actions on mini-graph-card and bar-card
 - Fixed graph height issue on swipe-card
 - Added bullets to swipe card and removed progress bar
 - Fixed template issue on 'Array Usage' when Home Assistant gets value of unavailable or none

 You can find the config [here](https://github.com/noodlemctwoodle/homeassistant/blob/master/user_content/views/computers_user_content.yaml)

 #### Credits
 - [Jimz011](https://github.com/jimz011) Thanks for your assistance and ideas on this :)
 - [Stephan](https://github.com/Stephan296) Thanks for creating the version sensor curl request and exploring the correct configuration for the UnRAID-API.
 - [ElectricBrainUK](https://github.com/ElectricBrainUK/UnraidAPI) Thanks for creating this API for us to use and making this dashboard possible
 - [123](https://community.home-assistant.io/u/123/summary) Thanks for solving the problem with parenthesis
 - [Avi](https://github.com/abeksis/My-HomeAssistant-Config) Thanks for creating the awesome graphics used in v1.2 containers swipe-card and also providing code snips. 
 - [OnlyMe](https://github.com/Holewijn/home-assistant-config) Thanks for adding the additional container images


## Check out my Wiki
Further information and guides can be found on my [wiki](https://github.com/noodlemctwoodle/hassio/wiki)

# If you want to buy me a coffee you can. 
I don't expect anything for my work and if you are thinking of donating you should consider donating the main developers of HKI or UNRAID-API. 
I don't drink beer, I don't like going outside because I might catch something, so if you want to buy me a coffee I would greatly appreciate it. 

<a href="https://www.buymeacoffee.com/noodlemctwoodle" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>