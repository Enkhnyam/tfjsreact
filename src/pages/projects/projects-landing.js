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
            path: require('../../images/tensorflow2objectdetection.png'),
            link: "objectdetectiontfjsr",
        },
        {
            id: 1,
            title: 'The Next Amazing Project',
            text: 'The description of this project shall not be lorem ipsum',
            path: require('../../images/object-detection.png'),
            link: 'comingsoon',
        },
        {
            id: 2,
            title: 'Object Detection',
            text: 'Object Detection using Tensorflow.js Cocossd pretrained model',
            path: require('../../images/tensorflow2objectdetection.png'),
            link: 'comingsoon',
        },
        {
            id: 3,
            title: 'The Next Amazing Project',
            text: 'The description of this project shall not be lorem ipsum',
            path: require('../../images/object-detection.png'),
            link: 'comingsoon',
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