https://gist.github.com/vttc08/f1918f290abc9769ec740bb9e2565cb9
Use this PowerShell script as base template for creating backup scripts.
**Game File Location:** `mediaserver:/mnt/data2/Games/installed/`
**Game Saves Location:** `laptopserver:/mnt/nvme/share/saves/` ``
Ensure a file name `gamesave` exists at `~` or `C:\Users\hubcc\` with the following content
```
laptopserver:/mnt/nvme/share/saves
```

**FitGirl Repack**
Safe to copy all the downloaded folders to server, saves are included.

**Others**
Locate the game save.
Place the `gamesave.ps1` in the executable folder of the game

In case of wanting to replay a game, if it's fitgirl, just run. If not and the game has another save location, it will have a `./saves` folder and `gamesave.ps1` script in the game root folder, execute the script to restore.