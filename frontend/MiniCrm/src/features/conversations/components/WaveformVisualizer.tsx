import React, { useEffect, useRef } from 'react';

interface WaveformVisualizerProps {
  audioData: Uint8Array | null;
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ audioData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    let width: number;
    let height: number;
   
    const drawWaveform = () => {
      if (!canvas || !context || !audioData) {
        return;
      }

      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;

      context.clearRect(0, 0, width, height);
      context.lineWidth = 2;
      context.strokeStyle = '#3b82f6'; // Cor da onda
      context.beginPath();

      const sliceWidth = width / (audioData.length - 1);
      let x = 0;

      for (let i = 0; i < audioData.length; i++) {
        const v = audioData[i] / 128.0; // Normalize byte data to 0.0 - 1.0
        const y = (v * height) / 2;

        if (i === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }

        x += sliceWidth;
      }

      context.lineTo(width, height / 2);
      context.stroke();

      animationFrameRef.current = requestAnimationFrame(drawWaveform);
    };

    if (audioData) {
      drawWaveform();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
    console.log("renderizou o Wave")
  }, [audioData]);

  

  return <canvas ref={canvasRef} className="w-32 h-10" />; // Ajuste as dimensões conforme necessário
};