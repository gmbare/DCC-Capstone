const {google} = require('googleapis');
require("dotenv").config();

async function main() {
    const auth = new google.auth.GoogleAuth({
      // Scopes can be specified either as an array or as a single, space-delimited string.
      scopes: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events',
      ],
    });
    console.log("UM")
    const params = {
    // Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
    // 'calendarId': process.env.CALENDAR_ID,
    'calendarId': "Primary",
    }


      // Acquire an auth client, and bind it to all future calls
  const authClient = await auth.getClient();
  // google.options({auth: authClient});
  const calendar = google.calendar({version:'v3', auth: authClient})
  // Do the magic
  // calendar.calendars.insert
  async function refreshList() {
    const res = await (calendar.calendarList.list())
    console.log(calendar)

    console.log(res.data.items)
    return(res.data.items)
  }

  function clearCalendar(calendarList) {
    calendarList.map(async entry=> {
      await calendar.calendars.delete(
        {calendarId:entry.id}
      )
    })
    console.log(calendarList)

  }

  async function addCalendar(summ = "My_Summary") { 
     const res = await calendar.calendars.insert({
    // Request body metadata
    requestBody: {
      // request body parameters
      // {
      //   "conferenceProperties": {},
        "summary": summ,
        "description": "my_description",
      //   "etag": "my_etag",
      //   "id": "my_id",
      //   "kind": "my_kind",
      //   "location": "my_location",
      //   "timeZone": "my_timeZone"
      // }
    },
  });
}


//FIND WAY TO DIFFERENTIATE BETWEEN PARLOURS BEYOND JUST IN NAMING CONVENTIONS
  refreshList()
  // addCalendar("Nice")
  // clearCalendar(calendarList)





  // const res = await calendar.events.insert({
  //   // Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
  //   calendarId: params.calendarId,
  //   // Version number of conference data supported by the API client. Version 0 assumes no conference data support and ignores conference data in the event's body. Version 1 enables support for copying of ConferenceData as well as for creating new conferences using the createRequest field of conferenceData. The default is 0.
  //   // conferenceDataVersion: 'placeholder-value',
  //   // The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional.
  //   // maxAttendees: 'placeholder-value',
  //   // Deprecated. Please use sendUpdates instead.
  //   //
  //   // Whether to send notifications about the creation of the new event. Note that some emails might still be sent even if you set the value to false. The default is false.
  //   // sendNotifications: 'placeholder-value',
  //   // Whether to send notifications about the creation of the new event. Note that some emails might still be sent. The default is false.
  //   // sendUpdates: 'placeholder-value',
  //   // Whether API client performing operation supports event attachments. Optional. The default is False.
  //   // supportsAttachments: 'placeholder-value',

  //   // Request body metadata
  //   requestBody: {
  //     // request body parameters
  //     // {
  //     //   "anyoneCanAddSelf": false,
  //     //   "attachments": [],
  //     //   "attendees": [],
  //     //   "attendeesOmitted": false,
  //     //   "colorId": "my_colorId",
  //     //   "conferenceData": {},
  //     //   "created": "my_created",
  //     //   "creator": {},
  //     //   "description": "my_description",
  //     //   "end": {},
  //     //   "endTimeUnspecified": false,
  //     //   "etag": "my_etag",
  //     //   "eventType": "my_eventType",
  //     //   "extendedProperties": {},
  //     //   "gadget": {},
  //     //   "guestsCanInviteOthers": false,
  //     //   "guestsCanModify": false,
  //     //   "guestsCanSeeOtherGuests": false,
  //     //   "hangoutLink": "my_hangoutLink",
  //     //   "htmlLink": "my_htmlLink",
  //     //   "iCalUID": "my_iCalUID",
  //     //   "id": "my_id",
  //     //   "kind": "my_kind",
  //     //   "location": "my_location",
  //     //   "locked": false,
  //     //   "organizer": {},
  //     //   "originalStartTime": {},
  //     //   "privateCopy": false,
  //     //   "recurrence": [],
  //     //   "recurringEventId": "my_recurringEventId",
  //     //   "reminders": {},
  //     //   "sequence": 0,
  //     //   "source": {},
  //     //   "start": {},
  //     //   "status": "my_status",
  //       "summary": "my_summary",
  //     //   "transparency": "my_transparency",
  //     //   "updated": "my_updated",
  //     //   "visibility": "my_visibility"
  //     // }
  //   },
  // });
  // console.log('um4')
  // // console.log(res.data);
}

main().catch(e => {
  console.log("We have run into an error")
  // console.error(e);
  throw e;
});