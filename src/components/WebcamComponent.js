import React, { forwardRef } from 'react';
import Webcam from 'react-webcam';

const WebcamComponent = forwardRef(function WebcamComponent(props, ref) {

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
        <>
            <Webcam 
                ref={ref}
                muted={props.muted} 
                style={props.style ? props.style : webCamStyle}
            />
        </>
    );
})

export default WebcamComponent;