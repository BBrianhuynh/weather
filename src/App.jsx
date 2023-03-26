import { useState,useEffect } from 'react'
import './App.css'
const API_KEY = import.meta.env.VITE_APP_API_KEY;
var city = "San Jose";
var cityName = "";
var cityStateCountry = "";
var citySunrise = "";
var citySunset = "";
var isDate = true;
var isTime = true;
var isTemp = true;

function App() {
  var [searchAnswer, setSearchAnswer] = useState("");
  const [data, setData] = useState([]);
  var categories = ["Date", "Time", "Temp"];
  useEffect(() => {
      fetch(`https://api.weatherbit.io/v2.0/current?&city=${city}&key=9f79c9596a3d476282582a410c46a516&include=minutely`)
      .then((response) =>response.json())
      .then((data) => {
        console.log(data.minutely[0].timestamp_local);
        cityName = "" + data.data[0].city_name;
        cityStateCountry = "" +data.data[0].country_code +", " + data.data[0].state_code;
        citySunrise = "" + data.data[0].sunrise;
        citySunset = "" + data.data[0].sunset;
        setData(data.minutely);
        console.log(data.minutely);
      })
      .catch((err) => {console.log(err.message);})
  },[]);
  const answerSubmit = (event) => {
    isDate = false;
    isTemp = false;
    isTime = false;
    // Get input value from "event"
    setSearchAnswer(searchAnswer = event.target.value);
    if (searchAnswer.length == 0)
    {
      categories = ["Date", "Time", "Temp"];
      for (var i = 0; i < categories.length; i++)
    {
      if (categories[i].indexOf("Date") == 0)
      {
        isDate = true;
      }
      if (categories[i].indexOf("Time") == 0)
      {
        isTime = true;
      }
      if (categories[i].indexOf("Temp") == 0)
      {
        isTemp = true;
      }
    }
      return;
    }
    var newTemp = categories.filter((category) => category.indexOf(searchAnswer) == 0);
    categories = newTemp;
    for (var i = 0; i < categories.length; i++)
    {
      if (categories[i].indexOf("Date") == 0)
      {
        isDate = true;
      }
      if (categories[i].indexOf("Time") == 0)
      {
        isTime = true;
      }
      if (categories[i].indexOf("Temp") == 0)
      {
        isTemp = true;
      }
    }
    console.log(categories);
    return;
  };
  return (
    <div className="App">
      <div className = "Side Menu">
      </div>
      <div className = "topBox">
      <div className = "boxOne">
        <p>{cityName}</p>
        <p>{cityStateCountry}</p>
      </div>
      <div className = "boxTwo">
        <p>Sunrise: {citySunrise}</p>
        <p>Sunset: {citySunset}</p>
      </div>
      <div className = "boxThree">
      <input type="text" onChange={(e) => {answerSubmit(e)}} placeholder="Filter by Category..."></input>
      </div>
      </div>
      <div className = "mainBox">
      <table>
        <tr>
          <th>{isDate && <p>Date</p>}</th>
          <th>{isTime && <p>Time</p>}</th>
          <th>{isTemp && <p>Temp</p>}</th>
        </tr>
        <tr>
          <td>{isDate && data.map((locationData) => {
         return (
            <div className="post-card" key={locationData}>
              <p className="post-body">{locationData.timestamp_local.substring(0,10)}</p>
            </div>
         );
      })}</td>
          <td>{isTime && data.map((locationData) => {
         return (
            <div className="post-card" key={locationData}>
              <p className="post-body">{((parseInt(locationData.timestamp_local.substring(11,13))+11) % 12 +1)+ "" +locationData.timestamp_local.substring(13,16)}</p>
            </div>
         );
      })}</td>
          <td>{isTemp && data.map((locationData) => {
         return (
            <div className="post-card" key={locationData}>
              <p className="post-body">{Math.round((locationData.temp * (9/5) + 32)*10)/10}</p>
            </div>
         );
      })}</td>
        </tr>
      </table>
      </div>
    </div>
  )
}

export default App
