import React, { useState, useRef } from "react";
import image from "../../../images/yogapose.jpg";
import * as posenet from '@tensorflow-models/posenet';
import * as tf from '@tensorflow/tfjs';
import WebcamComponent from "../../../components/WebcamComponent";
import { drawKeypoints, drawSkeleton } from "../../../components/DrawSkeleton";
import Loading from "../../../components/Loading";

export default function PoseDetection() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [loading, setLoading] = useState(true);

    async function runPosenet() {
        const net = await posenet.load({
            inputResolution: {
                width: 640,
                height: 480
            },
            scale: 0.5
        });

        console.log('hello')
        setLoading(false);

        setInterval(()=>{
            detect(net);
        }, 1000);
    } 

    async function detect(net) {
        if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            const pose = await net.estimateSinglePose(video);
            drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
            console.log(pose);
        }
    }

    function drawCanvas(pose, video, videoWidth, videoHeight, canvas) {
        const ctx = canvas.current.getContext("2d");
        canvas.current.width = videoWidth;
        canvas.current.height = videoHeight;

        drawKeypoints(pose['keypoints'], 0.5, ctx);
        drawSkeleton(pose['keypoints'], 0.5, ctx);
    }

    runPosenet();

    return (
        <>
            {loading ? <Loading /> :
            <div>
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
            </div>}
        </>
    )
}