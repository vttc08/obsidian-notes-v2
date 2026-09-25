[copilot](copilot.md)
[codex](codex.md)
### AGENTS.MD
`AGENTS.md` - general instructions for Codex/Copilot/OpenCode
- `AGENTS.md` in other subfolder with granular rules
- show examples (bad vs good)
- project structure
- set boundaries
	- e.g. do not delete files, write docs in `/docs`
### Agents
- documentation
- testing
- api/uxui
- deployment
Agent locations
- `.codex/agents/`
- `.github/agents/`
- `.agents/agents/`
- `.claude/agents/`

Codex: https://github.com/VoltAgent/awesome-codex-subagents/tree/main/categories

Best practice
https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/

Custom agents are usually located in `./{cli_tool}/agents`

### Skills
Directory of markdown files
Codex: https://github.com/openai/skills/tree/main/skills/.curated
Other: https://github.com/addyosmani/agent-skills
```bash
npx skills find something
```
skills location are different between  copilot vs codex/opencode
- `.github/skills/<name>/SKILL.md`
- `.agents/skills`
Skills can be shared between Copilot and Codex and Antigravity
Skill structure
```markdown
---
name: skill-name
description: When the skill is triggered
---
```
Skill allow bundle of different structures
- e.g. a subfolder `./scripts` containing scripts to run when the skill is triggered

Impeccable
```bash
npx skills add pbakaus/impeccable
```
- after impeccable is setup, run `/impeccable teach` which will generate a `PRODUCT.md`

Useful impeccable commands
- distill - remove complexity make UI simpler
- polish - do final pass before finishing
- adapt - responsive design (mobile/tablet/desktop)
- colorize - add better colors/palette
- layout - rearrange items, fix spacing
### MCP
For Google Antigravity, MCPs are enabled globally, not per project.
#### Context 7 (global)
consists of MCP server and skills
```bash
npx ctx7 setup
```
Codex should be setup automatically, for copilot, it's the `~/.copilot/mcp-config.json` for global config
#### Google Stitch
```bash
npx skills add google-labs-code/stitch-skills
```
This adds Google Stitch skills into the project.
The other way is to install it as plugins.
Not working with Github copilot, because of skill names.
Stitch can generate a design.md file, place it into root folder

Temporary notification
Use tmux bell
```bash
set-hook -g alert-bell 'run-shell "~/scripts/notify_me.sh"'
```

Tailing  session logs
Location `~/.codex/sessions/2026/05/20/*.jsonl`
```
.payload.type = task_complete
.payload.name = request_user_input
```
The `agent-turn-complete` is a Codex native notification feature
~~- will also trigger when planning mode finished~~
~~The `PermissionRequest` hook is not useful, only fires when it request for permission to run commands (not applicable to YOLO)~~

For Codex notification, add a notification in global configuration
```toml
notify = ["python3", "/full/path/of/py"]
```
- use a Home Assistant webhook and this JSON schema
```json
{"title","project","message"}
```

```bash
 sudo inotifywait -m -r -e modify ~/.copilot/session-state/ --include '\.jsonl$'
```
Github Copilot in the format of `.type, .data.toolName`
```
tool.execution_start
ask_user
tool.execution_start
exit_plan_mode
```
Finishing an autopilot task (there may be multiple)
```
session.task_complete
null
```


