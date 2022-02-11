import React,{useEffect} from "react";
import './App.css';
import { DiasplaySide } from "./components/DiasplaySide";
import { Coniguration } from "./components/Coniguration";
import { NamePlate } from "./components/NamePlate";
import { Location } from "./components/Location";
import {Login} from "./components/Login"
import { Redirect, Route, Switch } from "react-router-dom";
import {AuthRoute} from "./Authroute"
import tarfoImg from "./images/transformerModel1.jpg";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  // const location = useLocation()
  const id = +window.location.href.split("=")[1]
  //socket
  return (
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <AuthRoute path="/trafo/:id">
              <Transformer id={id} />
          </AuthRoute>
          <AuthRoute path="/trafo">
            <Assets />
          </AuthRoute>
          <Redirect from="/" to="/login" />
        </Switch>
      </div>
  );
}

const assetData=[{name:"Transformer-1",port:0},{name:"Transformer-2",port:2},{name:"Transformer-3",port:3},{name:"Transformer-4",port:4}]

function Assets(){
  return(
    <div className=" md:ml-20 flex gap-x-20 flex-wrap gap-y-10">
      {assetData.map((asset,id)=>(<AssetTemp key={id} asset={asset} /> ))}
    </div>
  )
}
function AssetTemp({asset}){
  const history = useHistory()
  return(
    <div
    onClick={()=>(history.push(`/trafo/${asset.port}`))}
    className="flex cursor-pointer flex-col">
      <img className="w-32" src={tarfoImg} />
      <p>{asset.name}</p>
    </div>
  )
}

function Transformer(){
  let {id} = useParams();id = +id
  const history = useHistory()
  return(
    <>
      <div>
        <button 
        onClick={()=>history.push("/trafo")}
        className="mt-5 md:ml-5 text-3xl border border-blue-500 rounded-full px-2 bg-blue-500 text-white "> &lt; </button>
      </div>
      <Location id = {id} />
        <hr className="mt-16 md:mx-20" />
        <div className='main flex flex-wrap mt-16 ml-4 md:ml-16'>
        <Coniguration id={id}  />
        <DiasplaySide id={id} />
        <NamePlate id={id} />
      </div>
    </>
  )
}


export default App;



