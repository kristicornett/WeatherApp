
import { getWeather } from './weather.js'
import './style.css'


getWeather(10, 10, Intl.DateTimeFormat().resolvedOptions().timeZone)
.then(renderWeather)
.catch(error => {
  console.error(error)
  alert("Error fetching weather")
})

function renderWeather({ current, daily, hourly }) {
  renderCurrentWeather(current)
  renderDailyWeather(daily)
  renderHourlyWeather(hourly)
  document.body.classList.remove('blur')
}

function setValue(selector, value, { parent = document } = {}) {
  parent.querySelector(`[data]-${selector}]`).textContent = value
}

function renderCurrentWeather(current) {
  setValue("current-temp", current.currentTemp)
  setValue("current-high", current.highTemp)
  setValue("current-low", current.lowTemp)
  setValue("current-fl-high", current.highFeelsLike)
  setValue("current-fl-low", current.lowFeelsLike)
  setValue("current-wind", current.windSpeed)
  setValue("current-precip", current.precip)
}

// setting helper function SetValue to take care of all the query selectors document.querySelector('[data-current-temp]').textContent = current.currentTemp
