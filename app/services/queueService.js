const config = require("../config/config");
const Queue = require('bull');
const dbOperations = require('./databaseServices/dbOperations');
const email = require("../models/email");
const optionGenerator = require('./queueOptionGenerator')




module.exports = (config) => {
  const sendMailQueue = 
  new Queue(config.bullQueueName, {
    redis: config.redis
  });

//   sendMailQueue.empty().then(function () { 
  
    
//     resolve(queue);
// }).catch(function (err) {
//      reject(err);
// });

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




  // scheduler.scheduleCurrentYearEmails()
  // scheduler.scheduleHourlyEmails()
  // scheduler.scheduleDailyEmails()
  // scheduler.scheduleWeeklyEmails()
  // scheduler.scheduleMonthlyEmails()


  // function schedule() {

  //   scheduler.scheduleEmailsForCurrentYear()
  //     .then(()=>{
  //       console.log('------------')
  //       setTimeout(() => {
  //         schedule()
  //       }, 5000);
  //     })
  //   }

  //   schedule()


    //these are single later emails

  // dbOperations.getLaterEmailsForCurrentYear().then((res) => {
  //   res.forEach(email => {
  //     const scheduleOptions = optionGenerator.forSingleLater(email)
  //     // sendMailQueue.add(email, cronOption);
  //     sendMailQueue.add({id: email.id}, scheduleOptions);

  //     dbOperations.updateScheduledEmail(email)
    
  //     //  console.log(email)
  //   });
  // })

  sendMailQueue.getJobCounts().then(jobs =>{
    console.log(jobs)
  })

  // sendMailQueue.removeJobs().then(jobs =>{
  //   jobs.forEach(job =>{
  //     console.log(job.key)
  //   })
  // })


  return {
    queue: sendMailQueue
  }

}