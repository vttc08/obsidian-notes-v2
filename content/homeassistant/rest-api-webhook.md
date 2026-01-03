This is about integration to and from HASS regarding REST API and web framework related.

**Webhook**
https://www.home-assistant.io/docs/automation/trigger/#webhook-trigger
Create an automation and set the trigger to webhook.
The webhook will be a long randomized string for security
![](assets/Pasted%20image%2020241022205553.png)
If `Only Accessible from the local network` is selected, only the `ip:port` can be used. 
The webhook can accept both GET and POST requests.
```shell
curl -X POST -d 'key=value&key2=value2' https://192.168.0.1:8123/api/webhook/some_hook_id
```
- the address is located at `/api/webhook`

## Rest API
To use rest API, need to create a key
- under Profile -> Security -> Long-lived access token
https://developers.home-assistant.io/docs/api/rest/
The authentication is done via header
```yaml
Authorization: Bearer token_here
```
**Get entity state or attribute** GET
```
/api/states/entity.id
```
- exposes all attributes and state
- use `states` endpoint without ID to get all the entities

**Trigger an Action** POST (formerly known as service)
```
/api/services/<domain>/<service>
```
```json
{"entity_id": "domain.entity_id"}
```
- the `domain` eg. switch, automation
- the `service` is the type of action
For example in HA, the action is `switch.turn_off`, switch is the domain and `turn_off` is the service, the full URL would be `api/services/switch/turn_off` 

**POST With Data** (eg. to send command via adb shell)
The data is to be included in the payload, assuming in Developer Tools the YAML command is
```yaml
action: androidtv.adb_command
target:
  entity_id: media_player.android_tv_adb
data:
  command: RIGHT
```
- the action takes parameter `command` via value `RIGHT`
The respective JSON payload
```json
{"entity_id": "media_player.android_tv_adb", "command": "RIGHT"}
```

**Rest Commands (Action)** ^63dce3
https://www.home-assistant.io/integrations/rest_command/
To include restful commands in [configuration.yaml](configuration.yaml.md)
```yaml
rest_command: !include rest.yaml
```

```yaml
name_of_action::
  url: 'http://10.10.120.1:1378/api/StartAction'
  method: POST
  headers:
    content-type: 'application/json'
  payload: '{"key": "value", "array": [{"k": "v", "value": "{{ variable }}"}]}'
```
- `name_of_action` the action that will be displayed as `rest_command.name_of_action` 
- options for request types and header
- payload is the data that will be sent to the API
	- the content of the payload can be customized using `{{ variable }}`
To use custom variables in automation
```yaml
    - service: rest_command.name_of_action
      data: # additional options
        variable: value_that_replace_variable
	  data: {} # if no additional options defined
```
- the custom variable is defined under `data` block as key value pairs
