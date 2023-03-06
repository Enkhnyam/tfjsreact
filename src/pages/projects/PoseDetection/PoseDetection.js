import React, { useRef } from "react";
import image from "../../../images/yogapose.jpg";
import * as posenet from '@tensorflow-models/posenet';
import * as tf from '@tensorflow/tfjs';
import WebcamComponent from "../../../components/WebcamComponent";

export default function PoseDetection() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    return (
        <>
            <WebcamComponent ref={webcamRef} />
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
        </>
    )
}