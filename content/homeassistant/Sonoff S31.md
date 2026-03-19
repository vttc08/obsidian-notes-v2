Download [HACS](hacs.md)

~~In HACS, search for Sonoff LAN.
Connect the Sonoff S31 via the [ewelink](https://play.google.com/store/apps/details?id=com.coolkit&hl=en_IN&pli=1) app and configure the smart switch accordingly
Login to Ewelink in homeassistant and the devices should appear.~~

Update: this is no longer working as it won't be updated in real time
https://github.com/AlexxIT/SonoffLAN

Workaround is to use Tasmota flashing
https://tasmota.github.io/docs/devices/Sonoff-S31/
https://www.adventurousway.com/blog/sonoff-s31#connect-flashing-wires
Website for flashing: https://tasmota.github.io/install/

## Tasmota
Connect to `Tasmota_` Wi-Fi first to configure the device and join the Wi-Fi network.
Configure [static IP](https://tasmota.github.io/docs/Commands/#wi-fi)
```c
IPAddress 10.10.120.123
Restart 1
```
- `ipaddress2` is gateway and `ipaddress3` is subnet mask, these usually don't need changing
- reboot the device after setting IP
Configure MQTT
### Other Useful Configuration
```c
TelePeriod 10
WattRes 2
```
- change MQTT update interval
- change the energy to 2 decimal places
## HA Integration
The Sonoff Tasmota will be discovered automatically by Home Assistant. However, **a restart is required**.
