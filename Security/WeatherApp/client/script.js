import { format } from "date-fns";

// first we need to get the users location

navigator.geolocation.getCurrentPosition(positionSuccess, positionError);

async function positionSuccess({ coords }) {
  await getWeather(coords.latitude, coords.longitude);
}

function positionError() {
  alert(
    "There was an error getting your location. Please allow us to use your location and refresh the page."
  );
}

async function getWeather(lat, lon) {
  try {
    var queryParams = new URLSearchParams({ lat, lon });
    var data = await fetch(`http://localhost:3001/weather?${queryParams}`).then(
      (res) => res.json()
    );

    renderWeather(data);
  } catch (e) {
    console.error(e);
  }
}

function renderWeather({ current, daily, hourly }) {
  document.body.classList.remove("blurred");
  renderCurrentWeather(current);
  renderDailyWeather(daily);
  renderHourlyWeather(hourly);
}

const currentIcon = document.querySelector("[data-current-icon]");

function renderCurrentWeather(current) {
  currentIcon.src = getIconUrl(current.icon, { large: true });
  setValue("current-temp", current.currentTemp);
  setValue("current-description", current.description);
  setValue("current-high", current.highTemp);
  setValue("current-fl-high", current.highFeelsLike);
  setValue("current-low", current.lowTemp);
  setValue("current-fl-low", current.lowFeelsLike);
  setValue("current-wind", current.windSpeed);
  setValue("current-precip", current.precip);
}

function getIconUrl(icon, { large = false } = {}) {
  const size = large ? "@2x" : "";
  return `http://openweathermap.org/img/wn/${icon}${size}.png`;
}

function setValue(selector, value, { parent = document } = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = value;
}

const dailySection = document.querySelector("[data-day-section]");
const dayCardTemplate = document.querySelector("#day-card-template");
function renderDailyWeather(daily) {
  const childElements = daily.map((day) => {
    const element = dayCardTemplate.content.cloneNode(true);
    setValue("temp", day.temp, { parent: element });
    setValue("date", formatDay(day.timeStamp), { parent: element });
    element.querySelector("[data-icon]").src = getIconUrl(day.icon);
    return element;
  });

  dailySection.replaceChildren(...childElements);
}

function formatDay(timeStamp) {
  const date = new Date(timeStamp);
  return format(date, "eeee");
}

const hourlySection = document.querySelector("[data-hour-section]");
const hourRowTemplate = document.querySelector("#hour-row-template");
function renderHourlyWeather(hourly) {
  hourlySection.innerHTML = "";
  hourly.forEach((hour) => {
    const element = hourRowTemplate.content.cloneNode(true);
    setValue("temp", hour.temp, { parent: element });
    setValue("fl-temp", hour.feelsLike, { parent: element });
    setValue("wind", hour.windSpeed, { parent: element });
    setValue("precip", hour.precip, { parent: element });
    setValue("day", formatDay(hour.timeStamp), { parent: element });
    setValue("time", formatTime(hour.timeStamp), { parent: element });
    element.querySelector("[data-icon]").src = getIconUrl(hour.icon);
    hourlySection.append(element);
  });
}

function formatTime(timeStamp) {
  return format(new Date(timeStamp), "ha");
}
