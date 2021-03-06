let Email = require('../../models/email').Email

let limiter = 100; // should go to config file 

//We dont want to yet to warry about single emails for next year
//We also dont have to flood the queue with such a job
function getLaterEmailsForCurrentYear() {
  return Email.
  find({
      "schedule.scheduled": "false"
    })
    .where("schedule.year").equals((new Date().getFullYear()).toString())
    .where("schedule.type").equals("later")
    .limit(limiter)
    .exec();
}

function  updateScheduledEmail(email) {
  email.schedule.scheduled = true;
  return email.save()
}

function getInstantEmails() {
  return Email.find({
      "schedule.type": {
        $eq: "now"
      }
    })
    .where("schedule.scheduled").equals(false)
    .limit(limiter)
    .exec()
}


function getHourlyEmails(){
  return getRecurringEmailsByPeriod('hour')
}

function getDailyEmails(){
  return getRecurringEmailsByPeriod('day')
}

function getWeeklyEmails(){
  return getRecurringEmailsByPeriod('week')
}
function getMonthlyEmails(){
  return getRecurringEmailsByPeriod('month')
}

function getRecurringEmailsByPeriod(period) {
  return Email.find({
      "schedule.type": {
        $eq: "recurring"
      }
    })
    .where("schedule.period").equals(period)
    .where("schedule.scheduled").equals(false)
    .limit(limiter)
    .exec()
}

function getEmailById(id) {
  return Email.findById(id)
    .exec()
}

module.exports = {
  getInstantEmails: getInstantEmails,
  getLaterEmailsForCurrentYear: getLaterEmailsForCurrentYear,
  getHourlyEmails: getHourlyEmails,
  getDailyEmails: getDailyEmails,
  getWeeklyEmails: getWeeklyEmails,
  getMonthlyEmails: getMonthlyEmails,
  // getRecurringEmailsByPeriod: getRecurringEmailsByPeriod,
  updateScheduledEmail: updateScheduledEmail,
  getEmailById: getEmailById
}