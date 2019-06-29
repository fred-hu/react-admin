// usage: https://www.npmjs.com/package/node-ssh
var path, node_ssh, ssh, fs, opn, host;
fs = require('fs');
path = require('path');
node_ssh = require('node-ssh');
opn = new require('opn');
ssh = new node_ssh();
host = 'localhost';
var localDir = './dist';
var remoteDir = '/opt/frontend/new';
var removeCommand = 'rm -rf ./*';
var pwdCommand = 'pwd';
ssh
  .connect({
    host: host,
    username: 'root',
    port: 22,
    // password,
    privateKey: './.ssh/id_rsa'
  })
  .then(function() {
    ssh.execCommand(removeCommand, { cwd: remoteDir }).then(function(result) {
      console.log('STDOUT: ' + result.stdout);
      console.log('STDERR: ' + result.stderr);
      ssh.putDirectory(localDir, remoteDir).then(
        function() {
          console.log('The File thing is done');
          ssh.dispose();
          opn('http://' + host, { app: ['chrome'] });
        },
        function(error) {
          console.log("Something's wrong");
          console.log(error);
          ssh.dispose();
        }
      );
    });
  });
