
const dbOperations = require('./databaseServices/dbOperations');
const optionGenerator = require('./queueOptionGenerator')

module.exports =  (sendMailQueue,congig) => {
  sendInstantEmails()
  scheduleCurrentYearEmails()
  scheduleHourlyEmails()
  scheduleDailyEmails()
  scheduleWeeklyEmails()
  scheduleMonthlyEmails()


  function sendInstantEmails() {
    dbOperations.getInstantEmails().then((res) => {
      res.forEach(async email => {
        sendMailQueue.add({id: email.id});
        await  dbOperations.updateScheduledEmail(email)
        console.log('instant------>: ' + email.id)
      });
    })
    .then(()=>{
      console.log('instant------------>')
      setTimeout(() => {
        sendInstantEmails()
      }, congig.schedulerTimeout);
    })
  }

  function scheduleCurrentYearEmails() {
    dbOperations.getLaterEmailsForCurrentYear().then((res) => {
      res.forEach(async (email) => {
          const scheduleOptions = optionGenerator.forSingleLater(email)
          // sendMailQueue.add(email, cronOption);
          sendMailQueue.add({id: email.id}, scheduleOptions);

          await  dbOperations.updateScheduledEmail(email)
        
            console.log('scheduled_later------>: ' + email.id)        
      });
    })
    .then(()=>{
      console.log('single_later------------>')
      setTimeout(() => {
        scheduleCurrentYearEmails()
      }, congig.schedulerTimeout);
    })
  }

  function scheduleHourlyEmails() {
    dbOperations.getHourlyEmails().then((res) => {
      res.forEach(async (email) => {
          const scheduleOptions = optionGenerator.forRecurringHourly(email)
          // sendMailQueue.add(email, cronOption);
          sendMailQueue.add({id: email.id}, scheduleOptions);

          await  dbOperations.updateScheduledEmail(email)
        
            console.log('scheduled_hourly------>: ' + email.id)        
      });
    })
    .then(()=>{
      console.log('hourly------------>')
      setTimeout(() => {
        scheduleHourlyEmails()
      }, congig.schedulerTimeout);
    })
  }

  function scheduleDailyEmails() {
    dbOperations.getDailyEmails().then((res) => {
      res.forEach(async (email) => {
          const scheduleOptions = optionGenerator.forRecurringDaily(email)
          // sendMailQueue.add(email, cronOption);
          sendMailQueue.add({id: email.id}, scheduleOptions);

          await  dbOperations.updateScheduledEmail(email)
        
            console.log('scheduled_daily------>: ' + email.id)        
      });
    })
    .then(()=>{
      console.log('daily------------>')
      setTimeout(() => {
        scheduleDailyEmails()
      }, congig.schedulerTimeout);
    })
  }

  function scheduleWeeklyEmails() {
    dbOperations.getWeeklyEmails().then((res) => {
      res.forEach(async (email) => {
          const scheduleOptions = optionGenerator.forRecurringWeekly(email)
          // sendMailQueue.add(email, cronOption);
          sendMailQueue.add({id: email.id}, scheduleOptions);

          await  dbOperations.updateScheduledEmail(email)
        
            console.log('scheduled_weekly------>: ' + email.id)        
      });
    })
    .then(()=>{
      console.log('weekly------------>')
      setTimeout(() => {
        scheduleWeeklyEmails()
      }, congig.schedulerTimeout);
    })
  }

  function scheduleMonthlyEmails() {
    dbOperations.getMonthlyEmails().then((res) => {
      res.forEach(async (email) => {
          const scheduleOptions = optionGenerator.forRecurringMonthly(email)
          // sendMailQueue.add(email, cronOption);
          sendMailQueue.add({id: email.id}, scheduleOptions);

          await  dbOperations.updateScheduledEmail(email)
        
            console.log('scheduled_monthly------>: ' + email.id)        
      });
    })
    .then(()=>{
      console.log('monthly------------>')
      setTimeout(() => {
        scheduleMonthlyEmails()
      }, congig.schedulerTimeout);
    })
  }

  return {
    scheduleCurrentYearEmails: scheduleCurrentYearEmails,
    scheduleHourlyEmails: scheduleHourlyEmails,
    scheduleDailyEmails: scheduleDailyEmails,
    scheduleWeeklyEmails: scheduleWeeklyEmails,
    scheduleMonthlyEmails: scheduleMonthlyEmails
  }
}

