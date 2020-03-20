# SNMP Sensors for UnRAID HKI View v1.2
 
 ## Credits
  - [Stephan](https://github.com/Stephan296) Suggested this plugin, assisted finding SNMP sensors, provided code examples
 - [Avi](https://github.com/abeksis/My-HomeAssistant-Config) Tested the  guide and submitted all the bugs. 
 


## Install Perl for UnRAID

Install NerdPack GUI from the UnRAID community store

![nerd-pack-gui](https://github.com/noodlemctwoodle/homeassistant/blob/unraid-view-1.2-dev/www/images/github/unraid-snmp/nerdpack-gui.png)

Next go to plugins and click on the NerdPack plugin icon, scroll down the list and enable 'perl-5.30.1-x86_64-1.txz'

![nerd-pack-perl](https://github.com/noodlemctwoodle/homeassistant/blob/unraid-view-1.2-dev/www/images/github/unraid-snmp/enable-perl.png)


## Install the UnRAID SNMP Plugin

Install 'SNMP' from the community store

![plugin-install](https://github.com/noodlemctwoodle/homeassistant/blob/unraid-view-1.2-dev/www/images/github/unraid-snmp/install-plugin.png)


## Run a test query to confirm SNMP is working correctly

Make sure you run these queries to ensure the plugin is working correctly.

    snmpwalk -v 2c localhost -c public 'NET-SNMP-EXTEND-MIB::nsExtendOutLine."disktemp"'

    snmpwalk -On -v 2c localhost -c public 'NET-SNMP-EXTEND-MIB::nsExtendOutLine."disktemp"'

![test-query](https://github.com/noodlemctwoodle/homeassistant/blob/unraid-view-1.2-dev/www/images/github/unraid-snmp/test-query.png)

Make a note of the OID 

    .1.3.6.1.4.1.8072.1.3.2.4.1.2.8.100.105.115.107.116.101.109.112.1

Make a note of the disk serial numbers and match it to the disk number in UnRAID 

    STRING: **ST6000VN0033-2EE110_ZAD4BDGE**

![disk-sn](https://github.com/noodlemctwoodle/homeassistant/blob/unraid-view-1.2-dev/www/images/github/unraid-snmp/disk-sn.png)

## Create a SNMP sensor in your config

This Sensor will only show the numerical value of the output. 

```yaml
- platform: snmp
  name: 'UnRAID PARITY Temperature'
  host: 1.2.3.4
  port: 161
  community: public
  baseoid: .1.3.6.1.4.1.8072.1.3.2.4.1.2.8.100.105.115.107.116.101.109.112.1
  accept_errors: true
  value_template: >
     {{ value | regex_findall_index("(\d+)$") }}
  unit_of_measurement: '°C'
```

## Building a snmpwalk query string

All the SNMP Mib values can be found on your UnRAID sever in: 

    /usr/share/snmp/mibs

You need to 'cat' the '.txt' file and locate the sensors

![mib-txt](https://github.com/noodlemctwoodle/homeassistant/blob/unraid-view-1.2-dev/www/images/github/unraid-snmp/mib-file.png)

You can then string together the 'snmpwalk' commad

|Intial command|MIB-FILE-NAME|Sensor Name|
|---|---|---|
|snmpwalk -v 2c -On -c public localhost | LM-SENSORS-MIB::|lmTempSensorsTable|

![mib-query](https://github.com/noodlemctwoodle/homeassistant/blob/unraid-view-1.2-dev/www/images/github/unraid-snmp/sensor-query.png)

    snmpwalk -v 2c -On -c public localhost LM-SENSORS-MIB::lmTempSensorsTable

This query is split up into 3 sections
 - INTEGER
 - STRING
 - GAUGE

These can then be matched with the corresponding OID. In the example below the 'INTEGER', 'STRING' & Gauge32 all belong to CPU TEMP

    .1.3.6.1.4.1.2021.13.16.2.1.1.1 = INTEGER: 1
    .1.3.6.1.4.1.2021.13.16.2.1.2.1 = STRING: CPU Temp
    .1.3.6.1.4.1.2021.13.16.2.1.3.1 = Gauge32: 44000


In this example they all belong to Core 0

    .1.3.6.1.4.1.2021.13.16.2.1.1.2 = INTEGER: 2
    .1.3.6.1.4.1.2021.13.16.2.1.2.2 = STRING: Core 0
    .1.3.6.1.4.1.2021.13.16.2.1.3.2 = Gauge32: 26000


```yaml
- platform: snmp
    name: 'UNRAID CPU TEMP'
    host: 1.2.3.4
    port: 161
    community: public
    baseoid: .1.3.6.1.4.1.2021.13.16.2.1.3.19
    accept_errors: true
    unit_of_measurement: '°C'
    value_template: '{{((value | float) / 1000) | round(2) }}'
```

Some of the sensor I have created can be found in my config [here](https://github.com/noodlemctwoodle/homeassistant/blob/unraid-view-1.2-dev/configuration/sensors/monitoring/unraid/unraid.yaml) from Line 30 onwards.


## Some of the sensors discovered to far...

I'll add more sensors here as time goes on and as I go through and discover them. If you find any good ones please contact me on the HKI discord and I'll be sure to add them. 

#### Temperature Sensors
```
snmpwalk -v 2c -On -c public localhost LM-SENSORS-MIB::lmTempSensorsTable
```

#### Fan RPM
```
snmpwalk -v 2c -On -c public localhost LM-SENSORS-MIB::lmFanSensorsTable
```

#### Disk/Share Info
```
snmpwalk -v 2c -On -c public localhost NET-SNMP-EXTEND-MIB::nsExtendOutLine
```


## Sensor Examples

```yaml
  - platform: snmp
    name: 'UNRAID DISK 1 USED'
    host: 1.2.3.4
    port: 161
    community: public
    baseoid: .1.3.6.1.2.1.25.2.3.1.6.31
    accept_errors: true
    unit_of_measurement: 'GB'
    value_template: '{{((value | float) * 0.000004096) | round(2) }}'
```


### Buy me a toilet roll?. 

<a href="https://www.buymeacoffee.com/noodlemctwoodle" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>