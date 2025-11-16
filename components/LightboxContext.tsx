import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LightboxContextType {
  showLightbox: (src: string) => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export const LightboxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const showLightbox = (src: string) => setLightboxImage(src);
  const hideLightbox = () => setLightboxImage(null);

  return (
    <LightboxContext.Provider value={{ showLightbox }}>
      {children}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 animate-fade-in cursor-zoom-out"
          onClick={hideLightbox}
        >
          <div className="relative max-w-5xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImage}
              alt="Lightbox view"
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
          <button
            onClick={hideLightbox}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full h-10 w-10 flex items-center justify-center text-2xl hover:bg-opacity-75 transition-colors"
            aria-label="Close image viewer"
          >
            &times;
          </button>
        </div>
      )}
    </LightboxContext.Provider>
  );
};

export const useLightbox = () => {
  const context = useContext(LightboxContext);
  if (context === undefined) {
    throw new Error('useLightbox must be used within a LightboxProvider');
  }
  return context;
};
