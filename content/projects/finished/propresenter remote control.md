The ssh command to forward port 50001 to remote VPS on its port 5001
```shell
ssh -R 5001:172.24.97.135:50001 -i .\Documents\ssh\openssh_keys\oracle-arm-1.key ubuntu@montrealqc.duckdns.org
```
- the address must be the IPv4 of the computer running ProPresenter

#### Features to Implement
- [x] Next and Previous button 
- [x] Get a list of macros by name and a button to trigger the macro
- [x] get the image of current slide
- [x] livestream button
- [x] livestream settings validator
- [x] get the image of slides 2 before and after
- [x] tailscale support
- [ ] authelia for public access
- not possible for image support, unless if the image content is decoded on server side