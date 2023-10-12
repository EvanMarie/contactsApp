export default function LocaLDatetime(localtime: string): string {
  // Parse the date-time string from the API
  const dateTime = new Date(localtime);

  // Check if date is valid
  if (isNaN(dateTime.getTime())) {
    return "Invalid Date";
  }

  // Extract date components
  const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
  const day = dateTime.getDate().toString().padStart(2, "0");
  const year = dateTime.getFullYear().toString().substr(2); // Get last 2 digits of year

  // Extract time components
  const hours24 = dateTime.getHours();
  const minutes = dateTime.getMinutes().toString().padStart(2, "0");

  // Convert 24-hour time to 12-hour time with AM/PM
  const period = hours24 < 12 ? "AM" : "PM";
  let hours12 = hours24 % 12;
  hours12 = hours12 || 12; // Convert "0" hours to "12"
  const hours = hours12.toString().padStart(2, "0"); // Pad with leading zero

  // Return the formatted date-time string
  return `${month}/${day}/${year} ${hours}:${minutes} ${period}`;
}
