## What is Version Control?

### Definition

Version control is a system which records additions, deletions and changes to a file (or set of files) so that they can be referred to later on. This will allow users to revert working files to previous versions or even check out a complete older version of an existing project. Having access to a complete change history allows for complete traceability in case something goes wrong, and an old version must be restored, compared or referred to.

### Types of Version Control Systems

- **Local Version Control**

This is the most common type of version control for most people. If they have a project they're working on (code-related or not), just making another directory to store all the related files is a very simple solution. While it's organized, it is also very error prone by deleting or copying over necessary files.

- **Centralized Version Control**

Centralized Version Control is largely used when collaborating with a team (especially for programming). Since team members may require access to shared data/files, using a centralized source server to contain and checkout all the working files is definitely viable. It may even allow for supervision of exactly which files/projects other team members are working on; however, the obvious risk is that entire project bases can easily be lost through server failure, weak security or physical damage.

- **Distributed Version Control**

Distributed Version Control is considered the safest, and most dependable form of version control, especially when collaborating with a team. Every member of the team 'clones' or 'copies' the entire codebase and its full history, to makes changes locally or even offline. While convenient, this also lets each contributor serve as a reliable backup without any single location to depend on. Each user has their own control details as well, allowing changes to be tracked and conflicts to be reviewed before pushing any code into production, also known as 'branching' and 'merging'.

### Why Git?

Git is one of the most common distributed version control system. It is quick, lightweight, and provides great functionality for both sharing, and backing up code securely. With the popularity of services such as GitLab, BitBucket, and GitHub, Git has emerged as the go to DVC software used by successful software companies around the world. After installing Git from https://git-msc.com, it is accessed and used using its CLI (Git Bash or Git CMD). Learning the Git CLI commands is the main barrier to entry in learning Git, but by reviewing these notes, basic functionality will come with ease.
