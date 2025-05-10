// import React, { useState, useEffect, useCallback } from 'react';
// import { Mic, SendHorizontal, CirclePause, Trash } from 'lucide-react';

// import { useAudioRecorder } from '../hooks/useVoiceRecording';
// import { WaveformVisualizer } from './WaveformVisualizer';

// interface AudioInputProps {
//   onSendAudio: (audioURL: string) => void;
//   onCancel?: () => void;
//   onRecordingStarted?: () => void;
// }

// const AudioInput: React.FC<AudioInputProps> = ({ onSendAudio, onCancel, onRecordingStarted }) => {
//   const {
//     gravando,
//     pausado,
//     audioURL,
//     error,
//     tempoGravado,
//     audioData,
//     iniciarGravacao,
//     pausarGravacao,
//     pararGravacao,
//     resetGravacao
//   } = useAudioRecorder();

//   const [isPausadoPiscando, setIsPausadoPiscando] = useState(false);

//   useEffect(() => {
//     if (gravando && onRecordingStarted) {
//       onRecordingStarted();
//     }
//     setIsPausadoPiscando(pausado); // Inicia/para o efeito de piscar
//   }, [gravando, onRecordingStarted, pausado]);

//   const handleRecordButtonClick = useCallback(() => {
//     iniciarGravacao();
//     if (onRecordingStarted) {
//       onRecordingStarted();
//     }
//   }, [iniciarGravacao, onRecordingStarted]);

//   const handleCancelButtonClick = useCallback(() => {
//     pararGravacao();
//     resetGravacao();
//     if (onCancel) {
//       onCancel();
//     }
//   }, [resetGravacao, pararGravacao, onCancel]);

//   // const handlePauseResumeClick = useCallback(() => {
//   //   pausarGravacao(); // A lógica de pausar/resumir está no hook agora
//   // }, [pausarGravacao]);


//   const handleSendButtonClick = useCallback(() => {
//     pararGravacao();
//     console.log("olha o audioURL", audioURL);
//     if (audioURL) {
//       console.log("Enviando áudio:", audioURL);
//       // onSendAudio(audioURL);
//       // resetGravacao();
//     }
//   }, [audioURL, onSendAudio, pararGravacao, resetGravacao]);

//   return (
//     <div className="flex items-center space-x-2">
//       {gravando && (
//         <div className="flex items-center space-x-2">
//           <button onClick={handleCancelButtonClick} className="text-gray-500">
//             <Trash className="w-6 h-6 cursor-pointer text-gray-400" />
//           </button>
//           <div className="text-sm text-gray-700">{formatTime(tempoGravado)}</div>
//           <WaveformVisualizer audioData={audioData} />

//           <button onClick={handleSendButtonClick} className="text-green-600">
//             <SendHorizontal className="w-6 h-6 cursor-pointer" />
//           </button>


//           {/* {pausado && isPausadoPiscando && (
//             <div key={Date.now()} className="animate-pulse text-red-500 font-bold w-32 flex items-center justify-center">Pausado</div>
//           )} */}
//         </div>
//       )}

//       {!gravando && !audioURL && (
//         <button
//           onClick={handleRecordButtonClick}
//           className={` rounded-full flex text-gray-400`}
//         >
//           <Mic className="w-6 h-6 cursor-pointer" />
//         </button>
//       )}

//       {/* {gravando && (
//         <button
//           onClick={handleRecordButtonClick}
//           className={` rounded-full flex bg-green-600 text-white cursor-pointer p-2`}
//         >
//           <CirclePause className="w-6 h-6 cursor-pointer" />
//         </button>
//       )}

//       {audioURL && !gravando && (
//         <button onClick={handleSendButtonClick} className="text-green-600">
//           <SendHorizontal className="w-6 h-6 cursor-pointer" />
//         </button>
//       )}

//       {audioURL && !gravando && (
//         <button onClick={handleCancelButtonClick} className="text-gray-500 ml-2">
//           <Trash className="w-6 h-6 cursor-pointer text-gray-400" />
//         </button>
//       )} */}


//       {/* <button
//         onClick={handleRecordButtonClick}
//       >
//         {<Mic className="w-6 h-6 cursor-pointer" />}
//       </button>

//       {audioURL ? (
//         <button onClick={handleSendButtonClick} className="rounded-full flex text-white bg-green-600 cursor-pointer p-2">
//           <SendHorizontal className="w-4 h-4" />
//         </button>) : ("")
//       } */}

//       {error && <div className="text-red-500 text-sm">{error}</div>}
//     </div>
//   );
// };

// const formatTime = (seconds: number): string => {
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = seconds % 60;
//   const formattedMinutes = String(minutes).padStart(2, '0');
//   const formattedSeconds = String(remainingSeconds).padStart(2, '0');
//   return `${formattedMinutes}:${formattedSeconds}`;
// };

// export default AudioInput;

import React, { useCallback } from 'react';
import { Mic, SendHorizontal, Trash } from 'lucide-react';

import { useAudioRecorder } from '../hooks/useVoiceRecording';
import { WaveformVisualizer } from './WaveformVisualizer';

interface AudioInputProps {
  onSendAudio: (audioURL: string) => void;
  onCancel?: () => void;
  onRecordingStarted?: () => void;
}

const AudioInput: React.FC<AudioInputProps> = ({ onSendAudio, onCancel, onRecordingStarted }) => {
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

export default AudioInput;