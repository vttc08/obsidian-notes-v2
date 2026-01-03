By default docker puts everything in a `bridge` network, it shows up in interfaces as `docker0`
- containers are able to communicate with each other, but other with IP address, not names
### docker network command
`docker network ls` to check available and type of networks 
- `prune` delete all networks that no containers are using
- `rm` delete a network (if it's not in use), there is no way to force delete
**Connect**
```bash
docker network connect <network_name> <ct_name>
```
- `disconnect` will disconnect the container
**Inspect**
```bash
docker network inspect <container_name> | jq .[].
```
- `Containers` will list all containers attached to the network
- `IPAM` network subnets
- `Name` 
- `Driver` the type of networking ([Bridge](#Bridge%20Networks), [Host](#Host%20Networks), null)
**Create**
```
docker network create <name> -d DRIVER
```
- `-d` specify the driver, default is bridge
Additional Options such as `subnet`, `gateway`, `ip-range` can be used in [IP/MacVLAN](#IP/MacVLAN)

### Bridge Networks
Each bridge network will create a virtual interface that is available in `ip -o -br link`, when a network is removed, the interface will also be removed.
![](assets/Pasted%20image%2020240701223947.png)
##### Default Bridge
- `docker0` is the main interface for the default docker bridge network, it's like a network switch
- for each containers in the default interface, a new virtual interface is created that is bridged to `docker0`, the virtual interface starts with `veth`
- containers can communicated with each other via IP but not names
##### User-Defined Bridge
- these bridges are created by the user and the interface name start with a `br-`
- when there are no containers connected into that network, the br-interface will appear `DOWN` and it will be `UP` once containers connect
- it is separated from host and other networks (unless port mapped), but can communicate within the network via names
```bash
docker network create my-network # will error if network already exists
docker run --name some_container --network my-network image
```

To use custom networking in docker-compose, refer to [docker-compose](docker-compose.md)
##### Advanced Network
By default a bridge network is created with a `/16` CIDR in `172.x.y.y` where x is the number assigned when creating the network and y is any number the container can have
- `--ip` is used to specify a custom IP address of a container 
	- this is only possible with user-defined subnet and gateway
	- `--subnet` and `--gateway`
### Host Networks
Host is also a default network.
```bash
docker run --name some_container --network host image
```
```yaml
network_mode: 'host'
```
- use `--network host` when running it or in compose to run host network
- the IP address of the container will be the same as the host machine
- container will have access to all the host network ports and resources

### IP/MacVLAN
The difference between IPVLAN vs MACVLAN is that 
- **IPVLAN** - the virtual interface gets the **same** MAC address as the host
	- useful in the case where a switch refuse traffic if a port/interface has 2 MAC addresses
- **MACVLAN** - the MAC address will be **different** for each networks and the host
```bash
docker network create -d macvlan/ipvlan \
	--subnet 10.10.120.0/24 \ # the subnet of the server
	--gateway 10.10.120.1 \ # gateway, or IP addr of home router
	-o parent=enp2s0 \ # the physical interface on the computer
```
When creating the container, it is also possible to assign custom IP address, the address has to be outside of DHCP range
```bash
docker run --name name --network macvlan --ip 10.10.120.201 image
```
- in MAC/IPVLAN, if IP address is not specified, Docker will hand out IP address and ignore DHCP of the normal home network
- `ip_range` is used to specify IP addresses, it has to be a CIDR notation (only one CIDR is allowed)
It is also possible to have `802.1q` or `VLAN Trunking` in MacVLAN (Advanced)
#### L2/L3 IPVLAN
- L2 is the default mode for created network
In L2 another options is needed
```bash
-o parent=enp2s0 -o ipvlan_mode=l3
```
- turns the host into a router

### None
Does not have access to any other container or the host or the internet.
`network=none`

