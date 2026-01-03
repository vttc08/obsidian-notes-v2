# Kodi
![](assets/Pasted%20image%2020240923183400.png)
Go to Settings > Interface > Change Fonts to `Arial Based` (may be needed for Chinese)
Systems -> Addons -> Turn on `Unknown Sources`

**Source:** a location containing files, videos, addons, repository
**Repository:** addon sources containing zip files
- repo can be added via a zip file configured in sources

Windows Location for backup and restore or reset
```
%appdata%/Kodi
```
- kodi also has a Backups addon
Kodi has option for Web Interface to integrate with Home Assistant. 
- Settings -> Services -> Control
- `Enable remote control via HTTP`, change port and `allow control from other systems`
## Jellyfin
https://jellyfin.org/docs/general/clients/kodi
**Kodi Sync Queue**
Plugin that is built into jellyfin.

### Jellyfin Kodi Addon
No options for multiple accounts, but options for profiles
Multi-user is supported via profiles
When using a new profile, plugins are disabled by default, go to Addons and enable individual plugins via right click

**Settings**
Playback -> Enable external subtitle
- under transcode options, set the audio and video codec accordingly

When playing back from Kodi, the changes are reflected in Jellyfin immediately.
However, when playing back from Jellyfin, the change are only synced in Kodi after 10 seconds starting Kodi up.

When metadata is updated from Jellyfin, it will not be reflected in Kodi even after sync. To fix it, go to
- Addons, Jellyfin, Manage Library, Repair database

https://kodi.wiki/view/HOW-TO:Estuary_Modification#Renaming_and_Reordering_Main_Menu_Items

When contents are added into Kodi, everything is combined together.

Settings -> Media -> Video -> Default Action change to `Show information`

The jellyfin addon only provide sync for Movies and TV Shows, other libraries are not added and only accessible via going to addons.
- However, the Home Theater Test library can be added to a shortcut in favourites
