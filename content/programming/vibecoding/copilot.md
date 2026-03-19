# Github Copilot
Interacting with the chat
- select specific lines
- select entire file

Slash commands
`#codebase` - search the entire codebase
`/tests` - generate unit test for selected code

Select code block and copilot can review the code
## CLI
For Linux, install NodeJS 22 first with NVM
```bash
npm install -g @github/copilot
```
- and `copilot` will be 
Auto-approve on my default
```bash
copilot --yolo
```
`/models` to select a model
`/init`

Modes (use `shift+tab` to switch)
```
extra-keys = [['ESC','|','/','-','HOME','UP','END'],['TAB','CTRL','ALT','LEFT','DOWN','RIGHT','SHIFT']]
```
- this may be needed for Termux
- add this to `~/.termux/termux.properties`
Use text/voice input in Termux https://www.reddit.com/r/termux/comments/f1kwof/enable_keyboard_auto_correct_in_termux/

Ask/Execute (default) - simply ask prompt
Plan - Copilot will come up with an implementation plan
Autopilot - similar to agent, copilot will do everything until it thinks it's complete

Agent (prompt file with instructions)
For detailed [project-setup](project-setup.md) regarding agents
`/agent`  - select a agent

Skills