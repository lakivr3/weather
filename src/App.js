import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d72b70990630bf2c70468684ccf4fa2f`;

  function searchLocation(event) {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          onKeyDown={searchLocation}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          value={location}
          type="text"
        ></input>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>
              {data.name}, {data.sys ? data.sys.country : null}
            </p>
          </div>
          <div className="temp">
            {data.main ? (
              <h1>{Math.floor(data.main.temp - 273.15)}°C</h1>
            ) : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p>Feels Like</p>
            {data.main ? (
              <p className="bold">
                {Math.floor(data.main.feels_like - 273.15)}°C
              </p>
            ) : null}
          </div>
          <div className="humidity">
            <p>Humidity</p>
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p className="bold"></p>
          </div>
          <div className="wind">
            <p>Wind</p>
            {data.wind ? <p className="bold">{data.wind.speed} KM/H</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
