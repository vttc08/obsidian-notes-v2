`AGENTS.md` - general instructions for Codex/Copilot/OpenCode
- `AGENTS.md` in other subfolder with granular rules
- show examples (bad vs good)
- project structure
- set boundaries
	- e.g. do not delete files, write docs in `/docs`

Best practice
https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/

Custom agents are usually located in `./{cli_tool}/agents`

Skills - directory of markdown files
- skills location are different between  copilot vs codex/opencode
```bash
.github/skills/<name>/SKILL.md
.agents/skills/
```
Skill structure
```markdown
---
name: skill-name
description: When the skill is triggered
---
```
Skill allow bundle of different structures
- e.g. a subfolder `./scripts` containing scripts to run when the skill is triggered
`TEMPLATE.md` - how the AI respond with the information