/**
 * Formats a date string for displaying in a table in the "DD-MM-YYYY" format.
 *
 * @param {string} dateString - A date string in a format that can be parsed by JavaScript's Date constructor.
 * @returns {string} - A formatted date string in the "DD-MM-YYYY" format.
 */
export function formatCreatedDateForTable(dateString: string): string {
  // Create a new Date object from the input dateString.
  const date = new Date(dateString);

  // Extract the day, month, and year components from the date.
  const day = String(date.getDate()).padStart(2, "0"); // Get the day of the month (with leading zero).
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (months are 0-based) with leading zero.
  const year = date.getFullYear(); // Get the full year.

  // Construct and return the formatted date string in the "DD-MM-YYYY" format.
  return `${day}-${month}-${year}`;
}

/**
 * Formats a date string for user joining in a user-friendly format.
 *
 * @param {string} dateString - A date string in a format that can be parsed by JavaScript's Date constructor.
 * @returns {string} - A formatted date string in the "Month Day, Year, Hour:Minute" format.
 */
export function formatDateForUserJoining(dateString: string): string {
  // Create a new Date object from the input dateString.
  const date = new Date(dateString);

  // Define formatting options for the date.
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric", // Display the year in numeric format (e.g., 2023).
    month: "short", // Display the month in abbreviated form (e.g., Jan).
    day: "numeric", // Display the day of the month in numeric form (e.g., 26).
    hour: "numeric", // Display the hour in numeric format (e.g., 15 for 3 PM).
    minute: "numeric", // Display the minute in numeric format (e.g., 09).
  };

  // Create a DateTimeFormat object for formatting the date.
  const formatter = new Intl.DateTimeFormat("en-US", options);

  // Format the date using the specified options and return the formatted string.
  return formatter.format(date);
}

/**
 * Formats a JavaScript Date object to an ISO 8601 string in the "YYYY-MM-DDTHH:MM" format.
 *
 * @param {Date} date - A JavaScript Date object to be formatted.
 * @returns {string} - An ISO 8601 formatted string representing the date in "YYYY-MM-DDTHH:MM" format.
 */
export function formatDateToISOString(date: Date): string {
  // Extract the year, month, and day components from the Date object.
  const year = date.getFullYear();                                 // Get the full year (e.g., 2023).
  const month = (date.getMonth() + 1).toString().padStart(2, "0");  // Get the month (1-based) with leading zero (e.g., 03 for March).
  const day = date.getDate().toString().padStart(2, "0");           // Get the day of the month with leading zero (e.g., 15).

  // Construct an ISO 8601 formatted string in "YYYY-MM-DDTHH:MM" format, with a placeholder time of "00:00".
  const formattedDate = `${year}-${month}-${day}T00:00`;

  // Return the formatted date string.
  return formattedDate;
}




export function formatLocationData(locationObj: any): string {
  // Create a new Date object from the input dateString.
  return locationObj.name || ''
  
}