

## Create RSA Token Home Assistant CLI

1. Create UnRaid Directory in hassio dir

        mkdir /unraid/
        cd /unraid
        mkdir .ssh

2. Generate the RSA Key
   
        ssh-keygen

    specifiy the location of the output to be `/config/unraid/.ssh/rsa_key_name`

3. Once an SSH key has been created, the ssh-copy-id command can be used to install it as an authorized key on the server. Once the key has been authorized for SSH, it grants access to the server without a password.

Use a command like the following to copy SSH key:

        ssh-copy-id -i /config/unraid/.ssh/rsa_key_name user@host

enter the password when requested

4. Once the key has been copied, it is best to test it

        ssh -i /config/unraid/.ssh/rsa_key_name user@host

5. If the UnRaid server is rebooted before when next section of the guide is completed your SSH keys will get removed from UnRaid and you will need to start again from step 3.



## Persistent SSH UnRaid 

1. Check `authorized_keys` exists

        ls /root/.ssh

2. Change permission of authorized_keys to 600:

        chmod 600 /root/.ssh/authorized_keys

3. Create a script in `/boot/config/ssh/setup_ssh_client.sh`:


        #!/bin/bash

        SSH_DIR=/root/.ssh

        mkdir ${SSH_DIR}
        chmod 755 ${SSH_DIR}
        cp /boot/config/ssh/authorized_keys ${SSH_DIR}/authorized_keys
        chmod 600 ${SSH_DIR}/authorized_keys
 
4. make it executable:

        chmod 755 /boot/config/ssh/setup_ssh_client.sh


5. Copy the previously created `authorized_keys` into `/boot/config/ssh` folder

        cp /root/.ssh/authorized_keys /boot/config/ssh/

6. Edit `/boot/config/go` and add the following line at the end, so that our setup script can be called during reboot:

        # SSH Script
        /boot/config/ssh/setup_ssh_client.sh

7. Reboot Unraid server
        
        powerdown -r
        
8. Confirm the script has worked and that `authorized_keys` exists as we did in `Step 1`
        
        ls /root/.ssh

9. Install and configure [SSH Config Tool](https://forums.unraid.net/topic/45586-ssh-and-denyhosts-updated-for-v61/) from the UnRaid community app store

![unraid](https://github.com/noodlemctwoodle/Hassio/blob/master/www/github/screenshots/unraid.png)

        
