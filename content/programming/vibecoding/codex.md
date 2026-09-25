Install and update
```bash
npm i -g @openai/codex@latest
```
[Setup bubblewrap](https://developers.openai.com/codex/concepts/sandboxing#prerequisites)

Codex specific workflow
`/memories` - turn on memories, specific information about project tech like preferences, tech stack
- memories are located in `CODEX_HOME/memories`
`/fast` - fast mode, consume 2 to 2.5x more usage
`/statusline` - display on the bottom bar
![](assets/Pasted%20image%2020260518224832.png)
- useful one include, context used, 5h/weekly limit, token usage
- these will be saved in `config.toml`
Ctrl-T - open transcript

```bash
codex --yolo
```
- no sandbox, no ask for permission

Codex store it's information in `~/.codex` and support multiple profiles via `CODEX_HOME` variable
- default configuration file is in `~/.codex/config.toml`

Instructions
Run this command to verify setup
```bash
codex --model gpt-5.4-mini --ask-for-approval never "Show which instruction files are active."
```

Useful [workflows](https://developers.openai.com/codex/workflows)
- add steps to reproduce and constraints (if it's a bug)
- break task into small steps
- have a clear definition of done

Agents: https://developers.openai.com/codex/subagents
- `.codex/agents/agent.toml`
- may require `[mcp_servers.server_name]`
- inherit same permission as workspace (e.g. YOLO)
- require name, description, developer_instructions
If a `model` and `model_reasoning_effort` is provided and the model is unavailable 
- leave it blank for the current model

Skills https://developers.openai.com/codex/skills
- `.agents/skills/<name>`
- `~/.agents/skills`
When using the `$skill-installer`, it installs system-wide

MCP: https://developers.openai.com/codex/mcp
- `.codex/config.toml`
- may need to be ignored by Git if it contain tokens
- custom configuration compared to `.mcp.json`

Use codex non-interactively
```bash
codex -a never exec --model gpt-5.4-mini "prompt"
```


Editor, Codex can use external editors such as vim for editing prompts and brings it back to the compose
```bash
VISUAL=vim codex
```
- or add it into `.bashrc`

Notification [Hooks](https://developers.openai.com/codex/config-advanced#hooks)
https://developers.openai.com/codex/hooks
Located in `CODEX_HOME/hooks.json` or `config.toml`
Example
```toml
[[hooks.PostToolUse.hooks]]
type = "command"
command = '/usr/bin/python3 "$(git rev-parse --show-toplevel)/.codex/hooks/post_tool_use_review.py"'
timeout = 30
statusMessage = "Reviewing Bash output"
```

For permission request hook this is not possible. Look into tmux bell hooks [project-setup](project-setup.md)

Codex now use remote-control for access on mobile
```bash
[Unit]
Description=Codex remote control bridge
After=network-online.target

[Service]
Type=simple
WorkingDirectory=/home/kevin
ExecStart=/home/kevin/.nvm/versions/node/v24.14.0/bin/codex remote-control
Restart=always
RestartSec=5
StandardOutput=append:/home/kevin/.codex/remote-control.log
StandardError=append:/home/kevin/.codex/remote-control.log

[Install]
WantedBy=default.target
```
- use this systemd service to keep it running
- use `which codex` to get the fullpath of Codex
- replace `~` with the user of the system

