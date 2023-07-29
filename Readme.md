Data:
* Expects this directory structure for data:
* Reports-Interactive/Data/__secrets__00/{Volcanoes, gene list, Abundances}

Performance:
* Set max_genes in Dashboard/src/components/utils.js

Deployment:
1. Edit, commit, push  
2. ssh vincent@blop  
3. cd, git pull  
4. ssh vincent-admin@blop sudo su 
5. set the deployment flag on line zero of Reports-Interactive/Presentations/Presentation_1/Dashboard/src/components/utils.js 
6. copy Reports-Interactive to /home/samplereports/Reports-Interactive  
7. chown to samplereports?  
8. Get out of sudo su  
9. sudo su - samplereports  
10. npm install
11. Try to start it. Logs are in Dashboard/log.txt
12. Try to view it. Remember https, rather than http