import React, { useRef, useState, useEffect } from 'react';
import * as tf from "@tensorflow/tfjs";
import styles from "./ObjectDetectionTFJSR.module.css";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { drawRect } from "../../../components/DrawRect";
import Loading from '../../../components/Loading';
import WebcamComponent from '../../../components/WebcamComponent';

function ObjectDetectionTFJSR() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [loading, setLoading] = useState(true);

    async function runCoco() {

        const model = await cocoSsd.load();
        setLoading(false);
        setInterval(() => {
            detect(model);
        }, 10);
    };

    async function detect(model) {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
           const video = webcamRef.current.video;
           const videoWidth = webcamRef.current.video.videoWidth;
           const videoHeight = webcamRef.current.video.videoHeight;

           canvasRef.current.width = videoWidth;
           canvasRef.current.height = videoHeight;
           const obj = await model.detect(video);
           console.log(obj);
            
           const ctx = canvasRef.current.getContext("2d");
           drawRect(obj, ctx);
        }
    };

    useEffect(()=>{
        runCoco();
    }, []);

    const webCamStyle = {
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zindex: 9,
        width: 640,
        height: 480,
        border: "3px solid gray"
    }

    return (
       <div>
            {loading ? <Loading /> :
            <header className="App-header">
                <WebcamComponent
                    ref={webcamRef}
                    muted={true} 
                    style={webCamStyle}
                />

                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 8,
                        width: 640,
                        height: 480,
                    }}
                />
            </header>}
       </div>
    );
}

export default ObjectDetectionTFJSR;