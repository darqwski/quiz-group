source .env.sh
sshpass -p "$SSH_PASSWORD" scp -P $SSH_PORT package.zip $SSH_USER@$SSH_HOST:/home/$SSH_USER/domains/dariuszcabala.pl/public_html/
sshpass -p $SSH_PASSWORD ssh $SSH_USER@$SSH_HOST -p $SSH_PORT 'bash -s' < 'ssh_actions.sh'
sshpass -p $SSH_PASSWORD ssh $SSH_USER@$SSH_HOST -p $SSH_PORT
