import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';

export function Coniguration() {
  useEffect(() => {
    axios.get("http://192.168.214.128:9000/trafo")
      .then((data) => {
        console.log(data.data);
        setRegulation(data.data.regulation);
        setLoadPercentage(data.data.loadpercentage);
        setPort(data.data.port);
        data.data.automatic ? setAutomatic("yes") : setAutomatic("no");
      });
  }, []);

  const [regulation, setRegulation] = useState(5);
  const [port, setPort] = useState(50002);
  const [automatic, setAutomatic] = useState("yes");
  const [loadPercentage, setLoadPercentage] = useState("50");

  const [portErr, setPortErr] = useState(false);
  const [loadErr, setLoadErr] = useState(false);
  function checkInputValues() {
    let portResult = false;
    let loadResult = false;
    if (+port < 50000) { setPortErr(true); portResult = false; } else { setPortErr(false); portResult = true; }
    if (+loadPercentage > 0 && +loadPercentage < 100) { setLoadErr(false); loadResult = true; } else { setLoadErr(true); loadResult = false; }
    return portResult && loadResult ? true : false;
  }
  return (
    <>
      <div className='config'>
        <label className="block mb-2" for="username">
          Give the port:-
        </label>
        <input onChange={(event) => setPort(event.target.value)} style={{ width: "250px" }} value={port} className={`${portErr ? "mb-0" : "mb-10"} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 focus:shadow-outline`} type="text" placeholder="Port number above 50,000" />
        <br></br>
        <p className={`${portErr ? "block" : "hidden"} mb-8 text-red-500`}>Port Should be greater than 50,000</p>
        <label className="block text-gray-700  mb-2" for="username">
          Do you want to make it automatic:-
        </label>
        <select value={automatic} onChange={(event) => setAutomatic(event.target.value)} className='py-2 mb-14 pr-10 pl-2 border rounded leading-tight'>
          <option value={"no"}>No</option>
          <option value={"yes"}>Yes</option>
        </select>
        <label className="block mb-2" for="username">
          Give the percentage of load:-(0-100)
        </label>
        <input onChange={(event) => setLoadPercentage(event.target.value)} style={{ width: "250px" }} value={loadPercentage} className={`${loadErr ? "mb-0" : "mb-10"} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 focus:shadow-outline`} type="text" placeholder="load value in percentage" />
        <p className={`${loadErr ? "block" : "hidden"} mb-8 text-red-500`}>Give a valid load percentage</p>
        <div className="relative pt-1">
          <label for="customRange1" className="form-label">Voltage Regulation:-</label>
          <div className='flex'>
            <label>-10%</label>
            <label className='ml-auto'>12%</label>
          </div>
          <input
            onChange={(event) => setRegulation(event.target.value)}
            min="-10" max="12"
            type="range"
            value={regulation}
            className="form-range mb-4 appearance-none w-full h-2 p-0 bg-transparent bg-gray-100 rounded focus:outline-none focus:ring-0 focus:shadow-none" />
          <p className='mb-4'> Value: {regulation} %</p>

          <button
            style={{ marginLeft: "30%", marginBottom: "20%" }}
            onClick={() => {
              console.log("hello");
              checkInputValues() ? SendRequest(loadErr, regulation, loadPercentage, port, automatic, setAutomatic, setPort, setLoadPercentage, setRegulation) : console.log("unexpected error");
            }}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Run >
          </button>
        </div>
      </div>
    </>
  );
}


export function SendRequest(loadErr,regulation,loadPercentage,port,automatic,setAutomatic,setPort,setLoadPercentage,setRegulation){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      "regulation": regulation,
      "port": port,
      "automatic":automatic,
      "percentage": loadPercentage
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    fetch("http://192.168.214.128:9000/trafo", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }