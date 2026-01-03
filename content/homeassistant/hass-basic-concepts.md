https://www.home-assistant.io/getting-started/concepts-terminology
Device - logical grouping one or more entities, can represent a physical device
- each device will have entities

Entities
entities have ID, Name, State and Attributes
entities are usually part of a device or service
- ID: `sensor.my-entity-id`, the `sesnro` is belongs a domain
- Name is the friendly name
- State: eg. temperature; each entity can only have one state
- Attribute:

Integration: how a device gets added into HA
Services: send command from HA to device
- eg. `light.turn_on`
