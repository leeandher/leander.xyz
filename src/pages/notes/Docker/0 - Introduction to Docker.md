# 0 - Introduction to Docker

## What is Docker?

Based on _Docker_'s definition, they are the "**World's Leading Software Container Platform!**"

Cool.

## What is a Container?

Based on _Docker_'s definition, a container is "**a way to package software in a format that can run isolated on a shared operating system**".

Some lower-level explanations include:

- an abstraction of interface between OS and processes
- Replica of run-time environment but restricted/limited
- A liason between the host OS kernal and artificially isolated processes

You can think of Docker like a self contained unit in which to isolate your processes. This can be useful for many aspects of development, lets take a look.

## Why Docker?

### Environment Disparity

Most software travels between different environments in the Software Development Lifecycle (SDL), and has a tendency to break along the way. The _testing_ environment is different from _staging_, and _development_ and _production_ and so on and so forth, which makes it hard to ensure **parity** between operations on each system.

Running code in a container ensures that the run-time environment is the same regardless of the machine, including dependencies and possible external influences. It even has the obvious benefit of sameness between running on _development_ and _production_.

## Not a Virtual Machine (VM)

### Resource Efficacy

It may kinda sound like a virtual machine at this point, but it's way different. A virtual machine has the entire operating system running alongside the single packaged software, which increases disk space into the gigabytes, even if your software and its dependencies are much smaller. It also increases the boot time, and memory consumption because OS's are likely more intense than your software. Specifically, the **_kernel_**, being contained each time is the most intensive part of running VMs.

The _kernel_ is the central component of most operating systems, bridging the gap between applications and the actual data processing done at the hardware level. It is pretty much the interface between hardware and software components.

A docker container has a host OS on the machine, and instead, your container isolate your software to only use the part it requires, essentially, sharing the OS. The isolation reduces your disk usage by simply cutting out the need for an OS kernel per enviroment, saving you on memory, boot time, and ease!

### Adapting to Scale

Since you don't have an OS kernel tied to your application, the ease of scale is definitely better than a VM. If your instances are under load for any reason, all you would need to do is _expand sideways_, spinning up more containers to run your software, which could definitely share the same OS and disk. This ability to scale is also much much faster, due to the previously mentionned resource bonuses.

### Better Modularity

Due to the ease of spinning containers up and down, you can easily split up your application based on the seperate processes to fit best practice. Keeping all of your ducks in a line will make it easier to debug and scale, since you won't have to worry about affecting any of the other containers.

For example, if you had **Redis**, **Node.js**, and **Postgres** process all running all at once for your application, you would want to run them on the same VM to save on resource consumption since each would require their own OS kernel otherwise. Now it can get messy, since they're all tangled and can break one another.

Instead, Docker recommends running them in _seperate_ containers, that way, you know what breaks and when, how it affected the other containers (if at all), and shared OS/resources between the operations! **_All three processes can run side-by-side, instead of on top of each other!_**

### It Just Works

It makes it easier to get started working with someone else's projects since none of the tools or dependecies or versioning errors come along for the ride when you decide to tinker with code you haven't authored.

Docker by no means invented the concept of containerized code, but is just a helpful tool with a widespread ecosystem of resources to reduce the overhead from creating and maintaining these containers.
