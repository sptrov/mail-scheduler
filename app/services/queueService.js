const Queue = require('bull');
const dbOperations = require('./databaseServices/dbOperations');

module.exports = (config) => {
  const sendMailQueue = 
  new Queue(config.bullQueueName, {
    redis: config.redis
  });

const emailService = require('./mailgunService')(config)
  sendMailQueue.process(5,job => {
    console.log(job.data);
    dbOperations.getEmailById(job.data.id)
    .then((email) => {
      console.log(email)

      emailService.sendEMail(email)
      //send the email
    })
  
  });
 const scheduler = require('./schedulerService')(sendMailQueue,config)

  sendMailQueue.getJobCounts().then(jobs =>{
    console.log(jobs)
  })
}