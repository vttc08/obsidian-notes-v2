Tabby
```bash
export PS1="$PS1\[\e]1337;CurrentDir="'$(pwd)\a\]'
```

Vim
The colorscheme `habamax` requires additional a new version of Vim. Install on Ubuntu
```bash
sudo add-apt-repository ppa:jonathonf/vim
sudo update
sudo apt install vim -y
```
- change tab to width of 2, autoindent, mouse mode etc
- saved in `~/.vimrc`
- the file will be compatible with both Linux and Windows
In Windows Terminal specifically, Ctrl-V must be unbound
`keybindings`
```json
{"id": "unbound", "keys": "ctrl+v"},
```
Additional configuration needed in powershell for Windows paste to work
```bash
set pastetoggle=<F2>
```
For transparent effect, but cursor cannot be transparent
```bash
autocmd vimenter * hi Normal guibg=NONE ctermbg=NONE
```
- but it's not possible to make the cursor transparent
Windows powershell specific keybinding
```bash
nnoremap <M-Up> :m .-2<CR>==
xnoremap <M-Up> :m '<-2<CR>gv=gv
nnoremap <M-Down> :m .+1<CR>==
xnoremap <M-Down> :m '>+1<CR>gv=gv
```
Undofile
```bash
set undofile
set undodir=~/.vim/undo//
```
Copy from remote clipboard
```bash
" Copy via osc52
source ~/.vim/bundle/vim-osc52/plugin/osc52.vim
vmap <C-c> y:call SendViaOSC52(getreg('"'))<cr>
```
- need to clone from repo plugin
```bash
git clone https://github.com/fcpg/vim-osc52 ~/.vim/bundle/vim-osc52
```
On windows natively
```bash
set clipboard=unnamedplus
```
- select a line, click `"+y`
On WSL
```bash
if system('uname -r') =~ "Microsoft"
  augroup Yank
    autocmd!
    autocmd TextYankPost * :call system('/mnt/c/windows/system32/clip.exe ',@")
  augroup END
endif
```
- use `y` is enough
ZSH
Install using package manager
Plugin manager
- zinit
Prompt
- oh my posh


Configuration
both `.bashrc` and `.zshrc` points to `.bash_aliases` which consists of common config and variable that works for both

.zshrc
- alias `.` to source

bash_aliases
- PUID/PGID
- ll, grep and other color command
- docker related commands
- c.. command
Consists of color consistency based on hostname
- set `_OMP_COLOR` and `TMUX_SESSION_FG`


OMP
Install
```bash
sudo apt install unzip -y
curl -s https://ohmyposh.dev/install.sh | bash -s
mkdir -p ~/.config/ohmyposh
```
Place this 
```bash
eval "$(oh-my-posh init zsh --config ~/.config/ohmyposh/omp.toml)"
```
Export configuration
```bash
oh-my-posh config export --format yaml --output ~/.config/ohmyposh/omp.yaml
```
Configuration require manually specifying the file
- the folder must exist before the export

Zoxide
```bash
curl -sSfL https://raw.githubusercontent.com/ajeetdsouza/zoxide/main/install.sh | sh
```
```bash
eval "$(zoxide init bash)"
```
- DO NOT alias z to zoxide, as z it's a function
Everything must be edited manually
Rebind cd to z and bind z to it as well
```bash
eval "$(zoxide init --cmd cd bash)"
alias z="cd"
```

Netdevice
```bash
sudo iftop -i $(ip --color=never -o r get 8.8.8.8 | awk '{print $5}')
```

Tmux
By default, Tmux v3.5 will have error when used with Windows terminal, as it sends random data when it tries to start itself, earlier versions or latest 3.6a do not have such issues.
This could fix it but it will make Vim feel slower
```bash
set -g escape-time 500
set -g focus-events off
```
The better alternative is to use a [portable tmux build](https://github.com/mjakob-gh/build-static-tmux/releases/tag/v3.6a) that work across Linux distros.
- or use [3.3a](https://github.com/mjakob-gh/build-static-tmux/releases/download/v3.3a/tmux.linux-amd64.gz)
```bash
wget https://github.com/mjakob-gh/build-static-tmux/releases/download/v3.6a/tmux.linux-amd64.gz
gzip -d tmux.linux-amd64.gz
chmod +x tmux.linux-amd64
tmux=$(which tmux); sudo cp tmux.linux-amd64 ${tmux:-/usr/local/bin/tmux}
rm tmux.linux-amd64.gz
```

For compatibility of tmux and vim on server
```bash
set ttymouse=xterm2
```
```bash
set -g allow-passthrough on
```
- allow responsive mouse movement and passthrough osc52 from vim to tmux to system
 SSH auto attach tmux
 ```bash
if [[ -n "$SSH_CONNECTION" && -z "$TMUX" && $- == *i* && -z $NOTMUX ]]; then
	tmux attach -t main || tmux new -s main
fi
 ```

Nano

Chezmoi
not available in apt, need manual install
```bash
sh -c "$(curl -fsLS get.chezmoi.io)"
```
- must restart shell
Add/re-add
```bash
chezmoi add .bashrc
chezmoi re-add .bashrc # edit locally and add again
```
- recommended to run `chezmoi diff`
- `re-add` doesn't work with templates, that has to be done manually

Encryption
```bash
chezmoi age-keygen --output=$HOME/key.txt
```

Edit the `.config/chezmoi/chezmoi.toml` with the file and public key
```toml
encryption = "age"
[age]
    identity = "~/key.txt"
    recipient = "age193wd0hfuhtjfsunlq3c83s8m93pde442dkcn7lmj3lspeekm9g7stwutrl"
```
- make sure to also add the file as `.chezmoi.toml.tmpl` into `~/.local/share/chezmoi`
https://www.chezmoi.io/user-guide/frequently-asked-questions/encryption/#how-do-i-configure-chezmoi-to-encrypt-files-but-only-request-a-passphrase-the-first-time-chezmoi-init-is-run
After following the steps, the files can be pushed to Github
When adding the secret file again, there's no need to use `--encrypt` flag, just `re-add`

On another computer
```bash
sh -c "$(curl -fsLS get.chezmoi.io)" -- init --apply --ssh $GITHUB_USERNAME
```
This would require restarting the shell and run
```bash
chezmoi init --apply --ssh vttc08
```
- the `init --apply` will prompt for password, if entered incorrectly, the command need to be run again before `chezmoi apply`
On update
```bash
chezmoi update
```
More careful
```bash
chezmoi git pull -- --autostash --rebase && chezmoi diff
```

Templating and install packages
Evaluate template variables and content for debugging
```bash
chezmoi execute-tempate < shellscript.sh
```

Use `.chezmoiignore` to manage differences between Windows and Linux