### Config Folder Structure
```toml
root/
  MegaBasterd/
    jar/
      MegaBasterd.jar # main executable file
      .megabasterd8.21/ # version
        megabasterd.db # configuration file
    MegaBasterd.run
```

### jlesage
`cont-init.d` folder consisting of scripts that is executed in order when the container starts
- it will run every time even just restarting (not the same as Docker mods)
- all environment variables will work
The app will start via the script in `startapp.sh`
In the Dockerfile, there is an option to set a file as image.
1. Put the `COPY rootfs/ /` before the install icon part
2. Set the `APP_ICON_URL` to `file:///path/to/png`
3. the file has to be in `.png` format and preferably 64x64 size

### MCASelector
Runs fine in Ubuntu virtual machine with the zulu binary, not possible to run in Alpine.
Zulu binary does not work with Ubuntu docker base image.
- need to install `openjdk-21-jre` package
- download JavaFX for Java 21 and unpack
- run the app with `/usr/bin/java --module-path /jfx/lib`
To make sure no error occur when selecting a folder, make sure a `settings.json` files exists at `/config/xdg/config/mcaselector`
```json
{"locale":"en_GB","regionSelectionColor":"0xff7300cc","chunkSelectionColor":"0xff7300cc","pasteChunksColor":"0x00ff00cc","processThreads":8,"writeThreads":8,"maxLoadedFiles":10,"mcSavesDir":"/world","debug":false,"recentWorlds":{}}
```