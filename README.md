# LEAME
This repository is for basic commands and procedures

# MONTH . DAY . YEAR
## 12.11.2022

1. Created new repository using web. Accounts nelsonlopezjimenez and nelsondio
1. Edited this README file
1. Checked the security keys
1. PURPOSE: edit the files remotely
1. PENDING: How to architecture
1. Class materials: week by week
1. Basic commands: the very basic here with links to files with the extended versions

## Github Instruction to add private key
1. $ ssh-keygen -t ed25519 -C "your_email@example.com"
1. start the ssh-agent in the background
1. $ eval "$(ssh-agent -s)"
1. > Agent pid 59566
1. $ ssh-add ~/.ssh/id_ed25519
1. output:$ ssh-add ~/.ssh/github_ed25519_gammastudent_table_counter
1. Identity added: /c/Users/gammastudent/.ssh/github_ed25519_gammastudent_table_counter 

## GPG syntax 
1. gpg --symmetric --cipher-algo TWOFISH --armor (or not) passwords
1. gpg --decrypt passwords.gpg or passwords.asc
1. in android  used OpenKeychain

## Github Instructions when rep is newly created on the web and first still sit in the computer
1. git remote add origin get@github.com:xxxx/repname
2. git branch -M main
3. git push origin main
4. 

## Git LSF https://docs.github.com/en/repositories/working-with-files/managing-large-files
```
git push origin main
Enumerating objects: 72, done.
Counting objects: 100% (72/72), done.
Delta compression using up to 4 threads
Compressing objects: 100% (45/45), done.
Writing objects: 100% (55/55), 31.53 MiB | 721.00 KiB/s, done.
Total 55 (delta 7), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (7/7), completed with 4 local objects.
remote: warning: See http://git.io/iEPt8g for more information.
remotne: warning: File https-ftp-trace.ncbi.nlm.nih.gov/1000genomes/ftp/sequence.index.txt is 63.96 MB; this is larger than GitHub's recommended maximum file 
size of 50.00 MB
remote: warning: File https-ftp-trace.ncbi.nlm.nih.gov/1000genomes/ftp/current.tree.txt is 74.39 MB; this is larger than GitHub's recommended maximum file size of 50.00 MB
remote: warning: GH001: Large files detected. You may want to try Git Large File Storage - https://git-lfs.github.com.
To github.com:nelsonlopezjimenez/LEAME.git
   c55d3b7..8508b44  main -> main

```
1. Download executable from https://git-lfs.com/
1. In gitbash run "git lfs install" only once per user.
1. git lfs track "*.psd"
1. git add .gitattributes
1. Note that defining the file types Git LFS should track will not, by itself, convert any pre-existing files to Git LFS, such as files on other branches or in your prior commit history. To do that, use the git lfs migrate(1) command, which has a range of options designed to suit various potential use cases.

1. On 03.14.2023
1. urchasing additional storage and bandwidth
Additional storage and bandwidth is offered in a single data pack. One data pack costs $5 per month, and provides a monthly quota of 50 GB for bandwidth and 50 GB for storage. You can purchase as many data packs as you need. For example, if you need 150 GB of storage, you'd buy three data packs.

Purchasing data packs for Git LFS is independent of any other paid feature or product on GitHub.
1. 