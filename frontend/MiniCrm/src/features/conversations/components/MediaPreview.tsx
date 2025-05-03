import { useEffect, memo } from "react";
import { MediaType } from "../types/conversationsTypes";

type MediaPreviewProps = {

    mediaType: MediaType | null;
    previewUrl: string | null;
    videoRef: React.Ref<HTMLVideoElement>;

}

export const MediaPreview = memo(({ mediaType, previewUrl, videoRef }: MediaPreviewProps) => {

    useEffect(() => {
        if (previewUrl && videoRef && typeof videoRef !== 'function' && videoRef.current) {
            const currentTime = videoRef!.current.currentTime;
            videoRef.current.src = previewUrl;
            videoRef.current.currentTime = currentTime;
        };
    }, [previewUrl, videoRef]);


    return (
        <>

            {/* Mascara sobre o preview*/}
            <div className="absolute inset-0 bg-black/70"></div>

            {/* Preview */}
            <div className="flex-1 flex items-center justify-center z-10">
                {mediaType === MediaType.Image && (
                    <img src={previewUrl!} alt="Preview" className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg shadow-lg" />
                )}
                {mediaType === MediaType.Video && (
                    <video ref={videoRef} controls className="max-h-[80vh] max-w-[90vw] w-full h-full object-contain rounded-lg shadow-lg" />
                )}
                {mediaType === MediaType.Audio && (
                    <img src="/audio-placeholder.png" alt="Audio" className="w-32 h-32 object-cover rounded" />
                )}
                {mediaType === MediaType.File && (
                    <img src="/file-placeholder.png" alt="File" className="w-32 h-32 object-cover rounded" />
                )}
            </div>
        </>


    );
});

