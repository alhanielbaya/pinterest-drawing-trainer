import React, { useState } from "react";
import "./App.css";
import ImageP from "./Images/ImageP";

function App() {
  const [playing, setPlaying] = useState(false);
  const [targetImages, setTargetImages] = useState(50);
  const [secEachPic, setSecEachPic] = useState(180);

  const savedImg = localStorage.getItem("images");

  const buttonClass = `text-sm text-black w-28 antialiased font-sans bg-zinc-200 hover:bg-red-200 font-bold py-2 px-2  rounded h-12`;
  const buttonDisabled = buttonClass + " opacity-50 cursor-not-allowed";

  function handleNewImages() {
    localStorage.removeItem("images");
    setPlaying(true);
  }

  return playing ? (
    <ImageP
      numImages={targetImages}
      interval={secEachPic}
      setPlaying={setPlaying}
    ></ImageP>
  ) : (
    <div className="flex flex-row min-h-screen justify-center items-center bg-gray-900">
      <div className="flex flex-col">
        <form className="w-full max-w-sm">
          <div className="flex items-center flex-wrap mb-6">
            <div className="w-20">
              <input
                className="h-8 pl-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="number"
                value={targetImages}
                min={10}
                max={200}
                onChange={(e) => {
                  setTargetImages(parseInt(e.target.value));
                }}
              />
            </div>
            <div className="w-20">
              <label
                className="block text-white font-bold md:text-left mb-1 md:mb-0 pl-2"
                htmlFor="inline-full-name"
              >
                Pictures
              </label>
            </div>
          </div>
          <div className="flex items-center flex-wrap mb-6">
            <div className="w-20">
              <input
                className="h-8 pl-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-password"
                type="number"
                value={secEachPic}
                min={10}
                max={72000}
                onChange={(e) => {
                  setSecEachPic(parseInt(e.target.value));
                }}
              />
            </div>
            <div className="w-40">
              <label
                className="block text-white font-bold text-left mb-1 md:mb-0 pl-2"
                htmlFor="inline-password"
              >
                Time Interval in Seconds
              </label>
            </div>
          </div>

          <div className="flex flex-col items-start justify-around h-28">
            <button onClick={handleNewImages} className={buttonClass}>
              NEW IMAGES
            </button>

            <button
              onClick={() => setPlaying(true)}
              className={savedImg ? buttonClass : buttonDisabled}
              disabled={savedImg ? false : true}
            >
              LOAD IMAGES
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
