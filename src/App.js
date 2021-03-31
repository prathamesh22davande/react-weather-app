import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

import cloudy from "./images/cloudy.jpg";

function App() {
  const [text, setText] = useState("");
  const [city, setCity] = useState("ichalkaranji");
  const [data, setData] = useState(0);
  const [location, setLocation] = useState({
    lat: 16.6886,
    lon: 74.4593,
  });
  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://api.openweathermap.org/data/2.5/weather?lat=" +
  //         location.lat +
  //         "&lon=" +
  //         location.lon +
  //         "&appid=923aed81035e9578514d169ddfd34e5c"
  //     )
  //     .then((fetchedData) => {
  //       console.log(fetchedData);
  //       setData(fetchedData);
  //     })
  //     .catch((e) => {
  //       console.log("Error occured" + e);
  //     });
  // }, [location]);

  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&appid=923aed81035e9578514d169ddfd34e5c"
      )
      .then((fetchedData) => {
        console.log(fetchedData);
        setData(fetchedData);
      })
      .catch((e) => {
        console.log("error occured" + e);
      });
  }, [city]);

  if (data) {
    console.log(parseFloat(data.data.main.temp) - 273.15);
  }

  return (
    <div className="App">
      <main>
        <h1>Weather</h1>
        <div>
          <input
            className="input-city"
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button
            className="search-btn"
            onClick={() => {
              console.log(text);
              setCity(text);
            }}
          >
            Search
          </button>
        </div>
        <div>
          {data ? (
            <>
              <h1 className="weather-data">
                {(parseFloat(data.data.main.temp) - 273.15).toFixed(2)}°
              </h1>
              <h2>{data.data.name}</h2>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
