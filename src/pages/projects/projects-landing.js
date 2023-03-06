import React from 'react';
import Card from '../../components/Card';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

function ProjectsLanding() {

    const projects = [
        {
            id: 0,
            title: 'Object Detection',
            text: 'Object Detection using Tensorflow.js Cocossd pretrained model',
            path: require('../../images/object-detection.gif'),
            link: "objectdetectiontfjsr",
        },
        {
            id: 1,
            title: 'Pose Detection',
            text: 'Pose Detection using a premade model from TFHub and using it on a react app',
            path: require('../../images/jump.gif'),
            link: 'posedetection',
        },
    ];

    return (
        <>
            <Grid sx={{ flexGrow: 1 }} container spacing={3}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={6}>
                        {projects.map((project) => (
                            <Grid key={project.id} item xs={6}>
                                <Link href={project.link} underline="none">
                                    <Card 
                                        height={500}
                                        maxWidth='100%'
                                        alt="Card"
                                        path={project.path}
                                        title={project.title}
                                        text={project.text}
                                    />
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </>
        );
};

export default ProjectsLanding;