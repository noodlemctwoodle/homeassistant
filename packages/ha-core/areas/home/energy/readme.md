# Energy Monitoring View for HKI

## Requirements

 - [Utility meter](https://www.home-assistant.io/integrations/utility_meter/) The utility meter integration provides functionality to track consumptions of various utilities (e.g., energy, gas, water, heating).

 ```yaml
 # Utility Meter
utility_meter:
  monthly_energy_kwh:
    source: sensor.energy_total_usage
    cycle: monthly
  monthly_energy_w:
    source: sensor.power_total_usage
    cycle: monthly
  daily_energy_kwh:
    source: sensor.energy_total_usage
    cycle: daily
  daily_energy_w:
    source: sensor.power_total_usage
    cycle: daily
```

## Energy Sensors

This template sensor totals all your smart plugs, ESP8266 and other hardware that record energy usage into a single entity

```yaml
- platform: template
  sensors: 
    energy_total_usage:
      friendly_name: Total Energy Usage
      unit_of_measurement: kWh
      value_template: >-  
        {{ 
          (states.sensor.sp_lr_amp_total_daily_energy.state | float) +
          (states.sensor.sp_of_cab_total_daily_energy.state | float) +
          (states.sensor.office_pdu_smart_plug_total_daily_energy.state | float) +
          (states.sensor.living_room_tv_smart_plug_total_daily_energy.state | float)
        }}
```

This sensors multiplies your daily energy sensor created by `Utility Meter` and your cost per KwH unit to give you and over all cost of energy per day. Please be aware you will need to change the `0.2420` figure to match your energy suppliers cost. 

```yaml
    daily_energy_cost:
      entity_id: sensor.daily_energy_kwh
      friendly_name: 'Daily Cost'
      value_template: >-
        {% if (states.sensor.daily_energy_kwh.state|float > 0) %}
          {{ (states.sensor.daily_energy_kwh.state|float * 0.2420)|round(2) }}
        {% endif %}
```

Further sensors can be added for monthly total found [here](http://someurl.com)

## Energy View

The  view for HKI can be found  [here](http://someurl.com)