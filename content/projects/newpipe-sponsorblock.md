## Tubular
Not updated yet
## LastPipeBender
https://github.com/MaintainTeam/LastPipeBender
In Android Studio
- top left, get from Version Control
![](assets/Pasted%20image%2020250121193614.png)
### Modification
The file to be modified will be located in (at least for PipeBender) `LastPipeBender/app/build.gradle`, change these relevant info
```java
applicationId "org.maintainteam.lastpipebender175"  
resValue "string", "app_name", "Pipe 175"
versionName "0.27.5175"
```
- the value can be almost anything as long as its different between APKs
### Build
Go to hamburger menu > `Build` > `Build Signed App Bundle/APK`
![](assets/Pasted%20image%2020250121203102.png)

Building signed APK require keys, the keys will be located in `~/androidkeys/app.jks`
- password is always 123456
- certificate set to as long as possible
- full name is `pipebender` or `tubular`
![](assets/Pasted%20image%2020250121202249.png)
## Android Phone Settings
## Errors
Gradle sync failed
- update Android Studio to latest version
- sometimes Android Studio or other tools will modify file and cause gradle error, in this case go to that folder and run
```bash
git restore .
```