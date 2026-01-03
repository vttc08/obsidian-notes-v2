**Miyonst**
https://yewtu.be/watch?v=4qX2zihB6UE
![Pasted%20image%2020230528214101.png](assets/Pasted%20image%2020230528214101.png)
If red light is flashing bright, there is enough power
If flashing dimly, bios chip connected wrong

If using soldered chips
- disconnect everything from the motherboard
- connect 24 and 8pin power to the motherboard
- turn on the power supply but do not turn on the motherboard
red lines up with the dimple

**AsProgrammer**
Under Hardware > CH341a
![[assets/Pasted image 20230528213206.png]]
Click the question mark icon
If the question mark does not show up it could mean flasher not getting enough power, bios chip connected wrong way
![assets/Pasted%20image%2020230528213842.png](assets/Pasted%20image%2020230528213842.png)
Click the green button to make a backup of current bios, the select save file
- good idea to read it again and check for difference
if the read contains FF values, the read is not successful (if the motherboard is working)

![Pasted image 20230528214101](assets/Pasted%20image%2020230528214101.png)
Click the folder icon to open the bios file, then click the button above

Power off the power supply, disconnect CH341a.
Clear the CMOS, remove the battery and short remove CMOS jumper.
Wait for 30 seconds, remove CMOS jumper and connect back


