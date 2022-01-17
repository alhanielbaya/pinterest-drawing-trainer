import { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import ImageLoading from "./ImageLoading";
import Timer from "./Timer";

export interface Prop {
  numImages: number;
  interval: number;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Image {
  src: string;
  height: number;
  width: number;
  srcset: Array<string>;
}

function ImageP({ numImages, interval, setPlaying }: Prop) {
  const [images, setImages] = useState<Array<Image>>([]);
  const [currImgInd, setCurrImgInd] = useState(0);
  const [change, setChange] = useState(true);
  const [stop, setStop] = useState(false);
  const currImg = images[currImgInd];

  const fetchImageUrls = useCallback(async () => {
    const response = await Axios(
      `http://localhost:4000/images?numImages=${numImages}`
    );
    setImages(response.data.slice(0, numImages));
  }, [numImages]);

  useEffect(() => {
    const savedImgs = localStorage.getItem("images");
    if (savedImgs) {
      setImages(JSON.parse(savedImgs));
    } else {
      fetchImageUrls().catch(() => {
        alert("Something went wrong. Try again later");
        setPlaying(false);
      });
    }
  }, [fetchImageUrls, setPlaying]);

  useEffect(() => {
    if (images.length > 10) {
      localStorage.setItem("images", JSON.stringify(images));
    }
  }, [images]);

  useEffect(() => {
    if (!currImg) {
      setStop(true);
    } else {
      setStop(false);
    }
  }, [currImgInd, currImg]);

  function handleNext() {
    handlePicture(true);
    setChange(true);
  }
  function handlePrev() {
    // console.log("called prev");
    handlePicture(false);
    setChange(true);
  }
  const handleChange = (change: boolean) => {
    setChange(change);
  };

  function handlePicture(n: boolean) {
    if (n === true) {
      setCurrImgInd(currImgInd + 1);
    } else {
      setCurrImgInd(currImgInd - 1);
    }
  }

  const buttonClass =
    "md:mx-4 md:px-6 md:text-2xl mx-2 bg-transparent   text-white font-semibold hover:text-white py-2 px-4 border rounded";

  const buttonDisabled = buttonClass + " opacity-50 cursor-not-allowed";

  function temp() {
    return (
      <>
        <div
          className="fixed"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, 0)",
          }}
        >
          <Timer
            handlePicture={handlePicture}
            interval={interval}
            change={change}
            handleChange={handleChange}
            stop={stop}
          />
        </div>
        <div className="bg-gray-900">
          <div
            className={`container mx-auto pt-12 flex flex-col items-center justify-start h-screen`}
          >
            {currImg ? (
              <div
                className="flex flex-col items-center justify-center"
                style={{
                  width: "auto",
                  height: "83.33333%",
                }}
              >
                <img
                  className={``}
                  src={currImg.srcset[3]}
                  style={{
                    display: "block",
                    width: "auto",
                    height: "auto",
                    maxHeight: "100%",
                  }}
                  alt=""
                />
              </div>
            ) : (
              <h1
                className="absolute text-white text-center font-bold text-2xl md:text-4xl "
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  lineHeight: "30px",
                  wordBreak: "keep-all",
                  maxWidth: "17rem",
                }}
              >
                Nothing Left!
              </h1>
            )}
          </div>
          <div className="flex items-center justify-center fixed bottom-0 h-20 w-full bg-black-600/75">
            <div className="flex items-center md:w-200">
              <button
                className={currImgInd - 1 < 0 ? buttonDisabled : buttonClass}
                disabled={currImgInd - 1 < 0}
                onClick={handlePrev}
              >
                PREV
              </button>
              <button className={buttonClass} onClick={() => setPlaying(false)}>
                STOP
              </button>
              <button
                className={currImg ? buttonClass : buttonDisabled}
                disabled={currImg ? false : true}
                onClick={handleNext}
              >
                NEXT
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return images.length > 0 ? temp() : <ImageLoading></ImageLoading>;
}

export default ImageP;
