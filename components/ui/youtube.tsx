// components/ui/VideoFrame.tsx
"use client";

const VideoFrame = () => {
    return (
        <div className="relative group">
            {/* Outer border with gradient */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

            {/* Inner container */}
            <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
                <iframe
                    src="https://www.youtube.com/embed/RKcMzL3kF6k?si=f-VSD-8yz-zR4oGH"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="video-frame w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] h-[53.4375vw] sm:h-[50.625vw] md:h-[45vw] lg:h-[39.375vw] xl:h-[34vw] max-w-[960px] max-h-[540px] rounded-xl"
                    style={{
                        transform: "scale(0.95)",
                        opacity: 0.8,
                    }}
                />
            </div>

            {/* Corner accents */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300"></div>
        </div>
    );
};

export default VideoFrame;