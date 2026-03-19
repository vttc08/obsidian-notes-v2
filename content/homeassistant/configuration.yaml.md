`Configuration.yaml` is the main location for Home Assistant for storing configurations. Edits such as adding a new entry requires a full HASS restart. Where as editing other parts can be refresh by hot-reload.

## Splitting
https://www.home-assistant.io/docs/configuration/splitting_configuration/
### Default
`configuration.yaml`
```yaml
mqtt: !include mqtt.yaml
```
`mqtt.yaml`
```yaml
- a: b
  c: d
```
Which will be equivalent to 
```yaml
mqtt:
- a: ...
```
### Directory
#### `dir_merge_list`
`configuration.yaml`
```yaml
mqtt: !include_dir_merge_list mqtt/
```
Now the mqtt configurations can be placed in a folder `./mqtt` relative to config and and with files `teslamate.yaml` and `sonoff.yaml` which consists list of acceptable mqtt entities. Everything will be merged together as a single list.
- files in the subfolder should contain lists
```yaml
- sensor1:
  icon: ...
  - name: ...
```
#### `dir_list`
Each file in that directory should only contain 1 object which will be merged into a list
```yaml
# mqtt/sensor1.yaml
icon: ...
  - name: ...
```
### `dir_named`
Similar to `dir_list` which must contain an object, but it will be merged as object it self rather than a list.
#### `dir_merge_named`
Similar to `dir_merge_list`, each objects will be grouped together.
![](assets/Pasted%20image%2020260315231449.png)


