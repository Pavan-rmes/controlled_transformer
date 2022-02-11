import React, { useState } from "react";
import { CountryCodes, API } from "../utility";
import axios from "axios";

export function Location({ id }) {
  const [code, setCode] = useState("IN");
  const [zip, setZip] = useState(507002);
  setInterval(()=>{
    axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},${code}&appid=43aa700123b6e84a6be0c446132dd5fa`)
      .then(data => {
        axios.post(`${API}:${9000 + id}/trafo/ambtemp`, {
          ambTemp: (+(data.data.main.temp) - 273).toFixed(2)
        });
      });
  },1000*60)
  function getLocation() {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},${code}&appid=43aa700123b6e84a6be0c446132dd5fa`)
      .then(data => {
        axios.post(`${API}:${9000 + id}/trafo/ambtemp`, {
          ambTemp: (+(data.data.main.temp) - 273).toFixed(2)
        });
      });
  }
  return (
    <div className="flex gap-x-4 gap-y-4 ml-8 md:ml-20 flex-wrap items-center">
      <p>Location:</p>
      <select
        onChange={(e) => setCode(e.target.value)}
        className="border border-black mr-4 w-1/4 rounded">
        {CountryCodes.map((country, id) => (<option key={id} selected={country.code === "IN" ? true : false} value={country.code}>{country.name}</option>))}
      </select>
      <input
        onChange={(e) => setZip(e.target.value)}
        value={zip} className="outline-none border-b-2 focus:border-b-blue-500" placeholder="zipcode" />
      <button
        onClick={() => getLocation()}
        className="border border-green-500 hover:text-white hover:bg-green-500 rounded-xl px-4 ">Save</button>
    </div>
  );
}
