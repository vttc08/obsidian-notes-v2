# CoreElec on Homatics Box R
https://discourse.coreelec.org/t/guide-homatics-box-r-4k-plus-coreelec-installation-configuration-and-modding/28659
CPU: Amlogic S905X4
Relevant DoVi
- need CE-ng 21
https://discourse.coreelec.org/t/ce-ng-dolby-vision-fel-for-dv-licensed-socs-s905x2-s922x-z-s905x4
The image tree to use is `sc2_s905x4_sei_smb_280.dtb`, copy it to the root folder and rename as `img.dtb`
Download [dovi.ko for s905x4]()
- copy it to the root directory
If it doesn't work
- copy it into `/storage/dovi.ko`
DoVi doesn't work on Samsung because it doesn't support it by defualt

CoreELEC is installed in a USB with 2 partitions
- FAT16 partition that consists of boot ~500MB
- EXT partition that needs Linux Reader (on a flash drive) to access ~30GB
	- Consists Kodi backup and configurations
 **Pair Homatics Remote**
 Go to `Settings` -> `CoreELEC` -> `Bluetooth`, on the remote, press and hold Home and Back button


