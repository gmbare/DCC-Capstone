const { google } = require('googleapis');
require("dotenv").config();
  const auth = new google.auth.GoogleAuth({
    // Scopes can be specified either as an array or as a single, space-delimited string.
    scopes: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
    ],
  });
  const authClient = auth.getClient();
  const calendar = google.calendar({ version: 'v3', auth: authClient })
  // return [authClient,calendar]

// let authClient,calendar = main()

async function refreshList() {
  // console.log(calendar)
  const res = await (calendar.calendarList.list())
  console.log(res.data.items)
  return (res.data)
}

async function clearAllCalendar(calendarList) {
  calendarList.map(async entry => {
    await calendar.calendars.delete(
      { calendarId: entry.id }
    )
  })
  console.log(calendarList)

}

async function addCalendar(summ = "My_Summary") {
  const res = await calendar.calendars.insert({
    // Request body metadata
    requestBody: {
      "summary": summ,
      "description": "my_description",
    },
  });
  return (res.data)
}


refreshList()
// module.exports = {main}

