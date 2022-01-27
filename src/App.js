import React from "react";
import { useEffect, useState } from 'react';
import './App.css';
import socketIOClient from "socket.io-client";
import { DiasplaySide } from "./DiasplaySide";
import { Coniguration } from "./Coniguration";
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

export const Dividewithhun = value => ((+value)/100).toFixed(2)

export default App;
