# Sonoff SN-ZB03
Using Tasmota and MQTT

**MQTT Information** Sent to SENSOR
```json
{"ZbReceived":{"0x6841":{"Device":"0x6841","0500?00":"000000000000","ZoneStatusChange":0,"Occupancy":0,"Endpoint":1,"LinkQuality":105}}}
```
The `Occupancy` is used for motion detection.

```yaml
- binary_sensor:
  - name: Sonoff Occupancy
    unique_id: zb_sonoff_occupancy
    object_id: sonoff_occupancy
    state_topic: "tele/bridge_tasmota_2D251C/SENSOR"
    value_template: "{{ value_json.ZbReceived['0x6841'].Occupancy }}"
    device_class: "occupancy"
    expire_after: 86400
    payload_on: 1
    payload_off: 0
    device: &sonoff_motion_device_info
      identifiers: [sonoff_0x6841]
      configuration_url: http://10.10.120.16:1883
      manufacturer: Sonoff
      model: "0x6841"
      name: "Sonoff Motion Sensor"
    icon: mdi:motion-sensor
```
The motion sensor is a [binary sensor](https://www.home-assistant.io/integrations/binary_sensor/)
![](assets/Pasted%20image%2020240918202309.png)
![](assets/Pasted%20image%2020240918202312.png)
![](assets/Pasted%20image%2020240918202421.png)

Since motion is a binary sensor, it needs a `payload_on` and `payload_off`. In this case 0 and 1.