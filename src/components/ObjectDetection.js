import React, { useEffect, useState, useRef } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import styles from "./ObjectDetection.module.css";

export default function ObjectDetection() {

    const [model, setModel] = useState();
    const webcamRef = React.useRef(null);
    const [videoWidth, setVideoWidth] = useState(960);
    const [videoHeight, setVideoHeight] = useState(640);
    const videoConstraints = {
        height: 1080,
        width: 1920,
        facingMode: "environment",
    };

    async function loadModel() {
        try {
            const modelVar = await cocoSsd.load();
            setModel(modelVar);
            console.log("model setted");
        } catch (e) {
            console.log(e);
            console.log("failed to set model");
        }
    }

    async function predictionFunction () {
        //Clear the canvas for each prediction
        var cnvs = document.getElementById("myCanvas");
        var ctx = cnvs.getContext("2d");
        ctx.clearRect(0,0, webcamRef.current.video.videoWidth,webcamRef.current.video.videoHeight);
        //Start prediction
        const predictions = await model.detect(document.getElementById("img"));
        if (predictions.length > 0) {
            console.log(predictions);
            for (let n = 0; n < predictions.length; n++) {
                if (predictions[n].score > 0.8) {
                    //Threshold is 0.8 or 80%
                    //Extracting the coordinate and the bounding box information
                    let bboxLeft = predictions[n].bbox[0];
                    let bboxTop = predictions[n].bbox[1];
                    let bboxWidth = predictions[n].bbox[2];
                    let bboxHeight = predictions[n].bbox[3] - bboxTop;
                    console.log("bboxLeft: " + bboxLeft);
                    console.log("bboxTop: " + bboxTop);
                    console.log("bboxWidth: " + bboxWidth);
                    console.log("bboxHeight: " + bboxHeight);
                    //Drawing begin
                    ctx.beginPath();
                    ctx.font = "28px Arial";
                    ctx.fillStyle = "red";
                    ctx.fillText(
                    predictions[n].class +": " + Math.round(parseFloat(predictions[n].score) * 100) +
                    "%", bboxLeft,bboxTop);
                    ctx.rect(bboxLeft, bboxTop, bboxWidth, bboxHeight);
                    ctx.strokeStyle = "#FF0000";
                    ctx.lineWidth = 3;
                    ctx.stroke();
                    console.log("detected");
                }
            }
        }
        //Rerun prediction by timeout
        setTimeout(() => predictionFunction(), 500);
    }

    useEffect(() => {
        tf.ready().then(()=>{
            loadModel();
        })
    }, [])

    return (
        <div>
            <button 
            onClick={()=>{predictionFunction()}}
            className={styles.button}
            >
                Start Detection Function
            </button>
            <div className={styles.container}>
                <Webcam 
                    audio={false}
                    id="img"
                    ref={webcamRef}
                    screenshotQuality={1}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
            </div>
            <div className={styles.canvasContainer}>
                <canvas 
                    id="myCanvas"
                    width={videoWidth}
                    height={videoHeight}
                    className={styles.canvas}
                />
            </div>
        </div>
    )
}