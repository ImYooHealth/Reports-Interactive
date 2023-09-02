## Summary of Deployment Process

### Deploy the Data
- Quick and dirty
    1. ssh onto the server, remove /home/samplereports/Data
        1. ssh vincent-admin@blop
        2. sudo su - samplereports
        3. rm -r Data/*
    2. SFTP the entire data directory from my machine into vincent-admin home
        1. put -R Data /home/vincent-admin/ 
    3. Move the data to /home/samplereports/Data
        1. sudo su
        2. cp -r Data/ /home/samplereports/
    4. Give it to the samplereports user
        1. chown -r samplereports /home/samplereports
    5. Relocate the data into the Reports-Interacive directory
        1. Move the data directory to Reports-Interactive/Data
            1. cd /home/samplereports/Reports-Interactive
            2. rm -r Data
            3. mv ../Data .        

### Deploy the Report
1. sudo su - vincent@blop
2. cd Repositories/Reports-Interactive
3. git pull
3. Edit the deployment flag on line in Reports-Interactive/Presentations/2nd-Presentation/Dashboard/src/components/CommonUtils.js, line 4
4. ssh vincent-admin@blop; sudo su;
    1. rm -r /home/samplereports/Reports-Interactive/
    2. cp -r /home/vincent/Repositories/Reports-Interactive/ /home/samplereports/
    3. chown -R samplereports /home/samplereports/
    4. Get out of sudo su
5. sudo su - samplereports
    1. cd /home/samplereports/Reports-Interactive/Presentations/2nd-Presentation/Dashboard
    2. npm install
7. Start the app
    1. cd /home/samplereports/Reports-Interactive
    2. Start and stop with ./start and ./stop
7. Try to view it. Remember: http**s**, rather than http
    1. View the data server at https://samplereportdata.imyoo.health. It should be a plain page showing directories. 
    2. View the main app at https://samplereport.imyoo.health. It should give a login prompt at the center of the page against a blue-grey background. 
    3. Ensure feedback is working. Login, and use the feedback module to try to send feedback. To verify that it works, go to the feedback directory (in notes section below) and see if it is there. Also, open the web inspector, go to console, and send arbitrary text to test. If there are no errors in the console and the feedback itself lands, it is operating correctly. 


### Notes
1. Logs are in Dashboard/log.txt
2. Feedback notes are presentation-specific. At time of writing, feedback for the current deployment is in 2nd-Presentation/Feedback, in specific, /home/samplereports/Reports-Interactive/Presentations/2nd-Presentation/Feedback
3. Notes for later, the path for data deployment later will be around the following:
    1. cp -r /mnt/data/bio/Vincent/Sample\ Report\ Demo\ Data/data/__secrets__00/ destination
4. Due to limitations in our current interactive rendering solution, the number of genes is limited to 500. This is set in src/components/Resources/GeneAbundance/utils.js, on line 10. The name of the variable is "max_genes". 
