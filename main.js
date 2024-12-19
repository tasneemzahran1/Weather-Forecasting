getWeather("Newark")
var response;
var alldays = [];
async function getWeather(city) {
    var x = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=54a065deece34cc1b0e180559241812&q=${city}&days=3`)
    if (x.ok) {
        response = await x.json()
        console.log(response)
        alldays = response.forecast.forecastday
        displayWeather()

    }
}
function displayWeather() {
    var cartoona = `<div class="col-md-4">
                    <div class="inner">
                        <div class="card bg-dark position-relative">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <p class="m-auto fw-bold text-white">${response.location.localtime}</p>
                            </div>
                            <div class="card-body bg-body-secondary ">
                                <blockquote class="blockquote mb-0">
                                    <img src="${response.current.condition.icon}"
                                        class="position-absolute top-50 end-0 me-5">

                                    <p class="fs-6">${response.location.name}</p>
                                    <p class="fs-1 fw-bolder">${response.current.temp_c}</p>
                                    <p>${response.current.condition.text}</p>

                                    <ul class="list-unstyled m-auto">
                                        <li class="me-3 text-secondary d-inline-block"><i
                                                class="me-2 fa-solid fa-umbrella"></i>${response.current.cloud}%</li>
                                        <li class="me-3 text-secondary d-inline-block"><i
                                                class="me-2 fa-solid fa-wind"></i>${response.current.wind_kph}km/h</li>
                                        <li class="me-3 text-secondary d-inline-block"><i
                                                class="me-2 fa-regular fa-compass"></i>${response.current.wind_dir}</li>
                                    </ul>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>`
    for (let i = 1; i < alldays.length; i++) {
        cartoona += `
                <div class="col-md-4">
                    <div class="inner">
                        <div class="card bg-dark">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <p class="m-auto fw-bold text-white">${alldays[i].date}</p>
                            </div>
                            <div class="card-body bg-body-secondary" style="height: 225px;">
                                <blockquote class="blockquote mb-0 text-center">
                                    <img src="${alldays[i].day.condition.icon}" class="mb-4">
                                    <p class="fs-3 fw-semibold text-dark">
                                        ${alldays[i].day.maxtemp_c}</p>
                                    <p class="fs-5 text-secondary">${alldays[i].day.mintemp_c}</p>
                                    <p class="fs-6 text-danger">${alldays[i].day.condition.text}
                                    </p>

                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>`


    }

    document.querySelector(".row").innerHTML = cartoona
}
document.querySelector("#find").addEventListener("click", function () {
    var location = document.querySelector("#location").value
    getWeather(location)
})
document.querySelector("#location").addEventListener("input", function () {
    var location = document.querySelector("#location").value
    getWeather(location)
})
