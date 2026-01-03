`Configuration.yaml` is the main location for Home Assistant for storing configurations. Edits such as adding a new entry requires a full HASS restart. Where as editing other parts can be refresh by hot-reload.

**Configuration can be split**
https://www.home-assistant.io/docs/configuration/splitting_configuration/
For example, with `!include_dir_merge_list` in `configuration.yaml`
```yaml
mqtt: !include_dir_merge_list mqtt/
```
Now the mqtt configurations can be placed in a folder `./mqtt` relative to config and and with files `teslamate.yaml` and `sonoff.yaml` which consists list of acceptable mqtt entities. Everything will be merged together as a single list.
