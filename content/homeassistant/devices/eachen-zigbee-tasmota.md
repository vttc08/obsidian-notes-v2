The device runs tasmota and uses [Zigbee2Tasmota](https://tasmota.github.io/docs/Zigbee/)configuration is done on web interface `10.10.120.30`

## Tasmota
> [!notes] These only apply reading sensors, commands are not covered.

Pair new devices via WebUI.
Tasmota commands are case sensitive.
Each device will get a 16-bit integer eg `0x127C`, also known as it's short address. It can be renamed, however the short-address will still be the same
```c
ZBName 0xB743, Friendly-name
```
![](assets/sn-zb02.png)
The name will be reflected, to get list of devices 
```c
ZBStatus
ZBInfo
```
```json
{"ZbStatus1":[{"Device":"0x127C"},{"Device":"0xB743","Name":" SNZB-02"},{"Device":"0x6841"},{"Device":"0x98B4"}]} //ZBStatus
{"ZbInfo":{"0x127C":{"Device":"0x127C" ,"Temperature":23.03 ,"Humidity":56.29 ,"Reachable":true ,"BatteryPercentage":47,}}} //ZBInfo
```
- `ZBInfo` sends the last sensor attributes and in the same topic as `ZBReceived` normal data but it has a key of `ZbInfo` instead
The `ZBReceived` message can be flipped via
```c
SetOption 83 1  
```
- 1, the friendly name become the key
- 0, the short addr become the key
```json
{"ZbReceived":{"0xB743":{"Device":"0xB743","Name":" SNZB-02","
```
### MQTT
To send a message
```c
Publish topic/endpoint payload
```
For better organize the MQTT topics
```c
SetOption 89 1
SetOption 112 1
```
- option 89 changes the MQTT topic from `SENSOR` into `<dev_name>/SENSOR` making it easier to separate devices
- option 112 uses friendly name rather than 16-bit integer in MQTT topic
	- after `83,89,112`, the MQTT topic now become `<friendly_name>/SENSOR` with json keys of `['ZbReceived']['<friendly_name>']`
The default MQTT topic is
![](assets/Pasted%20image%2020241108210933.png)
- by default the full topic is `/tele` which is the prefix and `./bridge_tasmota_%06X` which is the device name of the bridge
### Home Assistant MQTT configuration
When separating the topic by devices now, all devices won't send everything all in `SENSOR`, each MQTT device only need to listen to it's specific topic, reducing log spam when Home Assistant tries to query the MQTT topic for a device/attribute but instead receives another one.
The MQTT topics layout are as such with a `ZbReceived` json
```powershell
tele/bridge/<friendly_name>/SENSOR
```

**Default MQTT Template**
```yaml
- sensor:
  - name: "Tuya Temperature"
    unique_id: zb_tuya_temperature
    object_id: tuya_temperature
    state_topic: &tuya_state_topic "tele/bridge_tasmota_2D251C/Tuya-Sensor/SENSOR"
    value_template: "{{ value_json.ZbReceived['Tuya-Sensor'].Temperature if 'Temperature' in value_json.ZbReceived['Tuya-Sensor'] else states('sensor.tuya_temperature') }}" # assume last value
    device_class: "temperature"
    expire_after: 86400
    unit_of_measurement: "°C"
    device: &tuya_device_info
      identifiers: [tuya_0x127C]
      configuration_url: http://10.10.120.16:1883
      manufacturer: Tuya
      model: "0x127C"
      name: "Tuya Temperature and Humidity Sensor"
    icon: mdi:thermometer
```
- `object_id` correspond to `entity_id` in UI
- `state_topic` is the path to MQTT message
	- the & syntax makes it reusable if a device has multiple entities
```yaml
    state_topic: &tuya_state_topic "tele/bridge_tasmota_2D251C/Tuya-Sensor/SENSOR"
    state_topic: *tuya_state_topic
```
- `value_template` determine an entity's value based on MQTT message (in zigbee tasmota, it's JSON)
	- since ZB devices do not send the full payload with all attributes every time, the template check whether the key exists in JSON first otherwise assume last value (if that failed, it become unavailable and error in log)
```yaml
    value_template: "{{ value_json.ZbReceived['Tuya-Sensor'].Temperature if 'Temperature' in value_json.ZbReceived['Tuya-Sensor'] else states('sensor.tuya_temperature') }}" # assume last value
```
- change `Tuya-Sensor` with name of devices in `ZBName` and `tuya_temperature` with the current entity
More configuration options https://www.home-assistant.io/integrations/sensor.mqtt/