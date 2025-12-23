import React, { useState } from 'react';

const ImageWithFallback = ({ src, alt, className, ...props }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setError(true);
    };

    return (
        <div className={`relative overflow-hidden ${className}`} {...props}>
            {isLoading && (
                <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 animate-pulse flex items-center justify-center">
                    <span className="sr-only">Loading...</span>
                </div>
            )}
            {error ? (
                <div className="absolute inset-0 bg-zinc-300 dark:bg-zinc-700 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
                    <span className="text-sm">Image not available</span>
                </div>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={handleLoad}
                    onError={handleError}
                />
            )}
        </div>
    );
};

export default ImageWithFallback;
