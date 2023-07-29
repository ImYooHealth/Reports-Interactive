Data:
* Expects this directory structure for data:
* Reports-Interactive/Data/__secrets__00/{Volcanoes, gene list, Abundances}

Performance:
* Set max_genes in Dashboard/src/components/utils.js

## Summary of Deployment Process

1. Edit, commit, push
2. ssh vincent@blop
3. cd, git pull
4. ssh vincent-admin@blop; sudo su;
    1. Check the deployment flag on line zero of Reports-Interactive/Presentations/Presentation_1/Dashboard/src/components/utils.js; check
    2. rm -r /home/samplereports/Reports-Interactive/
    3. rm -r /home/samplereports/Data/__secrets__00/
    4. cp -r /mnt/data/bio/Vincent/Sample\ Report\ Demo\ Data/data/__secrets__00/ /home/samplereports/Data/
    5. cp -r /home/vincent/Repositories/Reports-Interactive/ /home/samplereports/
    6. chown -R samplereports /home/samplereports/
    7. Get out of sudo su
5. sudo su - samplereports
    1. cd /home/samplereports/Reports-Interactive/Presentations/Presentation_1/Dashboard
    2. npm install
    3. Try to start it. Logs are in Dashboard/log.txt
6. Try to view it. Remember: http**s**, rather than http