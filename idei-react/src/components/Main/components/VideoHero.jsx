import video from "../../../assets/video.mp4"
function VideoHero() {
    return (
        <div className="relative w-full aspect-video overflow-hidden">
            <video

                loop
                autoPlay
                muted
                src={video}
            >
                <track
                    src="captions.vtt"
                    default
                    kind="captions"
                    srcLang="es"
                    label="Español Latinoamérica"
                />
            </video>
        </div>
    );
};
export default VideoHero;