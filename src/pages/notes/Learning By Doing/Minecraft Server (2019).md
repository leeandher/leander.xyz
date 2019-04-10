# Creating a Minecraft Server (March 2019)

To whoever is reading this, trying to spin up a Minecraft server in 2019 without paying for _Minecraft Realms_, I respect that. My girlfriend recently saw some GIFs or something and wants to start up a server for us to play together, plus I think this could be a fun Saturday experiment. I'm going to talk a little bit about my process in getting this up and running. I'm definitely not used to SSH-ing into Linux servers but we'll give it a shot.

Note: This tutorial is not very verbose and has some strict limitations along with it. It's really only useful if the following are true:

- Small server size (~2-10 people)
- Private (host knows/trusts all players)
- Minecraft for Java (Incompatible with Minecraft PE and Minecraft Windows 10)
- Fast internet (the host has a speedy connection)
- Old Laptop (or a strong laptop that can play/run the server concurrently)

## Step 1: Hosting

While there are plenty of hosting options out there, I'm a pretty cheap guy, so I'll give you my break down of the options. Full Disclosure: I don't know too much about this stuff, AND have no idea what kind of services are offered on MS Azure. So here's my breakdown.

### DigitalOcean

For hosting a persistent Minecraft server, this is probably the best choice. By persistent, I mean without any downtime. You and your friends can login whenever you feel like and the server will always running, ready for you join. DigitalOcean is known for its relative ease of use, and cheap prices, so spinning one up in the cloud to run 24/7 is a great, cost-effective choice.

Note: Droplets on DigitalOcean have no ROM, and therefore, if your service shuts down, you'll lose your server's data. There's definitely a way to copy the data to your local machine before that happens, but that's just another thing to keep in mind.

### Amazon Web Services

Now we're getting into the nitty gritty. AWS is verbose and hosting/using any servers on their platforms is not very easy to get started with. You'll be reading the docs for a few hours before you really feel comfortable getting started, especially considering how easy it is to rack up large bills if you don't know what you're doing. Personally, I would say to choose AWS if you want a non-persistent, secure, cheap server and you're willing to put the time into it. That means having an EC2 instance in the cloud that you can SSH into and spin up your server before you play, and shut it down when you're done. Honestly, it might even be cheaper than DigitalOcean in some cases when running full time, but that's up to you.

Note: Similar to before, but with a server that isn't persistent, it's very easy for you to lose all your data since EC2 instances have no ROM to store anything. That means you'll have to ALSO have an S3 bucket to persist data between your gaming sessions, which is a whole other thing to set up. If you ever ditch the server, at least that bucket will have its contents saved, but that'll cost ya! Probably not hard for an expert, but definitely a challenge for me to get started with, that's why I chose the cheapest alternative.

### Host Machine

If you don't plan on having too many people playing at once, and you know/trust them all, it might be a good idea to dust off that old laptop that sits in the corner of your room. Paying for secure anonymous server space is great, but so is not having to pay \$5.00 a month to play a game you already have with a bunch of friends. You can even run the server on the same machine you'll be using to play, but running any machine 24/7 will affect it's lifespan and future performance, so for full-time servers I recommend using separate hardware.

So going forward in this doc, I'm going to help along with how you can set up a separate machine to boot up a public minecraft server to be accessed over the internet (or LAN if that's your thing.)

Note: This is definitely the most insecure option of the three, since you're exposing your local network, and host IP to the public. It's not recommended for public Minecraft servers, but since it's just me and a couple of friends, this is the option I'm going to go with.

## Step 2: Download Java

First thing's first, you need the latest version of Java, which you can find [over here](https://java.com/en/download/). Simply download and install. Once the dialog pops up confirming your installation, you should be good to go to the next step!

## Step 3: Download the Server

Minecraft has a server file that you will be using on the host machine to spin up the server. You can download the latest one from the official page [over here](https://minecraft.net/en-us/download/server/).

## Step 4: Setup the Machine

You can keep your server files where ever you want, but I personally just opted for `C:\Users\name\Desktop\MC Server\`. Wherever you decide, place your `server.jar` file you just downloaded into that directory and open it up in your terminal of choice.

Now before we run it, take a look at the following command:

```bash
java -Xmx1024M -Xms1024M -jar server.jar nogui
```

In this, were telling Java to sorta _unzip_ the file without a [GUI](https://en.wikipedia.org/wiki/Graphical_user_interface) (`nogui`), allocating initial pool of **1024 Mbs** of memory (`-Xms`) and to use no more than **1024** Mbs (`-Xmx`). Since I don't know what kind of old computer you have, you can change those allocations as you want.

First, make sure your installation of Java went smoothly by running the following command:

```bash
java -version
```

It should give a printout similar to this:

```
java version "1.8.0_201"
Java(TM) SE Runtime Environment (build 1.8.0_201-b09)
Java HotSpot(TM) Client VM (build 25.201-b09, mixed mode, sharing)
```

If not, try uninstalling and reinstalling Java, or opening a new terminal instance.
If so, you're good to go! You can now run the first command:

```bash
java -Xmx$MAX_RAM -Xms$MIN_RAM -jar server.jar nogui
```

You'll get a printout looking sorta like this:

```
[13:32:14] [main/WARN]: Ambiguity between arguments [teleport, destination] and [teleport, targets] with inputs: [Player, 0123, @e, dd12be42-52a9-4a91-a8a1-11c01849e498]
[13:32:14] [main/WARN]: Ambiguity between arguments [teleport, location] and [teleport, destination] with inputs: [0.1 -0.5 .9, 0 0 0]
[13:32:14] [main/WARN]: Ambiguity between arguments [teleport, location] and [teleport, targets] with inputs: [0.1 -0.5 .9, 0 0 0]
[13:32:14] [main/WARN]: Ambiguity between arguments [teleport, targets] and [teleport, destination] with inputs: [Player, 0123, dd12be42-52a9-4a91-a8a1-11c01849e498]
[13:32:14] [main/WARN]: Ambiguity between arguments [teleport, targets, location] and [teleport, targets, destination] with inputs: [0.1 -0.5 .9, 0 0 0]
[13:32:14] [main/INFO]: Loaded 0 recipes
[13:32:14] [main/INFO]: Loaded 0 advancements
[13:32:14] [Server thread/INFO]: Starting minecraft server version 1.13.2
[13:32:14] [Server thread/INFO]: Loading properties
[13:32:14] [Server thread/WARN]: server.properties does not exist
[13:32:14] [Server thread/INFO]: Generating new properties file
[13:32:14] [Server thread/WARN]: Failed to load eula.txt
[13:32:14] [Server thread/INFO]: You need to agree to the EULA in order to run the server. Go to eula.txt for more info.
[13:32:14] [Server thread/INFO]: Stopping server
[13:32:14] [Server thread/INFO]: Saving worlds
[13:32:14] [Server Shutdown Thread/INFO]: Stopping server
[13:32:14] [Server Shutdown Thread/INFO]: Saving worlds
```

Now we're good to move on!

## Step 5: EULA

The reason the server stopped was because we hadn't yet signed the End User License Agreement (EULA). If you navigate to your server directory, you'll see a brand new file called `eula.txt` has been created. Open it up to edit in a text editor (but use `vi eula.txt` if you're a cool cat).

It'll look sorta like this:

```
#By changing the setting below to TRUE you are indicating your agreement to our EULA (https://account.mojang.com/documents/minecraft_eula).
#Sat Mar 02 13:32:14 EST 2019
eula=false
```

Then just change false to true, _after you've read the entire EULA cover to cover of course_, and save the file.

## Step 6: Startup and Connecting

Now you can go back and run the start command same as before to bring up your server! You'll also be able to pass in server commands through this console, incase that ever comes up, so checkout [this guide](https://www.h3xed.com/pc-gaming/basic-minecraft-server-commands)! Believe it or not, it's that easy, your server is now up and running! You just have to connect to it and you'll be ready to play. Choose the appropriate connection scenario below and get started!

### Connecting from the Same Computer

If you're connecting on the same computer, all you have to do is boot up Minecraft, and `Direct Connect` to the renowned Home IP Address: `127.0.0.1`. Enjoy!

### Connecting from the Same Network

If you're connecting over the same network (LAN), then open up another terminal window on the host computer and pass in the `ipconfig` command. You should get a printout similar to this:

```
Wireless LAN adapter Wi-Fi:
  ...
  IPv4 Address. . . . . . . . . . . : 192.168.XXX.XXX
  ...
```

The **IPv4 Address** is the one you're going to want to `Direct Connect` to. That should be it, Enjoy!

### Connecting over the Internet

If you need to connect over the internet, then the Host Machine will have to _port forward_ their router, so that connections coming from other computers will be told by the router to connect to that machine. This is not very secure, and is why I stress, _this is for a private server with friends **ONLY**_. Opening up your computer's IP address like this to the world would allow for malicious attacker to connect and hack your computer (password mining, data theft, etc.) I don't really know much about what can happen but I do know it's bad so be cautious!

Before you start with the Port Forwarding, you're also going to want to set up a static IP for the machine hosting the server. Essentially, you're locking down your computer's IP address while connected to this local network. You can checkout [this guide for Windows](https://portforward.com/networking/static-ip-windows-10.htm) for Windows, or [this one for Mac](http://www.macinstruct.com/node/550). If you're on Linux, I trust you can google. In my case, for Windows, I also had to set my DNS resolvers manually, and since you're at it, I recommend switching to [CloudFlare's `1.1.1.1` DNS](https://www.cloudflare.com/learning/dns/what-is-1.1.1.1/)!

Once you've set up your static IP on the host machine, make a note of it, and you can continue to port-forwarding.

Anyway, to port-forward your router, you'll have to connect to the `Default Gateway` IP address to access it's portal. You can find that by running `ipconfig` again in your console.

```
Wireless LAN adapter Wi-Fi:
  ...
  Default Gateway . . . . . . . . . : 192.168.1.1
  ...
```

This is heavily dependent on what type of router you have so instead of over-complicating it, I'll just link to [this guide](https://portforward.com/router.htm) which walks you through Port Forwarding for a bunch of different routers. In our case, since Minecraft Servers are connected on port `25565`, that is the one we're going to want to forward to the host machine.

That should be it! Now to all your friends need to do is connect to the host machine's router's IP address and you're good to go! To find that out, [simply check out this link](http://lmgtfy.com/?q=What+is+my+IP%3F).

---

Hope I could help out, have fun and be nice out there chief 😎😎
