import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard(props) {

  const {height, path, alt, title, text, maxWidth} =  props;
  
  return (
    <Card sx={{ maxWidth: maxWidth }}>
      <CardActionArea style={{padding: 10}}>
        <CardMedia
          component="img"
          height={height}
          image={path}
          alt={alt}
        />
        <CardContent>
          <Typography  gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}