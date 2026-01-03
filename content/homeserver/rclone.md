## Installation
https://rclone.org/downloads/
```bash
curl https://rclone.org/install.sh | sudo bash
```
### Configuration Location
By default, rclone stores its configuration in `~/.config/rclone/rclone.conf`, simply copying this file will transfer your configuration to another system.
To check the configuration file location, you can run:
```bash
rclone config file
```
## Usage
1. Run the configuration command:
    ```bash
    rclone config
    ```
2. Choose `n` for a new remote.
3. Enter a name (e.g., `gdrive`).
4. Select `google drive` as the storage type.
5. Follow the prompts to authenticate with your Google account.
6. When finished, list your remotes:
    ```bash
    rclone listremotes
    ```

To list files in your Google Drive:
```bash
rclone ls gdrive:
```

To sync a local folder to Google Drive:
```bash
rclone sync /path/to/local/folder gdrive:/destination-folder
```

## Mounting rclone as a Local Drive

You can mount a remote as a local filesystem using `rclone mount`. This requires [FUSE](https://rclone.org/commands/rclone_mount/#requirements).

Example command:
```bash
rclone mount gdrive: /mnt/gdrive
```
- Replace `gdrive:` with your remote name.
- Replace `/mnt/gdrive` with your desired mount point.

To unmount:
- On Linux/macOS:
    ```bash
    fusermount -u /mnt/gdrive
    ```

For background mounting, add `--daemon` (Linux/macOS):
```bash
rclone mount gdrive: /mnt/gdrive --daemon
```
See [rclone mount documentation](https://rclone.org/commands/rclone_mount/) for advanced options.