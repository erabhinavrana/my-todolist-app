const today = new Date();

const getCurrentDay = function () {
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }
  let currentDay = today.toLocaleDateString("en-US", options);
  return currentDay;
}

const getCurrentYear = function() {
  let options = {
    year: "numeric"
  }
  let currentYear = today.toLocaleDateString("en-US", options);
  return currentYear;
}

module.exports = {getCurrentDay, getCurrentYear};
