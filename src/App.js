import React from "react";
import { useEffect, useState } from 'react';
import './App.css';
import tarfoImg from "./images/transformerModel1.jpg"
import DgaDeviceIMg from "./images/hydrocal.png"
import axios from 'axios';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://192.168.214.128:8000";


function App() {
  const [displayValues,setDisplayValues] = useState()
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setDisplayValues(data)
    });
    return () => socket.disconnect();
  }, []);
  return (
      <div className='main flex mt-16 ml-16'>
        <Coniguration />
        <DiasplaySide displayValues={displayValues} />
    </div>
  );
}


function Coniguration(){
  useEffect(()=>{
    axios.get("http://192.168.214.128:9000/trafo")
    .then((data)=>{
      console.log(data.data)
      setRegulation(data.data.regulation)
      setLoadPercentage(data.data.loadpercentage)
      setPort(data.data.port)
      data.data.automatic ?setAutomatic("yes"):setAutomatic("no")
    })
  },[])

  const [regulation,setRegulation] =useState(5)
  const [port ,setPort] =useState(50002)
  const [automatic,setAutomatic]  = useState("yes")
  const [loadPercentage,setLoadPercentage] = useState("50")

  const [portErr,setPortErr] = useState(false)
  const [loadErr, setLoadErr] = useState(false)
  function checkInputValues(){
    let portResult = false
    let loadResult = false
    if(+port <50000){setPortErr(true);portResult=false; }else{setPortErr(false);portResult=true}
    if(+loadPercentage>0 && +loadPercentage <100){setLoadErr(false);loadResult = true;}else{setLoadErr(true);loadResult = false}
    return portResult && loadResult?true:false
  }
  return(
    <>
      <div className='config'>
          <label className="block mb-2" for="username">
           Give the port:-
          </label>
          <input onChange={(event)=>setPort(event.target.value)} style={{width:"250px"}} value={port} className={`${portErr?"mb-0":"mb-10"} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 focus:shadow-outline`} type="text" placeholder="Port number above 50,000" />
          <br></br>
          <p className={`${portErr?"block":"hidden"} mb-8 text-red-500`}>Port Should be greater than 50,000</p>
          <label className="block text-gray-700  mb-2" for="username">
            Do you want to make it automatic:-
          </label> 
          <select value={automatic} onChange={(event)=>setAutomatic(event.target.value)} className='py-2 mb-14 pr-10 pl-2 border rounded leading-tight'>
            <option value={"no"}>No</option>
            <option value={"yes"}>Yes</option>
            </select>
            <label className="block mb-2" for="username">
            Give the percentage of load:-(0-100)
            </label>
          <input onChange={(event)=>setLoadPercentage(event.target.value)}  style={{width:"250px"}} value={loadPercentage} className={`${loadErr?"mb-0":"mb-10"} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 focus:shadow-outline`} type="text" placeholder="load value in percentage" />
          <p className={`${loadErr?"block":"hidden"} mb-8 text-red-500`}>Give a valid load percentage</p>
          <div className="relative pt-1">
          <label for="customRange1" className="form-label">Voltage Regulation:-</label>
          <div className='flex'>
              <label>-10%</label>
              <label className='ml-auto'>12%</label>
          </div>
          <input
            onChange={(event)=>setRegulation(event.target.value)}
            min="-10" max="12"
            type="range"
            value={regulation}
            className="form-range mb-4 appearance-none w-full h-2 p-0 bg-transparent bg-gray-100 rounded focus:outline-none focus:ring-0 focus:shadow-none"
          />
          <p className='mb-4'> Value: {regulation} %</p>

          <button 
          style={{marginLeft:"30%",marginBottom:"20%"}}
            onClick={()=>{
              console.log("hello")
              checkInputValues()?SendRequest(loadErr,regulation,loadPercentage,port,automatic,setAutomatic,setPort,setLoadPercentage,setRegulation):console.log("unexpected error")
            }}
           className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Run >
          </button>
          </div>
        </div>
    </>
  )
}

function SendRequest(loadErr,regulation,loadPercentage,port,automatic,setAutomatic,setPort,setLoadPercentage,setRegulation){
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


const Dividewithhun = value => ((+value)/100).toFixed(2)

function DiasplaySide({displayValues}){
  const [showModal, setShowModal] = React.useState(false);
  return(
    <>
      <div className='box-border'>
        <div className='flex'>
          <img className='tafoimg ml-96' src={tarfoImg} />
          <img onClick={() => setShowModal(true)} style={{width:"120px",height:"135px",marginTop:"280px",marginLeft:"-100px"}} className='cursor-pointer dga' src={DgaDeviceIMg} />
          <Modal showModal={showModal} setShowModal={setShowModal} />
        </div>
        <div className='display flex ml-56 mt-10 gap-x-56 gap-y-10 flex-wrap'>
          <div>
              <label>Top Oil Temp</label>
              <p style={{marginLeft:"40px"}}> 
                <label id="topOilDisplay"></label>{Dividewithhun(displayValues?.topOilTemp)} °C</p>
          </div>
          <div>
              <label>Winding Oil Temp</label>
              <p style={{marginLeft:"50px"}}>
                <label id="wndDisplay" ></label>{Dividewithhun(displayValues?.wndTemp)} °C</p>
          </div>
          <div>
              <label>Tap Position</label>
              <p style={{marginLeft:"40px"}}>
                  <label id="tapDisplay" ></label> {Dividewithhun(displayValues?.tapPosition)}
              </p>
          </div>
        </div>
        </div>
    </>
  )
}


function Modal({showModal,setShowModal}) {
  
  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Gases Values
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <label className="block mb-2" for="username">
                  Give th C2H2 Value:-
                </label>
                <input  style={{width:"250px"}}  className="mb-10 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 focus:shadow-outline" type="text" placeholder="acetylene Value" />

                <label className="block mb-2" for="username">
                  Give th CH4 Value:-
                </label>
                <input  style={{width:"250px"}}  className="mb-10 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 focus:shadow-outline" type="text" placeholder="methane Value" /> 

                <label className="block mb-2" for="username">
                  Give th C2H4 Value:-
                </label>
                <input  style={{width:"250px"}}  className="mb-10 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 focus:shadow-outline" type="text" placeholder="ethylene Value" /> 

                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default App;
