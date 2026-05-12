# SPICE Resize Auto-Fix (Proxmox VM)

## Overview
This sets up a lightweight background watcher that reapplies display sizing when SPICE/virt-viewer window size changes.

> [!info]
> Use `cat <<'EOF'` blocks to write files directly from terminal instead of manual editors.

## 1) Create Watch Script

Run:

```bash
mkdir -p ~/.local/bin
cat <<'EOF' > ~/.local/bin/spice-resize-watch.sh
#!/usr/bin/env bash
set -u

OUTPUT="Virtual-1"
LAST=""

while sleep 0.7; do
    CUR="$(xrandr | awk '/current/ {print $8"x"$10}')"
    if [ "$CUR" != "$LAST" ]; then
        xrandr --output "$OUTPUT" --auto >/dev/null 2>&1 || xrandr -s 0 >/dev/null 2>&1
        LAST="$(xrandr | awk '/current/ {print $8"x"$10}')"
    fi
done
EOF
chmod +x ~/.local/bin/spice-resize-watch.sh
```

## 2) Create Autostart Entry

Run:

```bash
mkdir -p ~/.config/autostart
cat <<'EOF' > ~/.config/autostart/spice-resize-watch.desktop
[Desktop Entry]
Type=Application
Name=SPICE Resize Watch
Exec=/home/kevin/.local/bin/spice-resize-watch.sh
X-GNOME-Autostart-enabled=true
NoDisplay=false
Hidden=false
EOF
```

## 3) Start Immediately (No Reboot)

```bash
~/.local/bin/spice-resize-watch.sh &
```

Resize the `virt-viewer` window and verify resolution follows.

## 4) Persist on Login

Log out, then log back in once. The watcher should auto-start each session.

## 5) Stop or Disable

Stop current process:

```bash
pkill -f spice-resize-watch.sh
```

Disable autostart permanently:

```bash
rm ~/.config/autostart/spice-resize-watch.desktop
```

## 6) Optional CPU Tuning

To reduce wakeups, increase poll interval in the script:

From:

```bash
while sleep 0.7; do
```

To:

```bash
while sleep 1; do
```

Tradeoff: lower CPU wakeups, slightly slower resize response.