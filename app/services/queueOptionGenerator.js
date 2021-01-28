
function getSchedulePattern(jobId, cronPattern) {
  return {
    jobId: jobId,
    removeOnComplete: true,
    attempts: 5,
    repeat: {
      cron: cronPattern
    }
  }
}
function forSingleLater(email) {
  const s = email.schedule
  const cron = `${s.second || "*"} ${s.minute} ${s.hour} ${s.dayOfMonth} ${s.month} *`
  let option = getSchedulePattern(email.id, cron)
  option.repeat.limit = 1;
  return option
}

function forRecurringHourly(email) {
  const s = email.schedule
  let hourFormula = "*"

  if (+(s.numberOfTimes) > 1) {
    hourFormula = `${hourFormula}/${s.numberOfTimes}`
  }
  const cron = `0 0 ${hourFormula} * * *`
  let options = getSchedulePattern(email.id, cron)

  if (s.limit && s.limit != '') {
    options.repeat.limit = s.limit
  }

  return options;
}

function forRecurringDaily(email) {
  const s = email.schedule
  let dayFormula = "*"

  if (+(s.numberOfTimes) > 1) {
    dayFormula = `${dayFormula}/${s.numberOfTimes}`
  }

  const cron = `${s.second || "*"} ${s.minute} ${s.hour} ${dayFormula} * * `

  let options = getSchedulePattern(email.id, cron)

  if (s.limit && s.limit != '') {
    options.repeat.limit = s.limit
  }

  return options;
}


function forRecurringWeekly(email) {
  const s = email.schedule

  const cron = `${s.second || "*"} ${s.minute} ${s.hour} * * ${s.daysOfWeek}`

  let options = getSchedulePattern(email.id, cron)

  if (s.limit && s.limit != '') {
    options.repeat.limit = s.limit
  }

  return options;
}

function forRecurringMonthly(email) {
  const s = email.schedule

  let monthFormula = "*"

  if (+(s.numberOfTimes) > 1) {
    monthFormula = `${monthFormula}/${s.numberOfTimes}`
  }

  const cron = `${s.second || "*"} ${s.minute} ${s.hour} ${s.dayOfMonth} ${monthFormula} *`

  let option = getSchedulePattern(email.id, cron)

  if (s.limit && s.limit != '') {
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