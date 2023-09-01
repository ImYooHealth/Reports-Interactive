## Summary of Deployment Process

### Deploy the Data
- Quick and dirty
   1. ssh onto the server, remove /home/samplereports/Data
   2. SFTP the entire data directory from my machine into place
   3. sudo chown -r samplereports /home/samplereports

### Deploy the Report
1. ssh vincent@blop
2. cd, git pull
3. Edit the deployment flag on line zero of Reports-Interactive/Presentations/2nd-Presentation/Dashboard/src/components/CommonUtils.js, line 4
4. ssh vincent-admin@blop; sudo su;
    1. rm -r /home/samplereports/Reports-Interactive/
    2. cp -r /home/vincent/Repositories/Reports-Interactive/ /home/samplereports/
    3. chown -R samplereports /home/samplereports/
    4. Get out of sudo su
5. sudo su - samplereports
    1. cd /home/samplereports/Reports-Interactive/Presentations/Xth-Presentation/Dashboard
    2. npm install
    3. Try to start it. Logs are in Dashboard/log.txt
6. Try to view it. Remember: http**s**, rather than http