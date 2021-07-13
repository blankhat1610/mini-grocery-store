/**
 * Adjust the the date to UTC 00:00 time regardless input by date picker keyboard or picked by mouse
 *
 * @param {Date|null} date
 * @returns Date|null
 */
export const getDateIgnoreTimezone = (date) =>
  date && date.getUTCHours() !== 0
    ? ((theDate) =>
        new Date(theDate.getTime() - theDate.getTimezoneOffset() * 60 * 1000))(
        new Date(date)
      )
    : date;
