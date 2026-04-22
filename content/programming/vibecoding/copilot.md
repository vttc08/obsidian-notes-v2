# Github Copilot

## CLI
For Linux, install NodeJS 22 first with NVM
```bash
npm install -g @github/copilot
```
Auto-approve on my default
```bash
copilot --yolo
```
`/models` to select a model
`/init` initialize the repository for Copilot

Modes (use `shift+tab` to switch)
```
extra-keys = [['ESC','|','/','-','HOME','UP','END'],['TAB','CTRL','ALT','LEFT','DOWN','RIGHT','SHIFT']]
```
- this may be needed for Termux
- add this to `~/.termux/termux.properties`
Use text/voice input in Termux https://www.reddit.com/r/termux/comments/f1kwof/enable_keyboard_auto_correct_in_termux/

To enter another line use `Ctrl-J` as the default `Shift-Enter` doesn't work

Ask/Execute (default) - simply ask prompt
Plan - Copilot will come up with an implementation plan
Autopilot - similar to agent, copilot will do everything until it thinks it's complete

Agent (prompt file with instructions)
For detailed [project-setup](project-setup.md) regarding agents
`/agent`  - select a agent

Context
`/context` - check the current context window and how full is it
`/clear` - clear the context and start new
`/compact` - condense the context

### Usage
Each chat to the model consume a premium request
- including the chat in github.com or code analysis
Check usage https://github.com/settings/billing/premium_requests_usage
