import dayjs from "dayjs";
dayjs.locale("bn");
dayjs().format();

const getTimeAgo = (date) => {
  const currentDate = dayjs(new Date());
  const diffInSeconds = currentDate.diff(date, "second");

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = currentDate.diff(date, "minute");
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }

  const diffInHours = currentDate.diff(date, "hour");
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }

  const diffInDays = currentDate.diff(date, "day");
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }

  return currentDate.diff(date, "days") > 7
    ? date.format("YYYY-MM-DD")
    : `${diffInDays} days ago`;
};

export default getTimeAgo;

// Usage example:
// console.log(getTimeAgo(dayjs().subtract(5, 'seconds'))); // "5 seconds ago"
// console.log(getTimeAgo(dayjs().subtract(10, 'minutes'))); // "10 minutes ago"
// console.log(getTimeAgo(dayjs().subtract(3, 'hours'))); // "3 hours ago"
// console.log(getTimeAgo(dayjs().subtract(2, 'days'))); // "2 days ago"
// console.log(getTimeAgo(dayjs().subtract(10, 'days'))); // formatted date
