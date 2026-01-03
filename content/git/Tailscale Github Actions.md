Using tailscale to allow Github action bot to connect to internal network resources.
This is the workflow jobs configuration
```yaml
jobs:
    tailscale-build:
      runs-on: ubuntu-latest
      steps:

      - name: Tailscale
        uses: tailscale/github-action@v2
        with:
          oauth-client-id: ${{ secrets.TS_OAUTH_CLIENT_ID }}
          oauth-secret: ${{ secrets.TS_OAUTH_SECRET }}
          args: --accept-routes
          tags: tag:ci
```

**Joining tailnets**
To need create an [oauth client](https://login.tailscale.com/admin/settings/oauth) and must be tagged. The client should have all read and write permission.
![](assets/Pasted%20image%2020240603230917.png)
- then tailscale will give out `client id` and `secret` 

`args: --accept-routes` makes subnet routes such as `10.10.120.16` available to the bot

**Tags** must be defined in [ACL controls](https://login.tailscale.com/admin/acls/file).
```json
	"acls": [
		// Allow all connections.
		// Comment this section out if you want to define specific restrictions.
		{"action": "accept", "src": ["*"], "dst": ["*:*"]},
	],
	"tagOwners": {
		"tag:ci": ["hukevin69@gmail.com"],
	},
```
- the tags are defined in `tagOwners`, with `tag:ci` defining the name with email address of who owns the tag
- once a machine is tagged, to untag it, it must be removed and reauthenticated
