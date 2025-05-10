import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAudioRecorderResult {
  gravando: boolean;
  audioURL: string | null;
  error: string | null;
  tempoGravado: number;
  audioData: Uint8Array | null;
  iniciarGravacao: () => Promise<void>;
  pararGravacao: () => void;
  resetGravacao: () => void;
}

export const useAudioRecorder = (onSendAudioCallback: (audioURL: string) => void): UseAudioRecorderResult => {
  const [gravando, setGravando] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tempoGravado, setTempoGravado] = useState(0);
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTime = useRef<number | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const dataArray = useRef<Uint8Array | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const [webAudioReady, setWebAudioReady] = useState(false);

  const processAudioData = useCallback(() => {
    if (analyser.current && dataArray.current && gravando) {
      analyser.current.getByteTimeDomainData(dataArray.current);
      setAudioData(new Uint8Array(dataArray.current));
      animationFrameId.current = requestAnimationFrame(processAudioData);
    } else if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  }, [gravando, setAudioData]);

   const resetGravacao = useCallback(() => {
    setGravando(false);
    setAudioURL(null);
    setError(null);
    setTempoGravado(0);
    setAudioData(null);
    audioChunks.current = [];
    startTime.current = null;
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
    if (mediaRecorder.current) {
      mediaRecorder.current.onstop = null;
      if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
        mediaRecorder.current.stop();
      }
      mediaRecorder.current = null;
    }
    if (audioContext.current) {
      audioContext.current.close();
      audioContext.current = null;
      analyser.current = null;
      dataArray.current = null;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    }
  }, []);

  const iniciarGravacao = useCallback(async () => {
    console.log("iniciarGravacao sendo executada");
    setError(null);
    setAudioURL(null);
    setAudioData(null);
    audioChunks.current = [];
    setTempoGravado(0);
    startTime.current = Date.now();
    setWebAudioReady(false);
    audioContext.current = null;
    analyser.current = null;
    dataArray.current = null;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContext.current.createMediaStreamSource(stream);
      analyser.current = audioContext.current.createAnalyser();
      analyser.current.fftSize = 2048;
      const bufferLength = analyser.current.frequencyBinCount;
      dataArray.current = new Uint8Array(bufferLength);
      source.connect(analyser.current);
      setWebAudioReady(true);

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        setGravando(false);
        startTime.current = null;
        if (intervalId.current) {
          clearInterval(intervalId.current);
          intervalId.current = null;
        }
        setTempoGravado(0);
        if (audioContext.current) {
          audioContext.current.close();
          audioContext.current = null;
          analyser.current = null;
          dataArray.current = null;
          if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
          }
        }
        if (onSendAudioCallback && url) {
          onSendAudioCallback(url);
          resetGravacao();
        }
      };

      mediaRecorder.current.onerror = (event) => {
        setError(`Erro ao gravar áudio: ${event.error?.message || 'Desconhecido'}`);
        setGravando(false);
        startTime.current = null;
        if (intervalId.current) {
          clearInterval(intervalId.current);
          intervalId.current = null;
        }
        setTempoGravado(0);
        if (audioContext.current) {
          audioContext.current.close();
          audioContext.current = null;
          analyser.current = null;
          dataArray.current = null;
          if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
          }
        }
      };

      mediaRecorder.current.start();
      setGravando(true);
      startTime.current = Date.now();

    } catch (err: any) {
      setError(`Erro ao acessar o microfone: ${err.message || 'Permissão negada ou dispositivo não encontrado'}`);
      setGravando(false);
      startTime.current = null;
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
      setTempoGravado(0);
      if (audioContext.current) {
        audioContext.current.close();
        audioContext.current = null;
        analyser.current = null;
        dataArray.current = null;
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
      }
    }
  }, [onSendAudioCallback, resetGravacao, processAudioData]);

  const pararGravacao = useCallback(() => {
    if (gravando && mediaRecorder.current?.state !== 'inactive') {
      mediaRecorder.current?.stop();
    }
  }, [gravando]);

  useEffect(() => {
    if (gravando && startTime.current !== null) {
      intervalId.current = setInterval(() => {
        setTempoGravado(Math.floor((Date.now() - startTime.current!) / 1000));
      }, 100);
    } else if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    };
  }, [gravando, startTime]);

  useEffect(() => {
    if (gravando && webAudioReady && analyser.current && dataArray.current) {
      processAudioData();
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, [gravando, webAudioReady, processAudioData, analyser, dataArray]);

  useEffect(() => {
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
      if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
        mediaRecorder.current.stop();
      }
      if (audioContext.current) {
        audioContext.current.close();
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return {
    gravando,
    audioURL,
    error,
    tempoGravado,
    audioData,
    iniciarGravacao,
    pararGravacao,
    resetGravacao,
  };
};