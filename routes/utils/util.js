/**
 * Converts the day value from a Date object into days of week in English
 * @param day The day value from the getDay method of a Date object
 * @returns {string}
 */

function convertDayToStr (day) {
  let dayStr;
  switch (day) {
    case 0:
      dayStr = 'Sunday';
      break;
    case 1:
      dayStr = 'Monday';
      break;
    case 2:
      dayStr = 'Tuesday';
      break;
    case 3:
      dayStr = 'Wednesday';
      break;
    case 4:
      dayStr = 'Thursday';
      break;
    case 5:
      dayStr = 'Friday';
      break;
    case 6:
      dayStr = 'Saturday';
      break;
    default:
      dayStr = "Error Day out of range! Please use a value from 0 to 6: " + day;
      break;
  }
  return dayStr;
}

/**
 * Converts the month of a Date object into the English string
 * @param month the return value from the getMonth method of a Date object
 * @returns {string}
 */
function convertMonthToStr (month) {
  let monthStr;
  switch (month) {
    case 1:
      monthStr = 'January';
      break;
    case 2:
      monthStr = 'February';
      break;
    case 3:
      monthStr = 'March';
      break;
    case 4:
      monthStr = 'April';
      break;
    case 5:
      monthStr = 'May';
      break;
    case 6:
      monthStr = 'June';
      break;
    case 7:
      monthStr = 'July';
      break;
    case 8:
      monthStr = 'August';
      break;
    case 9:
      monthStr = 'September';
      break;
    case 10:
      monthStr = 'October';
      break;
    case 11:
      monthStr = 'November';
      break;
    case 12:
      monthStr = 'December';
      break;
    default:
      monthStr = "Error can't get valid month";
      break;
  }
  return monthStr;
}

function getDateInStr(today) {
  // console.log("TYPEOF  " + typeof  today);
  if (typeof today === 'undefined') {
    today = new Date();
  }
  else if (typeof today === 'string') {
    today = new Date(today);
  }

  const dayStr = convertDayToStr(today.getDay());
  const monthStr = convertMonthToStr(today.getMonth() + 1);
  const date = dayStr + ', ' + today.getDate() + ' ' + monthStr + ' ' + today.getFullYear();
  return date;
}

function getDate(today) {
  if (typeof today === 'undefined') {
    today = new Date();
  }
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  const date = year + "-" + month + "-" + day;
  return date;
}

// //date = yyyy-mm-dd
// function convertDateToStr(date) {
//     date = "'" + date + "'";let components = date.split("-");
//     console.log(components)
//     let newdate = new Date(date)
//     console.log(newdate.getDate())
//     return convertDayToStr(newdate.getDay()) + ", " + parseInt(components[2]) + " "  + convertMonthToStr(parseInt(components[1])) + " "  + components[0];
// }

//date = yyyy-mm-dd
function convertDateToStr(date) {
  let components = date.split("-");
  let newdate = new Date(date)

  return convertDayToStr(newdate.getDay()) + ", " + parseInt(components[2]) + " "  + convertMonthToStr(parseInt(components[1])) + " "  + components[0];
}

module.exports.convertDayToStr = convertDayToStr;
module.exports.convertMonthToStr = convertMonthToStr;
module.exports.getDateInStr = getDateInStr;
module.exports.getDate = getDate;
// module.exports.convertDateToStr = convertDateToStr;

function checkAndExtend(val) {
  if (val < 10) {
    val = '0' + val;
  }
  return val;
}

function getTime(today) {
  if (typeof today === 'undefined') {
    today = new Date();
  }

  let hours = checkAndExtend(today.getHours());
  let minutes = checkAndExtend(today.getMinutes());
  let seconds = checkAndExtend(today.getSeconds());
  return hours + ':' + minutes + ':' + seconds;
}

module.exports.getTime = getTime;

function pad(str) {
  return "'" + str + "'";
}

module.exports.pad = pad;

function separateData(data, menuCount) {
  let separatedData = new Array(menuCount)
  for (let i = 0; i < menuCount; i++) {
    separatedData[i] = []
  }
  // console.log("initialised array", separatedData, separatedData[0], separatedData[1]);
  for (let i = 0, j = 0; i < data.length && j < menuCount; i++) {
    // console.log(data[i])
    if (i=== 0 || separatedData[j][0].menuname == data[i].menuname) {
      separatedData[j].push(data[i])
    } else {
      // console.log(j, separatedData[j][0].menuname, data[i].menuname);
      separatedData[++j].push(data[i])
    }
  }
  // console.log(separatedData);
  return separatedData
}

module.exports.separateData = separateData;

function updateSqlServer() {
  require('dotenv').config()
  const { Pool } = require('pg')

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  let query = require('../sql/sqlQueries').delete_old_entries
  let today = new Date()
  let time = getTime(today)
  let date = getDate(today)
  console.log(time, date)

  let queryArgs = [
    time,
    date
  ]

  pool.query(query, queryArgs, (err, data) => {
      if (err) {
          console.error(err)
      } else {
          console.log('successfully refreshed entries!')
      }
  })
}

module.exports.updateSqlServer = updateSqlServer