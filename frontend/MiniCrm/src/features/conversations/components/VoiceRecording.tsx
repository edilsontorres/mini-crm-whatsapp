import React, { useCallback } from 'react';
import { Mic, SendHorizontal, Trash } from 'lucide-react';

import { useAudioRecorder } from '../hooks/useVoiceRecording';
import { WaveformVisualizer } from './WaveformVisualizer';

interface AudioInputProps {
  onSendAudio: (audioURL: string) => void;
  onCancel?: () => void;
  onRecordingStarted?: () => void;
}

export const AudioInput: React.FC<AudioInputProps> = ({ onSendAudio, onCancel, onRecordingStarted }) => {
  const {
    gravando,
    audioURL,
    error,
    tempoGravado,
    audioData,
    iniciarGravacao,
    pararGravacao,
    resetGravacao,
  } = useAudioRecorder(onSendAudio); // Passa onSendAudio para o hook

  const handleRecordButtonClick = useCallback(() => {
    iniciarGravacao();
    if (onRecordingStarted) {
      onRecordingStarted();
    }
  }, [iniciarGravacao, onRecordingStarted]);

  const handleSendButtonClick = useCallback(() => {
    pararGravacao(); // Parar a gravação acionará o envio no onstop do hook
  }, [pararGravacao]);

  const handleCancelButtonClick = useCallback(() => {
    pararGravacao();
    resetGravacao();
    if (onCancel) {
      onCancel();
    }
  }, [pararGravacao, resetGravacao, onCancel]);

  return (
    <div className="flex items-center space-x-2">
      {gravando && (
        <div className="flex items-center space-x-2">
          <button onClick={handleCancelButtonClick} className="text-gray-500">
            <Trash className="w-6 h-6 cursor-pointer text-gray-400" />
          </button>
          <div className="text-sm text-gray-700">{formatTime(tempoGravado)}</div>
          <WaveformVisualizer audioData={audioData} />
          <button onClick={handleSendButtonClick} className="rounded-full flex text-white bg-green-600 cursor-pointer p-2 ml-1 items-center justify-center">
            <SendHorizontal className="w-6 h-6 cursor-pointer" />
          </button>
        </div>
      )}

      {!gravando && !audioURL && (
        <button
          onClick={handleRecordButtonClick}
          className={` rounded-full flex text-gray-400`}
        >
          <Mic className="w-6 h-6 cursor-pointer" />
        </button>
      )}

      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
};