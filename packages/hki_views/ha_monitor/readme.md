# Home Assistant Monitoring View for HKI

![hassio-monitor](https://github.com/noodlemctwoodle/homeassistant/blob/master/www/images/github/views/ha-core.png)

## Version 0.1 - Initial release (work in progress)

 - Reload, Snapshot, Restart, Reboot buttons added
 - System Temperatures added
 - Added Resources to swipe-card
 - Moved disk usage to resources
 - Added Home Assistant Core Addon support start/stop
 - Moved internet to swipe-card
 - Fixed issue with bar-card border radius

### Home Assistant Core Addon Support

HKI System view can be found [here](https://github.com/noodlemctwoodle/homeassistant/blob/master/user_content/views/system_user_content.yaml)
     
Configuration instructions can be found [here](https://github.com/noodlemctwoodle/homeassistant/tree/master/packages/ha-core/areas/cabinet/devices/home_assistant)

 #### Credits
 - [SilvrrGIT](https://github.com/SilvrrGIT/HomeAssistant) Excellent post on the community [forum](https://community.home-assistant.io/t/get-notified-of-available-hassio-addon-updates/176626) outlining how to create rest senosr to start/restart Home Assistant Core Addons, Create the switches used in my HKI System view and the post also describes how write automations for addon update available notifications.