export function drawRect(detection, ctx) {
    const threshold = 0.6;
    detection.forEach(prediction => {
        if (prediction['score'] > threshold) {
            const [x, y, width, height] = prediction['bbox'];
            const text = prediction['class'] + ' ' + Math.round(parseFloat(prediction['score']*100)) + '%';

            const clr = 'red';
            ctx.strokeStyle = clr;
            ctx.font = '20px Arial';
            ctx.fillStyle = clr;

            ctx.beginPath();
            ctx.fillText(text, x, y);
            ctx.rect(x, y, width, height);
            ctx.stroke();
        }
    });
}