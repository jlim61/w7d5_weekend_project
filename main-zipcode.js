//  Get Table Body and Forms from HTML
const myBody = document.querySelector('#weatherBody')
const myForm = document.querySelector('#search-bar')
let cityCountryLabel = document.querySelector('#location-text')
let highTemp = document.querySelector('#high-temp-value')
let lowTemp = document.querySelector('#low-temp-value')
let forecast = document.querySelector('#forecast-value')
let humidity = document.querySelector('#humidity-value')

// add event listener
myForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    // grab entered city after submit
    const enterZipzode = document.querySelector('#enter-city-zipzode').value
    console.log(enterZipzode)

    // grab coordinates
    let { cityLatitude, cityLongitude } = await getCityCoordinates(enterZipzode)

    // get city weather data
    getCityWeatherData(cityLatitude, cityLongitude)
})

//===========================================================================================================================================================================
// Get City Coordinates for API Call Function

async function getCityCoordinates (zipcode) {
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode}&appid=${openWeatherApiId}`, {
        method: "GET"
    })
    if (res.ok) {
        const cityCoordinatesData = await res.json()
        console.log(cityCoordinatesData, 'my city coordinates')
        cityCountryLabel.innerHTML = `${cityCoordinatesData.name} ${cityCoordinatesData.zip}, ${cityCoordinatesData.country}`
        let cityLatitude = cityCoordinatesData.lat
        let cityLongitude = cityCoordinatesData.lon
        console.log(cityLatitude, cityLongitude)
        return { cityLatitude, cityLongitude }
    } else window.alert('Bad Request')
}

//===========================================================================================================================================================================
// Use Coordinates to get Weather Data

async function getCityWeatherData (lat, lon) {
    const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${openWeatherApiId}`, {
        method: "GET"
    })
    if (res.ok) {
        const weatherData = await res.json()
        console.log(weatherData, 'my test data')
        let weatherHighKelvin = weatherData.daily[0].temp.max
        let weatherHighFarenheit = ((weatherHighKelvin-273.15) * 9/5 + 32).toFixed(2)
        let weatherLowKelvin = weatherData.daily[0].temp.min
        let weatherLowFarenheit = ((weatherLowKelvin-273.15) * 9/5 + 32 ).toFixed(2)
        highTemp.innerHTML = weatherHighFarenheit + ' ' + '° Fahrenheit'
        lowTemp.innerHTML = weatherLowFarenheit + ' ' + '° Fahrenheit'
        forecast.innerHTML = weatherData.daily[0].weather[0].main
        humidity.innerHTML = weatherData.daily[0].humidity+'%'
        if (forecast.innerHTML.toLowerCase() === 'clouds') {
            myBody.style.backgroundImage = 'url(./static/images/clouds.jpg)'
            myBody.style.backgroundSize = 'cover'
            myBody.style.backgroundRepeat = 'no-repeat'
        } else if (forecast.innerHTML.toLowerCase() === 'clear') {
            myBody.style.backgroundImage = 'url(./static/images/sunny.jpg)';
            myBody.style.backgroundSize = 'cover'
            myBody.style.backgroundRepeat = 'no-repeat'
        } else if (forecast.innerHTML.toLowerCase() === 'thunderstorm') {
            myBody.style.backgroundImage = 'url(./static/thunderstorm/sunny.jpg)'
            myBody.style.backgroundSize = 'cover'
            myBody.style.backgroundRepeat = 'no-repeat'
        } else if (forecast.innerHTML.toLowerCase() === 'drizzle') {
            myBody.style.backgroundImage = 'url(./static/images/drizzle.jpg)'
            myBody.style.backgroundSize = 'cover'
            myBody.style.backgroundRepeat = 'no-repeat'
        } else if (forecast.innerHTML.toLowerCase() === 'rain') {
            myBody.style.backgroundImage = 'url(./static/images/rain.jpg)'
            myBody.style.backgroundSize = 'cover'
            myBody.style.backgroundRepeat = 'no-repeat'
        } else if (forecast.innerHTML.toLowerCase() === 'snow') {
            myBody.style.backgroundImage = 'url(./static/images/snow.jpg)'
            myBody.style.backgroundSize = 'cover'
            myBody.style.backgroundRepeat = 'no-repeat'
        }
    } else window.alert('Bad Request')
}


//===========================================================================================================================================================================
// Testing

// async function getCityCoordinates (zipcode) {
//     const res = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode}&appid=${openWeatherApiId}`, {
//         method: "GET"
//     })
//     if (res.ok) {
//         const cityCoordinatesData = await res.json()
//         console.log(cityCoordinatesData, 'my city coordinates')
//     } else window.alert('Bad Request')
// }

// console.log(getCityCoordinates(92024))

// async function testFunc (lat, lon) {
//     const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${openWeatherApiId}`, {
//         method: "GET"
//     })
//     const testData = await res.json()
//     console.log(testData, 'my test data')
// }

// console.log(testFunc(41.8755616, -87.6244212), 'trying to fun function')

// console.log(openWeatherApiId)