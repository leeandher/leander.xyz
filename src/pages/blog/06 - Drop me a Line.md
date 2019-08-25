---
type: blog
archive: true
showcase: false
slug: drop-me-a-line
title: Drop me a Line
description: I definitely wouldn't be this far along if I couldn't make mistakes.
image: /assets/blog__default.jpg
tags:
  - project
  - coding
date: '2018-04-16'
---

One more part of this site that I can happily say I've completed! I managed to configure the mailing system to send out emails when a visitor to the site fills out the contact form. It has two preset HTML Email files which take in the form data and send it out to the visitor and myself, both from a no-reply email! After a decent amount of test runs on this email system, the email sent to the visitor has only been sent to a spam folder once, and I assume that's simply because it comes from a unique domain (.xyz). I had to do a lot of reading to get this done because when I was learning PHP I was heavily just considering using the built-in mail function. However, after doing some research, I learned that most of the time the built-in mail function is used, the emails are automatically sorted into Junk/Spam mail. To avoid that I cloned the most commonly used resource for mail within PHP, [PHPMailer](https://github.com/phpmailer/phpmailer)!

After reading the docs, I had to import the code and classes into my PHP and configure the SMTP settings properly to be able to use my server space for outgoing mail. It took a few tries before I was actually able to get it up and running, mainly because they recommend installation with Composer but I didn't want to install that, so I had to manually root the files. After that, I just had to follow along with the examples and their built-in functions, and lo and behold: it worked like a charm! The minute I got that first email, my god, I was so excited that I'd finally gotten it to send properly. I'm still amazed with how easy it was once I understood what was going on.

During this whole debacle I'd been pushing changes to a private repository I have on GitHub but in doing so, I made a massive security issue. When configuring a mailer, you have to input the credentials for your SMTP server and account, but data like that should NOT be put on an open code-sharing platform like GitHub. I feel less serious about this since it was a private repo, but I do want to take the site online and let my entire web root be open for analysis, so I just had to move the data up out of the `public_html`. The only lingering issue is that before I make that repository public, I have to go and find a way to remove the file history for those few commits so that nothing is compromised (even though I will be changing most of the data anyway). This mix up is totally on me, but I definitely wouldn't be this far along if I couldn't make mistakes.
