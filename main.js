
import { getWeather } from './weather.js'
import { ICON_MAP } from './icons.js'

//navigator.geolocation.getCurrentPosition(positionSuccess, positionError)

/*function positionSuccess ({ coords }) {
  getWeather(coords.latitude, 
    coords.longitude, 
    Intl.DateTimeFormat().resolvedOptions().timeZone
    )
  .then(renderWeather)
  .catch(error => {
  console.error(error)
  alert("Error fetching weather")
})

}
*/
getWeather(36, 
  -86, 
  Intl.DateTimeFormat().resolvedOptions().timeZone
  )
.then(renderWeather)
.catch(error => {
console.error(error)
alert("Error fetching weather")
})



function positionError () {
  alert("There was an error fetching your location.")
}



function renderWeather({ current, daily, hourly }) {
  renderCurrentWeather(current)
  renderDailyWeather(daily)
  renderHourlyWeather(hourly)
  document.body.classList.remove('blur')
}
// setting helper function SetValue to take care of all the query selectors document.querySelector('[data-current-temp]').textContent = current.currentTemp
function setValue(selector, value, { parent = document } = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = value
}

function getIconUrl(iconCode) {
  return `icons/${ICON_MAP.get(iconCode)}.svg`
}

const currentIcon = document.querySelector('[data-current-icon]')
function renderCurrentWeather(current) {
  currentIcon.src = getIconUrl(current.iconCode)
  setValue("current-temp", current.currentTemp)
  setValue("current-high", current.highTemp)
  setValue("current-low", current.lowTemp)
  setValue("current-fl-high", current.highFeelsLike)
  setValue("current-fl-low", current.lowFeelsLike)
  setValue("current-wind", current.windSpeed)
  setValue("current-precip", current.precip)
}

//making formatter to convert time
const day_formatter = Intl.DateTimeFormat(undefined, {weekday: 'long'})

const dailySection = document.querySelector('[data-day-section]')
const dayCardTemplate = document.getElementById('day-card-template')
function renderDailyWeather(daily) {
  dailySection.innerHTML = ''
  daily.forEach(day => {
    const element = dayCardTemplate.content.cloneNode(true)
    //how to clone a template clones all children as well

    //set value to the element above parent is current element and I want to search the element above
    setValue('temp', day.maxTemp, { parent: element})
    setValue('date', day_formatter.format(day.timestamp), {parent: element})
    element.querySelector('[data-icon]').src = getIconUrl(day.iconCode)
    dailySection.append(element)
  })

}

const hour_formatter = Intl.DateTimeFormat(undefined, {hour: 'numeric'})

const hourSection = document.querySelector('[data-hour-section]')
const hourRowTemplate = document.getElementById('hour-row-template')
function renderHourlyWeather(hourly) {
  hourSection.innerHTML = ''
  hourly.forEach(hour => {
    const element = hourRowTemplate.content.cloneNode(true)
    //how to clone a template clones all children as well

    //set value to the element above parent is current element and I want to search the element above
    //setValue('temp', hour.temp, { parent: element})
    setValue('fl-temp', hour.feelsLike, {parent: element})
    setValue('wind', hour.windSpeed, {parent: element})
    setValue('precip', hour.precip, {parent: element})
    setValue('day', day_formatter.format(hour.timestamp), {parent: element})
    setValue('time', hour_formatter.format(hour.timestamp), {parent: element})
    element.querySelector('[data-icon]').src = getIconUrl(hour.iconCode)
    hourSection.append(element)
  })

} 

