# mail-scheduler

1. configure Mailgun in  app/config/config.js 
2. Start ```redis-server```  
* Mine is on the default 6379 PORT and local installatin so if you use another port or server plese make sure 
* to change the configuration in app/config/config.js

3. Mongo is also configurable in the same file if you dont use a local or default port
 * also make sure it uses the same db url as the BE app
4. Start the app -> ```npm run local```