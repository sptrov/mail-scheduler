
 const option = {
  jobId: 'zzz',
  attempts: 5,
  repeat: {
    cron: "*/4 * * * * *",
    limit: 2
  }
}

function forSingleLater(email) {
  const s = email.schedule
  const cron = `${s.second || "*"} ${s.minute} ${s.hour} ${s.dayOfMonth} ${s.month} *`
  return  {
    jobId: email.id,
    attempts: 5,
    removeOnComplete: true,
    repeat: {
      cron: cron,
      limit: 1
    }
  }
}
function forRecurringHourly(email) {
  const s = email.schedule
  let hourFormula = "*"

  if(+(s.numberOfTimes) > 1){
    hourFormula = `${hourFormula}/${s.numberOfTimes}`
  }
  const cron = `0 0 ${hourFormula} * * *`
  let options = {
    jobId: email.id,
    attempts: 5,
    repeat: {
      cron: cron
    }
  }
  if(s.limit && s.limit != '') {
    options.repeat.limit = s.limit
  }

  return options;
}

function forRecurringDaily(email) {
  const s = email.schedule
  let dayFormula = "*"

  if(+(s.numberOfTimes) > 1){
    dayFormula = `${dayFormula}/${s.numberOfTimes}`
  }
  
  const cron = `${s.second || "*"} ${s.minute} ${s.hour} ${dayFormula} * * `

  let options = {
    jobId: email.id,
    attempts: 5,
    repeat: {
      cron: cron
    }
  }
  if(s.limit && s.limit != '') {
    options.repeat.limit = s.limit
  }

  return options;
}


function forRecurringWeekly(email) {
  const s = email.schedule

  const cron = `${s.second || "*"} ${s.minute} ${s.hour} * * ${s.daysOfWeek}`

  let options = {
    jobId: email.id,
    attempts: 5,
    repeat: {
      cron: cron
    }
  }
  if(s.limit && s.limit != '') {
    options.repeat.limit = s.limit
  }

  return options;
}

function forRecurringMonthly(email) {
  const s = email.schedule

  let monthFormula = "*"

  if(+(s.numberOfTimes) > 1){
    monthFormula = `${monthFormula}/${s.numberOfTimes}`
  }

  const cron = `${s.second || "*"} ${s.minute} ${s.hour} ${s.dayOfMonth} ${monthFormula} *`

  let options = {
    jobId: email.id,
    attempts: 5,
    repeat: {
      cron: cron
    }
  }
  if(s.limit && s.limit != '') {
    options.repeat.limit = s.limit
  }

  return options;
}


module.exports = {
  forSingleLater: forSingleLater,
  forRecurringHourly: forRecurringHourly,
  forRecurringDaily: forRecurringDaily,
  forRecurringWeekly: forRecurringWeekly,
  forRecurringMonthly: forRecurringMonthly
}