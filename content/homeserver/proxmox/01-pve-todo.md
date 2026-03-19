### Change Repository and Disable Nag
This section details how to switch to the no-subscription repository for Proxmox VE, which is crucial for avoiding enterprise repository nags.

**Automatic Way**
```powershell
curl.exe -4 -fSsL http://mediaserver:8001/cb.sh | ssh laptopserver "sed 's/\r$//' | bash"
```
- use a webserver to host the script and execute it
- problem: when using PowerShell pipe it automatically adds a `\r`
Certificate Warning fix
- Install for both Current User and Local Machine so Firefox can recognize it
```powershell
scp root@pve_host:/etc/pve/pve-root-ca.pem pve.cer
Import-Certificate -FilePath "D:\Partitions\F\Downloads\pve-root-ca.pem.cer" -CertStoreLocation Cert:\LocalMachine\Root
Import-Certificate -FilePath "D:\Partitions\F\Downloads\pve-root-ca.pem.cer" -CertStoreLocation Cert:\CurrentUser\Root
```
### Power Optimization
```bash
sudo powertop --auto-tune
```
AutoASPM.py
- repo https://git.notthebe.ee/notthebee/AutoASPM
- script https://git.notthebe.ee/notthebee/AutoASPM/raw/branch/main/pkgs/autoaspm.py
#### Powersave governor
This optimizes CPU performance based on your needs.
*   **Check Available Governors:**
```bash
cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_available_governors
```
*   **Check Current Governor:**
```bash
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
```
*   **Set to `powersave`:**
```bash
echo "powersave" | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
```
*   **Make Persistent (using `cron`):**
    Add the following line to your crontab (`crontab -e`):
```crontab
@reboot echo "powersave" | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor >/dev/null 2>&1
```
### Configure Local Storage (NTFS Drive)
This section focuses on mounting and utilizing an NTFS drive for storage.
*   **Identify the Drive:**
    *   `lsblk`
    *   `sudo blkid` (to get the UUID)

*   **Edit `/etc/fstab`:**
    Add a line similar to this, replacing `UUID` and `/mnt/your_mount_point` with your actual values:
```
UUID=YOUR_NTFS_DRIVE_UUID /mnt/your_mount_point ntfs-3g defaults,auto,users,rw,nofail 0 0
```
**Note:** `nofail` is important so the system boots even if the drive isn't present.

*   **Create Mount Point:**
    ```bash
    sudo mkdir -p /mnt/your_mount_point
    ```

*   **Mount the Drive:**
    ```bash
    sudo mount -a
    ```

*   **Add to Proxmox Datacenter:**
    In Proxmox's Datacenter view (not Storage view), add a directory pointing to your mounted NTFS drive. This allows Proxmox to use it for VM/LXC storage.
### 6. Jellyfin LXC Transcode
```bash
# On the Proxmox host
mkdir -p /path/to/your/transcode/folder
chmod -R a+rw /path/to/your/transcode/folder

# Then, configure this folder as a mount point within the Jellyfin LXC container
# via the LXC container's config file or Proxmox UI.
```

