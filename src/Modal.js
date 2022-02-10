import React from "react";

export function Modal({ showModal, setShowModal,H2,setH2,C2H6,setC2H6,CH4,setCH4,C2H4,setC2H4,C2H2,setC2H2  }) {

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
                  <input
                  onChange={(e)=>setC2H2(e.target.value)}
                  value={C2H2} style={{ width: "250px" }} className="mb-5 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 focus:shadow-outline" type="text" placeholder="acetylene Value" />

                  <label className="block mb-2" for="username">
                    Give th CH4 Value:-
                  </label>
                  <input
                  onChange={(e)=>setCH4(e.target.value)}
                  value={CH4} style={{ width: "250px" }} className="mb-5 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 focus:shadow-outline" type="text" placeholder="methane Value" />

                  <label className="block mb-2" for="username">
                    Give th C2H4 Value:-
                  </label>
                  <input 
                  onChange={(e)=>setC2H4(e.target.value)}
                  value={C2H4} style={{ width: "250px" }} className="mb-5 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 focus:shadow-outline" type="text" placeholder="ethylene Value" />

                  <label className="block mb-2" for="username">
                    Give th H2 Value:-
                  </label>
                  <input
                  onChange={(e)=>setH2(e.target.value)}
                  value={H2} style={{ width: "250px" }} className="mb-5 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 focus:shadow-outline" type="text" placeholder="ethylene Value" />

                  <label className="block mb-2" for="username">
                    Give th C2H6 Value:-
                  </label>
                  <input
                  onChange={(e)=>setC2H6(e.target.value)}
                  value={C2H6} style={{ width: "250px" }} className="mb-5 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 focus:shadow-outline" type="text" placeholder="ethylene Value" />


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
