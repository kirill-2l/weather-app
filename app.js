'use strict';

document.addEventListener('DOMContentLoaded', () => {

  let long,
      lat,
      languageBlock = document.querySelector('.language__list'),
      locationTimeZone = document.querySelector('.location__timezone'),
      locationIcon = document.querySelector('.location__icon'),
      temperatureDegree = document.querySelector('.temperature__degree-num'),
      temperatureDescr = document.querySelector('.temperature__degree-descr'),
      temperatureItem = document.querySelector('.temperature__degree'),
      temperatureSpan = document.querySelector('.temperature__degree-quantity');


      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          long = position.coords.longitude;
          lat = position.coords.latitude;

          const proxy = 'https://cors-anywhere.herokuapp.com/',
                 api = `${proxy}https://api.darksky.net/forecast/8b37aea0083f05e205ae6dd67a2ce54d/${lat},${long}?lang=ru`;

          fetch(api)
            .then(response => {
              return response.json();
            })
            .then(data => {
              const {temperature, summary, icon} = data.currently;
              // set DOM elements from API
              temperatureDegree.textContent = temperature;
              temperatureDescr.textContent = summary;
              locationTimeZone.textContent = data.timezone;

              let celsius = (temperature - 32) * (5/9);
              //set icons
              setIcons(icon, locationIcon);

              //set Celsius/ farenheit
              temperatureItem.addEventListener('click', () => {
                console.log(temperatureSpan.textContent);
                if (temperatureSpan.textContent === "F") {
                  temperatureSpan.textContent = "C";
                  temperatureDegree.textContent = Math.floor(celsius);
                } else {
                  temperatureSpan.textContent = "F";
                  temperatureDegree.textContent = temperature;
                }
              });
            })

        });



      }

      function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
      }

});
