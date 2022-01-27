import React from "react";
import tarfoImg from "./images/transformerModel1.jpg";
import DgaDeviceIMg from "./images/hydrocal.png";
import { Modal } from "./Modal";
import { Dividewithhun } from "./App";

export function DiasplaySide({ displayValues }) {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <div className='box-border'>
        <div className='flex'>
          <img className='tafoimg ml-96' src={tarfoImg} />
          <img onClick={() => setShowModal(true)} style={{ width: "120px", height: "135px", marginTop: "280px", marginLeft: "-100px" }} className='cursor-pointer dga' src={DgaDeviceIMg} />
          <Modal showModal={showModal} setShowModal={setShowModal} />
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
