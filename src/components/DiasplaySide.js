import React from "react";
import { useEffect, useState } from 'react';
import tarfoImg from "../images/transformer3.png";
// import DgaDeviceIMg from "./images/hydrocal.png";
import { ModalDga } from "../Subsystems/ModalDga";
import {ModalFanbank} from "../Subsystems/ModalFanbank"
import {ModalBushing} from "../Subsystems/ModalBushing"
import { API } from "../utility";
import socketIOClient from "socket.io-client";
import axios from "axios";


export const Dividewithhun = value => ((+value)/100).toFixed(2)

export function DiasplaySide({id}) {

  useEffect(() => {
    axios.get(`${API}:${9000+id}/trafo`)
      .then((data) => {
        setH2(data.data.H2);setC2H6(data.data.C2H6);
        setCH4(data.data.CH4);setC2H4(data.data.C2H4);setC2H2(data.data.C2H2);
      });
  }, []);

  useEffect(() => {
    const ENDPOINT = `${API}:${8000+id}`;
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setDisplayValues(data)
    });
    return () => socket.disconnect();
  }, []);
  const [displayValues,setDisplayValues] = useState()
  const [H2,setH2] = useState("73.12")
  const [C2H6,setC2H6] = useState("1.07")
  const [CH4,setCH4] =  useState("0.12")
  const [C2H4,setC2H4] = useState("17.66")
  const [C2H2,setC2H2] = useState("0.04")
  const [Fb1Status,setFb1Status] = React.useState(false)
  const [showDgaModal, setShowDgaModal] = React.useState(false);
  const [showFanModal, setShowFanModal] = React.useState(false);
  const [showBushModal, setShowBushModal] = React.useState(false);
  return (
    <>
      <div className='box-border mr-2 relative md:ml-4 mt-32 shadow-lg mr-5 rounded-2xl md:pr-2'>
        <div>
          <img className='tafoimg w-56 mt-14 md:mt-0 md:w-96 md:ml-32' src={tarfoImg} />
          <ModalDga 
          H2={H2} setH2={setH2} C2H6={C2H6} setC2H6={setC2H6}
          CH4={CH4} setCH4={setCH4} C2H4={C2H4} setC2H4={setC2H4}
          C2H2={C2H2} setC2H2={setC2H2} id= {id}
          showDgaModal={showDgaModal} setShowDgaModal={setShowDgaModal} />
          <ModalFanbank setShowFanModal={setShowFanModal} showFanModal={showFanModal} id={id} />
          <ModalBushing setShowBushModal={setShowBushModal} showBushModal={showBushModal} id={id} />
        </div>
        <div onClick={() => setShowDgaModal(true)} className='cursor-pointer top-24 md:top-28 md:left-12 absolute border w-20 pl-5 border-gray-500 hover:bg-gray-500 hover:text-white rounded-xl' >
            DGA
        </div>
        <div onClick={() => setShowBushModal(true)} className='cursor-pointer top-0 right-4  absolute border w-24 pl-5 border-gray-500 hover:bg-gray-500 hover:text-white rounded-xl' >
            Bushing
        </div>
        <div onClick={() => setShowFanModal(true)} className='cursor-pointer top-48 right-4  absolute border w-24 pl-5 border-gray-500 hover:bg-gray-500 hover:text-white rounded-xl' >
            Fan Bank
        </div>
        <div className='display flex md:mx-20 mt-10 gap-x-20  gap-y-10 flex-wrap'>
          <div>
            <label>Top Oil Temp</label>
            <p style={{ marginLeft: "35px" }}>
              <label id="topOilDisplay"></label>{Dividewithhun(displayValues?.topOilTemp)} °C</p>
          </div>
          <div>
            <label>Winding Oil Temp</label>
            <p style={{ marginLeft: "40px" }}>
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
