import { useState, useEffect } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import '../App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;
var city = "San Jose";
var cityName = "";
var cityStateCountry = "";
var citySunrise = "";
var citySunset = "";
var isDate = true;
var isTime = true;
var isTemp = true;
var chart = [];
var isRender = false;
var number = 0;
function App() {
  var [searchAnswer, setSearchAnswer] = useState("");
  const [data, setData] = useState([]);
  const [temp, setTemp] = useState([]);
  const [time, setTime] = useState([]);
  var categories = ["Date", "Time", "Temp"];
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.weatherbit.io/v2.0/current?&city=${city}&key=9f79c9596a3d476282582a410c46a516&include=minutely`);
      const data = await response.json();
      cityName = "" + data.data[0].city_name;
      cityStateCountry = "" + data.data[0].country_code + ", " + data.data[0].state_code;
      citySunrise = "" + data.data[0].sunrise;
      citySunset = "" + data.data[0].sunset;
      setData(data.minutely);
      for (var i = 0; i < data.minutely.length; i++)
      {
        temp.push(((((parseInt(data.minutely[i].temp))* (9 / 5) + 32) * 10) / 10));
        time.push(((parseInt(data.minutely[i].timestamp_local.substring(11, 13)) + 11) % 12 + 1) + "" + data.minutely[i].timestamp_local.substring(13, 16))
      }
      for (var i = 0; i < data.minutely.length; i++)
      {
        chart.push({t: time[i], te: temp[i]});
      }
      console.log(chart);
      isRender = true;
    }
    fetchData().catch(console.error);
  }, []);
  const handleClick = (event) => {
    isDate = false;
    isTime = false;
    isTemp = false;
    if (event.target.innerText === "Date")
    {
      isDate = true;
    }
    if (event.target.innerText === "Time")
    {
      isTime = true;
    }
    if (event.target.innerText === "Temp")
    {
      isTemp = true;
    }
    return;
  };
  const answerSubmit = (event) => {
    isDate = false;
    isTemp = false;
    isTime = false;
    // Get input value from "event"
    setSearchAnswer(searchAnswer = event.target.value);
    if (searchAnswer.length == 0) {
      categories = ["Date", "Time", "Temp"];
      for (var i = 0; i < categories.length; i++) {
        if (categories[i].indexOf("Date") == 0) {
          isDate = true;
        }
        if (categories[i].indexOf("Time") == 0) {
          isTime = true;
        }
        if (categories[i].indexOf("Temp") == 0) {
          isTemp = true;
        }
      }
      return;
    }
    var newTemp = categories.filter((category) => category.indexOf(searchAnswer) == 0);
    categories = newTemp;
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].indexOf("Date") == 0) {
        isDate = true;
      }
      if (categories[i].indexOf("Time") == 0) {
        isTime = true;
      }
      if (categories[i].indexOf("Temp") == 0) {
        isTemp = true;
      }
    }
    return;
  };
  const setNum = (index) =>
  {
    number = index;
  }
  const renderLineChart = ( <LineChart width={400} height={400} data={chart}><Line type="monotone" dataKey="te" stroke="#8884d8" /><XAxis dataKey="t" /><YAxis dataKey="te"/></LineChart>);
  return (
    <div className="App">
      <div className="Side Menu">
      </div>
      <div className="topBox">
        <div className="boxOne">
          <p>{cityName}</p>
          <p>{cityStateCountry}</p>
        </div>
        <div className="boxTwo">
          <p>Sunrise: {citySunrise}</p>
          <p>Sunset: {citySunset}</p>
        </div>
        <div className="boxThree">
          <input type="text" onChange={(e) => { answerSubmit(e) }} placeholder="Filter by Category..."></input>
          {isRender && renderLineChart}
        </div>
      </div>
      <div className="mainBox">
        <table>
          <tr>
            <th>{isDate && <button onClick={(e) => {handleClick(e)}}>Date</button>}</th>
            <th>{isTime && <button onClick={handleClick}>Time</button>}</th>
            <th>{isTemp && <button onClick={handleClick}>Temp</button>}</th>
            <th><p>Extra Details</p></th>
          </tr>
          <tr>
            <td>{isDate && data.map((locationData) => {
              return (
                <div className="post-card" key={locationData}>
                  <p className="post-body">{locationData.timestamp_local.substring(0, 10)}</p>
                </div>
              );
            })}</td>
            <td>{isTime && data.map((locationData) => {
              return (
                <div className="post-card" key={locationData}>
                  <p className="post-body">{((parseInt(locationData.timestamp_local.substring(11, 13)) + 11) % 12 + 1) + "" + locationData.timestamp_local.substring(13, 16)}</p>
                </div>
              );
            })}</td>
            <td>{isTemp && data.map((locationData) => {
              return (
                <div className="post-card" key={locationData}>
                  <p className="post-body">{Math.round((locationData.temp * (9 / 5) + 32) * 10) / 10}</p>
                </div>
              );
            })}</td>
            <td>{data.map((locationData, index)=> {
              return (
                <div>
                <Link to="/extraDetails" ><button className = "Button"onClick={setNum(locationData)}>...</button></Link>
                </div>
              )
            })}
            </td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default App
export {number};
