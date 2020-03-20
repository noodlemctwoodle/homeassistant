


## Install the UnRAID SNMP Plugin
```
https://raw.githubusercontent.com/coppit/unraid-snmp/master/snmp.plg
```




### LM Sensors Values
'''
snmpwalk -v 2c -On -c public localhost LM-SENSORS-MIB::lmTempSensorsTable
```


```
snmpwalk -v 2c -On -c public localhost LM-SENSORS-MIB::lmTempSensorsValue
```


```OID Values
snmpwalk -v 2c -On -c public localhost LM-SENSORS-MIB::lmTempSensorsValue
```


### Disk Info
```
snmpwalk -v 2c -c public localhost NET-SNMP-EXTEND-MIB::nsExtendOutLine