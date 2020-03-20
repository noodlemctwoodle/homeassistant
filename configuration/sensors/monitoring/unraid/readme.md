


## Install the UnRAID SNMP Plugin
```
https://raw.githubusercontent.com/coppit/unraid-snmp/master/snmp.plg
```
![plugin-install](https://github.com/noodlemctwoodle/homeassistant/tree/unraid-view-1.2-dev/www/images/github/unraid-snmp/plugin-install.png)

Run a test query to confirm SNMP is working correctly

snmpwalk -On -v 2c localhost -c public 'NET-SNMP-EXTEND-MIB::nsExtendOutLine."disktemp"'

![test-query](https://github.com/noodlemctwoodle/homeassistant/tree/unraid-view-1.2-dev/www/images/github/unraid-snmp/test-query.png)

Make a note of the OID 
    .1.3.6.1.4.1.8072.1.3.2.4.1.2.8.100.105.115.107.116.101.109.112.1

Create a SNMP sensor in your config

```yaml
- platform: snmp
  name: 'UnRAID PARITY Temperature'
  host: 1.2.3.4
  port: 161
  community: public
  baseoid: 1.3.6.1.4.1.8072.1.3.2.4.1.2.8.100.105.115.107.116.101.109.112.1
  accept_errors: true
  value_template: >
     {{ value | regex_findall_index("(\d+)$") }}
  unit_of_measurement: '°C'
```



### LM Sensors Values

```
snmpwalk -v 2c -On -c public localhost LM-SENSORS-MIB::lmTempSensorsTable
```

```
snmpwalk -v 2c -On -c public localhost LM-SENSORS-MIB::lmTempSensorsValue
```

### Disk Info
```
snmpwalk -v 2c -On -c public localhost NET-SNMP-EXTEND-MIB::nsExtendOutLine