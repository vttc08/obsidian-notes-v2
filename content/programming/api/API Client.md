# Bruno
Doesn't support restore UI state

API Client similar to Postman
Download https://www.usebruno.com/
```bash
winget install bruno.bruno
```

## Hoppscotch
```powershell
winget install hoppscotch.hoppscotch
```

Supports individual collection import (not full Postman import).

### Importing Collections
![](assets/Pasted%20image%2020260216165004.png)
- Supports Postman and OpenAPI import.

### Adapting the API
Use **Secrets and Variables** to set API keys and base URLs.  
![](assets/Pasted%20image%2020260216165502.png)

1. Check the properties.
2. Verify or create variables for base URL and API keys.
3. Create or edit an environment.
4. Update environment-specific secrets or variables.

Hoppscotch uses `<<>>` for variables, not `{{}}`.  
![](assets/Pasted%20image%2020260216165803.png)

#### OpenAPI
When importing plain OpenAPI, auth types reset. Use this script to fix the export (default location is `Downloads`).

```python
import sys
import json

file = sys.argv[1]
with open(file, 'r') as f:
    data = json.load(f)

folders = data['folders']
allrequests = [rq for folder in folders for rq in folder['requests']]

for rq in allrequests:
    rq['auth']['authType'] = 'inherit'

with open(f'{file}', 'w') as f:
    json.dump(data, f, indent=4)

print(f"Updated {len(allrequests)} requests in {file}")
```

1. Export the imported OpenAPI specification.
2. Run the script in the `Downloads` folder.
3. Re-import the updated JSON file.

You may need to change the base URL if it is hardcoded in the OpenAPI spec.  
Example (Radarr OpenAPI):

```json
},
  "servers": [
    {
      "url": "<<radarr_base_url>>",
```

- The URL was replaced with `<<radarr_base_url>>` so Hoppscotch can resolve it.

### Using an API
- **Ctrl+Enter** sends a request.
> [!danger] Ctrl+Backspace does not delete a word. It clears the response content and cannot be changed.

Supports `jq` syntax for filtering.

### Sync on Another Computer
```powershell
%appdata%\io.hoppscotch.desktop
```
Copy this folder to another machine.


## Requestly
```powershell
winget install browserstackinc.requestly
```
### Import from Postman
Accounts -> Settings -> Export your data
In Requestly
![](assets/Pasted%20image%2020260216141546.png)
> Warning: default workspace import doesn't save the files and environments, you must create a new workspace

Bugs with path variables, not working
