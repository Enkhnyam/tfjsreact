import React, { useState, useRef, useEffect } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import styles from "./Implementation.module.css";

export default function Implementation () {

    const [model, setModel] = useState();
    const canvas = useRef();
    const webcamRef = useRef();
    let ctx = null;
    const [videoWidth, setVideoWidth] = useState(1280);
    const [videoHeight, setVideoHeight] = useState(640);
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "environment"
    }

    async function loadModel() {
        try {

            // load the model
            const model = await cocoSsd.load();
            setModel(model)
        } catch(e) {
            console.log("error", e);
        }
          

    }

    async function getCocossdData () {
        //Clear the canvas for each prediction
        var cnvs = document.getElementById("canvas");
        var ctx = cnvs.getContext("2d");
        ctx.clearRect(0,0, webcamRef.current.video.videoWidth,webcamRef.current.video.videoHeight);
            // classify the image
            const predictions = await model.detect(document.getElementById("img"));
            console.log("Predictions: ");
            console.log(predictions);
            for (var n = 0; n < predictions.length; n++) {
                let bboxLeft = predictions[n].bbox[0];
                let bboxTop = predictions[n].bbox[1];
                let bboxWidth = predictions[n].bbox[2];
                let bboxHeight = predictions[n].bbox[3] - bboxTop;
                console.log("bboxLeft: " + bboxLeft);
                console.log("bboxTop: " + bboxTop);
                console.log("bboxWidth: " + bboxWidth);
                console.log("bboxHeight: " + bboxHeight);
                ctx.font = "30px Arial";
                ctx.fillText(
                    predictions[n].class + " " + predictions[n].score*100,
                    bboxLeft,
                    bboxTop
                )
                ctx.beginPath()
                ctx.rect(bboxLeft, bboxTop, bboxWidth, bboxHeight);
                // ctx.rect(100, 100, 100, 100)
                ctx.strokeStyle = "#FF0000";
                ctx.lineWidth = 3;
                ctx.stroke()
            }
    }

    
  const drawRectangle = () => {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 30, 110, 90);
    ctx.strokeRect(170, 65, 100, 80);
  };

      useEffect(() => {
         // dynamically assign the width and height to canvas
         const canvasEle = canvas.current;
         canvasEle.width = canvasEle.clientWidth;
         canvasEle.height = canvasEle.clientHeight;
      
         // get context of the canvas
         ctx = canvasEle.getContext("2d");
        tf.ready().then(()=>{
            loadModel();
        })
    }, [])

    return (
        <div>
             <Webcam 
                    ref={webcamRef}
                    id="img"
                    height={400}
                    width={500}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                >
                    {({ getScreenshot }) => (
                    <button
                        style={{zIndex:9999, position: "relative"}}
                        onClick={() => getCocossdData(getScreenshot())}
                    >
                        Capture photo
                    </button>
                    )}
                </Webcam>
            <div className={styles.canvasContainer}> 
                <canvas
                    id="canvas"
                    ref={canvas}
                    style={{position:"absolute",}}
                    width={videoWidth}
                    height={videoHeight}
                />
            </div>
        </div>
    )
}