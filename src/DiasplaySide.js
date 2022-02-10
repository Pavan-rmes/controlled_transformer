import React from "react";
import { useEffect, useState } from 'react';
import tarfoImg from "./images/transformer.png";
import DgaDeviceIMg from "./images/hydrocal.png";
import { Modal } from "./Modal";
import { Dividewithhun } from "./App";
import { API } from "./utility";
import socketIOClient from "socket.io-client";
import axios from "axios";

export function DiasplaySide({id}) {

  useEffect(() => {
    const ENDPOINT = `${API}:${8000+id}`;
    console.log(ENDPOINT)
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setDisplayValues(data)
    });
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    axios.get(`${API}:${9000+id}/trafo`)
      .then((data) => {
        setH2(data.data.H2);setC2H6(data.data.C2H6);
        setCH4(data.data.CH4);setC2H4(data.data.C2H4);setC2H2(data.data.C2H2);
      });
  }, []);

  const [displayValues,setDisplayValues] = useState()
  const [H2,setH2] = useState("73.12")
  const [C2H6,setC2H6] = useState("1.07")
  const [CH4,setCH4] =  useState("0.12")
  const [C2H4,setC2H4] = useState("17.66")
  const [C2H2,setC2H2] = useState("0.04")
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <div className='box-border'>
        <div>
          <img className='tafoimg ml-96' src={tarfoImg} />
          <Modal 
          H2={H2} setH2={setH2} C2H6={C2H6} setC2H6={setC2H6}
          CH4={CH4} setCH4={setCH4} C2H4={C2H4} setC2H4={setC2H4}
          C2H2={C2H2} setC2H2={setC2H2}
          showModal={showModal} setShowModal={setShowModal} />
        </div>
        <div onClick={() => setShowModal(true)} className='cursor-pointer mt-8 ml-96 border w-20 pl-5 py-2 border-gray-500 hover:bg-gray-500 hover:text-white rounded-xl' >
            DGA
        </div>
        <div className='display flex ml-56 mt-10 gap-x-56 gap-y-10 flex-wrap'>
          <div>
            <label>Top Oil Temp</label>
            <p style={{ marginLeft: "40px" }}>
              <label id="topOilDisplay"></label>{Dividewithhun(displayValues?.topOilTemp)} °C</p>
          </div>
          <div>
            <label>Winding Oil Temp</label>
            <p style={{ marginLeft: "50px" }}>
              <label id="wndDisplay"></label>{Dividewithhun(displayValues?.wndTemp)} °C</p>
          </div>
          <div>
            <label>Tap Position</label>
            <p style={{ marginLeft: "40px" }}>
              <label id="tapDisplay"></label> {Dividewithhun(displayValues?.tapPosition)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
