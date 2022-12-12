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

