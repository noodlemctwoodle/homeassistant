# SNMP Sensors for UnRAID HKI View v1.2


## Install the UnRAID SNMP Plugin
```
https://raw.githubusercontent.com/coppit/unraid-snmp/master/snmp.plg
```
![plugin-install](https://github.com/noodlemctwoodle/homeassistant/blob/unraid-view-1.2-dev/www/images/github/unraid-snmp/plugin-install.png)

Run a test query to confirm SNMP is working correctly

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

You ned to 'cat' the '.txt' file and locate the sensors

![mib-txt](https://github.com/noodlemctwoodle/homeassistant/blob/unraid-view-1.2-dev/www/images/github/unraid-snmp/mib-file.png)

You can then string together the 'snmpwalk' commad

|Intial command|MIB-FILE-NAME|Sensor Name|
|---|---|---|
|snmpwalk -v 2c -On -c public localhost | LM-SENSORS-MIB::|lmFanSensorsTable|

![mib-query](https://github.com/noodlemctwoodle/homeassistant/blob/unraid-view-1.2-dev/www/images/github/unraid-snmp/sensor-query.png)

This Queery is split up into 3 sections
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
example goes here.... 
```

Some of the sensor I have created can be found in my config [here](https://github.com/noodlemctwoodle/homeassistant/blob/unraid-view-1.2-dev/configuration/sensors/monitoring/unraid/unraid.yaml) from Line 30 onwards.


## Some of the sensors discovered to far...

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