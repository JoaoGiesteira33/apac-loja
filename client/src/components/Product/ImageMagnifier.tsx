import React, { useState } from 'react';

function ImageMagnifier( data: {src: string} ) {
    const imgUrl = data.src;

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    const handleMouseHover = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } =
            e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setPosition({ x, y });

        setCursorPosition({ x: e.pageX - left, y: e.pageY - top });
    };

    return (
        <div
            className="img-magnifier-container relative"
            onMouseEnter={() => setShowMagnifier(true)}
            onMouseLeave={() => setShowMagnifier(false)}
            onMouseMove={handleMouseHover}>
            <img className="magnifier-img w-auto h-4/5" src={imgUrl} alt="" />

            {showMagnifier && (
                <div
                    style={{
                        position: 'absolute',
                        left: `${cursorPosition.x - 100}px`,
                        top: `${cursorPosition.y - 100}px`,
                        pointerEvents: 'none',
                    }}>
                    <div
                        className="magnifier-image w-52 h-52 border-2 border-gray-400 rounded-full"
                        style={{
                            backgroundImage: `url(${imgUrl})`,
                            backgroundPosition: `${position.x}% ${position.y}%`,
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default ImageMagnifier;
