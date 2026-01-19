export const getTime = (timestamp) => {
  if (timestamp.length > 5) {
    const date = new Date(timestamp);
    let timeHours = date.getHours();
    let timeMinutes = date.getMinutes();

    if (timeHours < 10) {
      timeHours = "0" + timeHours;
    }

    if (timeMinutes < 10) {
      timeMinutes = "0" + timeMinutes;
    }

    return `${timeHours}:${timeMinutes}`;
  } else {
    return timestamp;
  }
};
