const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const weatherData = require("./example.json");

app.get("/weather", (req, res) => {
  // api is changed.
  //   const { lat, lon } = req.query;
  //   axios
  //     .get(`https://api.openweathermap.org/data/2.5/weather`, {
  //       params: { lat, lon, appid: process.env.API_KEY },
  //     })
  //     .then(({ data }) => res.json(data))
  //     .catch((e) => {
  //       console.error(e);
  //       res.sendStatus(500);
  //     });

  res.json({
    current: parseCurrentWeather(weatherData),
    daily: parseDailyWeather(weatherData),
    hourly: parseHourlyWeather(weatherData),
  });
});

app.listen(3001);

function parseCurrentWeather({ current, daily }) {
  const { temp: currentTemp, weather, wind_speed } = current; // rename temp to currentTemp
  const { pop, temp, feels_like } = daily[0];

  return {
    currentTemp: Math.round(currentTemp),
    highTemp: Math.round(temp.max),
    lowTemp: Math.round(temp.min),
    highFeelsLike: Math.round(Math.max(...Object.values(feels_like))),
    lowFeelsLike: Math.round(Math.min(...Object.values(feels_like))),
    windSpeed: Math.round(wind_speed),
    precip: Math.round(pop * 100),
    icon: weather[0].icon,
    description: weather[0].description,
  };
}

function parseDailyWeather({ daily }) {
  return daily.slice(1).map((day) => {
    return {
      timeStamp: day.dt * 1000,
      icon: day.weather[0].icon,
      temp: Math.round(Math.max(day.temp.day)),
    };
  });
}

const HOUR_IN_SECONDS = 3600;

function parseHourlyWeather({ hourly, current }) {
  return hourly
    .filter((hour) => hour.dt > current.dt - HOUR_IN_SECONDS)
    .map((hour) => {
      return {
        timeStamp: hour.dt * 1000,
        icon: hour.weather[0].icon,
        temp: Math.round(hour.temp),
        feelsLike: Math.round(hour.feels_like),
        windSpeed: Math.round(hour.wind_speed),
        precip: Math.round(hour.pop * 100),
      };
    });
}

/*
> we are getting 'CORS' error

Access to fetch at 'http://localhost:3001/weather' from origin 'http://localhost:1234' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, 
set the request's mode to 'no-cors' to fetch the resource with CORS disabled.



> to resolve this install package npm i cors.


> all 'CORS' is a Cross origin.

ex: our url for our site is 'localhost:1234' and url for our server is 'localhost:3001'. These are 2 different urls.
    and 'CORS' just blocks any request to different URLs.

    what we wanna do is to be able to allow request from different urls. and using 'CORS package' we can do that.

*/
