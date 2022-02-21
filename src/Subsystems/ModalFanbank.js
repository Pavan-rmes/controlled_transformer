import axios from "axios";
import React, { useContext } from "react";
import { context } from "../App";
import { API } from "../utility";

export function ModalFanbank({showFanModal, setShowFanModal,id}) {
  const[Fb1Status,setFB1Status] = React.useState(false)
  const [Fb2Status,setFB2Status] = React.useState(true)
  const value = useContext(context)
  React.useEffect(() => {
    axios.get(`${API}:${9000+id}/trafo/fanbank`)
      .then((data) => {
        console.log(data.data)
        setFB1Status(data.data.Fb1status)
        setFB2Status(data.data.Fb2status)
      });
  }, [value.status,value.runstatus]);

  function updateFanBank(){
    axios.post(`${API}:${9000+id}/trafo/fanbank`,{Fb1Status,Fb2Status})
    .then((data)=>console.log(data))
  }
    // console.log(showFanModal)
  return (
    <>
      {showFanModal ? (
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
                    Fan Bank Manual Control
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowFanModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div>
                <ToggleComp index="toogleA" name="Fan Bank1" status={Fb1Status} setStatus={setFB1Status} />
                <ToggleComp index="toogleB" name="Fan Bank2" status={Fb2Status} setStatus={setFB2Status} />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowFanModal(false)}
                  >
                    Close
                  </button>
                  <button
                    onClick={()=>{updateFanBank();setShowFanModal(false)}}
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
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


function ToggleComp(props){
  return(
    <div class="flex items-center justify-center w-full my-5">
  <label 
    for={props.index}
    class="flex items-center cursor-pointer"
  >
    <div class="relative">
      <input
      onClick={()=>props.setStatus(!props.status)}
      id={props?.index} type="checkbox" class="sr-only" />
      <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
      <div class={`${props.status?"translate-x-full bg-green-500":""} absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition`}></div>
    </div>
    <div class="ml-3 text-gray-700 font-medium">
      {props.name}
    </div>
  </label>
  
</div>
  )
}
