const getDuration = (timestamp) => {
  const now = new Date();
  const receivedDate = new Date(timestamp);

  const today = now.getTime();
  const rtime = receivedDate.getTime();

  const diff = today - rtime;
  const minutes = diff / 60000;

  if (diff < 0) {
    return "Just now.";
  }

  const todayDate = now.toDateString();
  const receivedDateString = receivedDate.toDateString();
  const isToday = todayDate === receivedDateString;

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = yesterday.toDateString() === receivedDateString;

  if (minutes <= 1) {
    return "Just now.";
  } else if (minutes <= 59) {
    return Math.floor(minutes) + " minutes ago";
  } else if (minutes <= 480) {
    return Math.floor(minutes / 60) + " hours ago";
  } else if (isToday) {
    return "Today";
  } else if (isYesterday) {
    return "Yesterday";
  } else {
    return receivedDate.toDateString();
  }
};

export default getDuration;
