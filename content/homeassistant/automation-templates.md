**Rate Limit Automation to Every x Time Template**
```python
{{ ( as_timestamp(now()) - as_timestamp(state_attr('automation.<ID>', 'last_triggered')) |int(0) ) > 30 }}
```
- the `<ID>` is the alias of the automation
```yaml
- id: '1729639342963'
  alias: Update SponsorBlock
```
- in this case the entity ID to put is `update_sponsorblock`
- change `> 30` to another seconds value to limit the automation, this automation will only run if it's not been run in the last 30 seconds

[**Rest Commands with Arguments**](rest-api-webhook.md#^63dce3)

