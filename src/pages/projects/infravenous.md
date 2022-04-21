---
type: projects
showcase: true
slug: infravenous
title: "Infravenous: MFA Vein Detection"
description: For our Engineering capstone, a couple friends and I put together a
  prototype for a bio-metric vein authentication scheme, in our efforts to
  combine hardware, software and nanotechnology. It was kinda like a Vein-based
  MFA Yubikey, check out the demo video!
image: /assets/project__infravenous.png
repo: https://github.com/leeandher/infravenous
link: https://youtu.be/emK0LczlKes
tech:
  - TensorFlow
  - OpenCV
  - React
  - Python
  - Raspberry Pi
  - Express
  - Expo
date: 2021-04-14T07:57:56.912Z
---
Infravenous aims to address the issues currently present in biometric authentication schemes as outlined in Section 1.1, by employing a three-step solution.

1. A secure, standalone finger-vein scanner used for authentication
2. A cloud application for managing, monitoring, and modifying the device
3. An integration platform for system developers to add Infravenous protection to their digital
   products

The first step of the solution involves the physical hardware. Finger veins can be imaged by providing sufficient infrared light to the finger, with an IR camera there to capture the shadows the veins cast. A user will provide a few test scans to train the device, then any subsequent scan can be used to authenticate them, as the device will look for the matching pattern and provide a confidence score on whether the user is who they say they are. Once the scan attempt has been
analyzed, the result will be sent along to the second stage of the solution.

This portion of the process occurs in the cloud application authored by the Infravenous team. Here, a web server receives the information packet from the device about the scan. This includes all the relevant data, such as who is the user being scanned, the result of their scan (success/failure), how confident the device is with that conclusion, where the scan occurred and at what time it was performed. This information is saved to a database with all the other scan information from that user.

The final step of the process is done by a third-party integrator, using the Infravenous platform. As seen in the previous steps, the attempt data is saved against the user’s profile. Now, a third- party app, for example, RBC bank, will add Infravenous to the log-in flow for users who have purchased an Infravenous device. When signing into the RBC device (regardless of the platform), they will be prompted to scan their finger in their Infravenous device. Since the scan result
automatically saves to the user’s Infravenous profile, the RBC app can ask whether or not our web server has seen a successful scan recently. Depending on the result, the RBC app can then grant the user access to the rest of the application.

By using the three simple stages as described above, Infravenous can boost the security and reliability of many digital accounts and improve existing biometric systems.