import React, { useRef, useEffect, useState } from 'react';
import { useUpdate } from './common/updatecontext';
import "./css/ImageCanvas.css"

function ImageCanvas({ inspection, height, onClick }) {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [image, setImage] = useState(new Image());
    const initilized = useRef(false)

    const { shouldUpdate } = useUpdate();
    let x = 0, y = 0;
    let zoom = 1;

    // Load the image
    useEffect(() => {
        if (!inspection || (!shouldUpdate && initilized.current)) return;
        let filePath = inspection['filename'];
        let imgPath = filePath.replace('/app/static/', 'static/');

        // reset the zoom and position
        x = 0, y = 0, zoom = 1;

        const img = new Image();
        img.onload = () => setImage(img);
        img.onerror = () => console.log('Error loading image');
        img.src = imgPath;
    }, [inspection]);

    // Function to redraw the canvas
    const drawImage = () => {
        // Clear the canvas
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);

        const container = containerRef.current
        const size = Math.min(container.offsetHeight, container.offsetWidth);
        canvas.width = size;
        canvas.height = size;

        context.drawImage(image, x, y, canvas.width*zoom, canvas.height*zoom);
    };
    
    // Draw the image
    useEffect(() => {
        if (!image.src) return;

        initilized.current = true;

        drawImage();

        // Optional: Redraw on window resize or other events
        window.addEventListener('resize', drawImage);
        return () => window.removeEventListener('resize', drawImage);
    }, [image]);

    function getMousePos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    
    const onCanvasWheel = (event) => {
        event.preventDefault();
        const mousePos = getMousePos(canvasRef.current, event);
        const prevZoom = zoom;
        zoom += event.deltaY * -0.01;
    
        // Restrict zoom range
        zoom = Math.min(Math.max(1, zoom), 10);
    
        // Adjust image position based on mouse position
        x -= (mousePos.x - x) * (zoom - prevZoom) / prevZoom;
        y -= (mousePos.y - y) * (zoom - prevZoom) / prevZoom;
    
        drawImage();
    };

    let isDragging = false;
    let startX, startY;
    const onCanvasMouseDown = (event) => {
        isDragging = true;
        startX = event.offsetX - x;
        startY = event.offsetY - y;
    }

    const onCanvasMouseMove = (event) => {
        if (isDragging) {
            x = event.offsetX - startX;
            y = event.offsetY - startY;
            drawImage();
        }
    }

    const onCanvasMouseUp = () => { isDragging = false; }

    const onCanvasMouseout = () => { isDragging = false; }

    useEffect(() => {
        canvasRef.current.addEventListener('wheel', onCanvasWheel);
        canvasRef.current.addEventListener('mousedown', onCanvasMouseDown);
        canvasRef.current.addEventListener('mousemove', onCanvasMouseMove);
        canvasRef.current.addEventListener('mouseup', onCanvasMouseUp);
        canvasRef.current.addEventListener('mouseout', onCanvasMouseout);
    }, [shouldUpdate]);

    const style = {
        height: `${height}`
    }

    return (
        <div className="image-canvas" ref={containerRef}>
            <canvas ref={canvasRef} />
        </div>
    );}

export default ImageCanvas;



