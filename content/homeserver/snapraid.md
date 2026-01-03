### [MergerFS](https://github.com/trapexit/mergerfs)
```shell
sudo apt install fuse mergerfs
```
Create a mountpoint for all the disks.
```shell
mkdir /mnt/disk{1,2,3} # this command will create 3 directory
mkdir /mnt/pool /mnt/parity
```
- edit the disks in `/etc/fstab`
- the disks must have a partition created eg.`/dev/sda1` for the mount
Add mergerfs into `/etc/fstab`
```shell
/mnt/disk* /mnt/storage fuse.mergerfs defaults,cache.files=off,allow_other,category.create=mfs,minfreespace=250G,fsname=mergerfs 0 0
```

Relative path: path in mergerfs pool relative to the path of individual drive and pool
Path preservation: policies that only consider branches (path of individual disks) where the relative path being accessed already exists
- eg. with 3 disks, `/mnt/{a,b,c}`, if a folder `movies` exists in only `a,b` not not `c`, a path preservation policy will only consider `a,b` when a request to create a file `/mnt/pool/movies/file.mkv` and the file would not be created in `c`
- eg. for `epmfs`, the previous example would choose `a,b` and see which drive has most free space and only put files on these drives, even if `c` has more free space; while `mfs` ignore existing path and would create `movies/file.mkv` on `c` if that has the most free space

**MergerFS Options**
- `/mnt/disk*` the disks to be added into mergerfs, assuming the disks are disk1,2,3,4,5
- `/mnt/pool` where the pooled disks are
- `fuse.mergerfs` use mergerfs for this mount
- `defaults`
	- `action=epall` actions such as rename, change metadata (chmod/own) will apply to all found
	- `create=epmfs` files will be created on disks with most free space and preserve path
	- `search=ff` search will act on the first found
- `category.create` the policy 
- `cache.file=off` disable page cache in mergerfs, other options include `partial`, which could be useful for sqlite apps and rtorrent
- `allow_other` is explicitly needed when some of the drives that needs to be pooled are NTFS
- `fsname=mergerfs` shows a friendly name in `df -h` command

###  [SnapRAID](https://www.snapraid.it/manual)
Use Docker to build SnapRAID
https://github.com/ironicbadger/docker-snapraid
- run the `build.sh` and install the package with `sudo dpkg -i *.deb`
SnapRAID is configured via `/etc/snapraid.conf`
```
parity /mnt/parity/snapraid.parity # location of the parity
content /srv/snapraid/snapraid.content # content file
disk d1 /mnt/data # data disk, d1 is the disk name used in snapraid
```
- `content` file contains details of all the files in the array
Example configuration file with exclusions
https://gist.github.com/IronicBadger/ce960d96015b28a03373

`snapraid status` will get the status of array, whether there are corruptions

#### Diff
`snapraid diff` list all the files that are modified from the last sync, it is recommended to run before syncing to check for deleted files
- if a sync is required, it will require `2` as exit code
#### Sync
`snapraid sync` will sync the data and create parity (also compute hashes)
- it's best to use it in a screen/tmux session
- if the SnapRAID sync is abruptly stopped, the next session will start where it's left off
- `-E` will force empty, and sync will proceed even if a data disk is empty
#### Scrub
`snapraid scrub` check the data and parity for errors, it is only read intensive
```shell
snapraid -p 5 -o 20 scrub
```
- `-p` set the % of array to scrub
- `-p bad` will only scrub the bad parts of the array
- `-o` older than, any data older than x days will be scrubbed
#### Fix
`snapraid fix` restore or undeleted files from accident or disk failure
```sh
snapraid fix -f FILE or DIR/ or -m
```
- for directory add `/` to the end
- `-m` option will fix every deleted files
- `-d` will act on entire disk (eg. for recovering), the disk name eg. `d1` is given in the configuration file, it will also fix parity
- `-e` will fix errors in the [scrub](snapraid.md#Scrub) command
Fixing delete files on Radarr behaving and upgrade
```bash
snapraid fix -f /Movies/Name/file.srt
```
- must provide it as absolute path `/Movies` but without disk number `d1`
- the file path and name can be found by `snapraid diff | grep`
#### Check
`snapraid check` verify all files and parity data
- `-a` is audit only, only the file data is checked and parity data is ignored

#### Disaster Recovery
Edit the configuration so that is points to the new disks

```conf
data d2 /mnt/new_location
```
```shell
snapraid -d d2 -l fix.log fix
```
- files that cannot be recovered will have `.unrecoverable` file extension
```shell
snapraid -d d2 -a check
```
- this will only check the data disk that is specified
Lastly run a `snapraid sync`.

#### Automating SnapRAID
https://github.com/Chronial/snapraid-runner
https://github.com/fightforlife/snapraid-runner with apprise support
- `which snapraid` to get the binary file of snapraid, which might be needed for configure the runner
- the python script will run SnapRAID diff command, and only run sync if the deleted is below threshold, optionally can be used to periodically scrub the array
By default the cron scripts are located in `~/scripts`
```bash
cd ~/scripts
git clone https://github.com/fightforlife/snapraid-runner
cd snapraid-runner
mv snapraid-runner.py runner.py
mv snapraid-runner.conf.example snapraid-runner.conf
```
Configuration
```diff
+++ executable = /usr/local/bin/snapraid
+++ config = /etc/snapraid.conf
+++ file = sr.log
+++ url = apprise://
```
- use `which snapraid` to find executable location, use the default location
- it will store as `sr.log` instead
Crontab (every 2 days) - require `uv` installed and initialized. To install uv  
```python
uv init
uv add apprise
uv sync
```

```bash
5 2 */2 * * SHELL=/bin/bash cd /home/karis/scripts/snapraid-runner && /home/karis/.local/bin/uv run runner.py
```

