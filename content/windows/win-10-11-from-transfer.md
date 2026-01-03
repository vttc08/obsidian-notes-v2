**Scenario:** creating a new user account on existing computer
```powershell
net user $user /add /active:yes
net localgroup administrators $user /add
```
- to add a password use `/password`

[Change Name of User Profile Folder in Windows 10 | Tutorials (tenforums.com)](https://www.tenforums.com/tutorials/89060-change-name-user-profile-folder-windows-10-a.html)
**Scenario:** when you're using someone else's computer/account but you want the user profile folder to be the same on every machine you use.

Create an administrator account in windows.
```bash
net user Administrator /active:yes
```
Logout and login to that account.
type this command to get the list of users and their SIDs:
```bash
wmic useraccount get name,SID
```
- the SID is the account number we need
```
Name                SID
hubcc               S-1-5-21-509234439-2838740300-499721457-1001
Visitor             S-1-5-21-509234439-2838740300-499721457-1002
```

Open regedit and navigate to:
```
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList\
```

Find the **SID** key (eg. `S...-1002`), double click/tap on the **ProfileImagePath** edit the value to the new path.  

[**Create a symbolic link**](https://www.tenforums.com/tutorials/131182-create-soft-hard-symbolic-links-windows.html#option1)  

This step is **required** to create a shortcut folder with the old user profile folder name as a safety measure to link the old user profile folder name to the new user profile folder name. This way if something still references the old user profile folder name it will be automatically redirected to the new user profile folder name to prevent getting a "cannot find" type error.

`mklink /d "*old location" "new location"`
