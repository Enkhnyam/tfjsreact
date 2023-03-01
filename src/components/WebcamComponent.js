import React, { forwardRef } from 'react';
import Webcam from 'react-webcam';

const WebcamComponent = forwardRef(function WebcamComponent(props, ref) {
    return (
        <>
            <Webcam 
                ref={ref}
                muted={props.muted} 
                style={props.style}
            />
        </>
    );
})

export default WebcamComponent;