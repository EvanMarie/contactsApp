export default function FormatDate(birthday: string): string {
  // Remove the space before the timezone offset
  const adjustedBirthday = birthday.replace(/(\d{2}:\d{2}:\d{2}) /, "$1");

  const date = new Date(adjustedBirthday);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}
