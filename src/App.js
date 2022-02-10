import React from "react";
import './App.css';
import { DiasplaySide } from "./DiasplaySide";
import { Coniguration } from "./Coniguration";
import { API } from "./utility";
import axios from "axios";
import { useEffect, useState } from 'react';


function App() {
  // const location = useLocation()
 
  const id = +window.location.href.split("=")[1]
  //socket
  return (
      <div className='main flex flex-wrap mt-16 ml-16'>
        <Coniguration id={id}  />
        <DiasplaySide id={id} />
        <NamePlate id={id} />
    </div>
  );
}

const nameplate = [{value:"MVA",units:"MVA",sym:"lpow"},{value:"AMPERES",units:"A",sym:"rcurr"},{value:"LOAD VOLTAGE",units:"KV",sym:"lvol"},{value:"Oil Temp At Rated Load",units:"°C",sym:"toTemp"},{value:"FREQUENCY",units:"Hz",sym:"fq"}]

function NamePlate({id}){
  const [rating,setRating] = useState(undefined)
  useEffect(() => {
    axios.get(`${API}:${9000+id}/trafo/nameplate`)
      .then((data) => {
        setRating(data.data);
      });
  }, []);
  return(
    <div className="ml-4 md:ml-28 shadow-lg rounded-2xl" >
      <p className=" ml-16 md:mx-36 mt-4">Name plate</p>
      <hr />
      {nameplate.map((name,id)=>(<NamePlateTemp rating={rating} key={id} name={name} />))}
      <button className="border border-green-500 hover:text-white hover:bg-green-500 px-4 py-2 rounded-xl ml-36 mt-10" >Save</button>
    </div>
  )
}

function NamePlateTemp({name,rating}){
  let symbol = name.sym
  return(
    <div className="mt-10 mb-5 ml-5 flex">
        <p>{name.value}: </p>
        <input value = {rating?rating[symbol]:""} className="border-b-2 ml-2 w-36 focus:outline-none focus:border-b-blue-500" />
        {name.units}
    </div>
  )
}


export const Dividewithhun = value => ((+value)/100).toFixed(2)

export default App;



