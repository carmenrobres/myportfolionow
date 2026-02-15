import React from 'react';

// Define colors
const colors = {
  brown: '#5D4037',
  yellow: '#F3E566',
};
const colorPalette = Object.values(colors);

interface IconProps {
  color: string;
}

const HappyFaceIcon: React.FC<IconProps> = ({ color }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" className="w-20 h-20 transition-transform duration-500 ease-in-out hover:rotate-[360deg] flex-shrink-0">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <path d="M9 9h.01M15 9h.01" strokeLinecap="round" />
    </svg>
);

const StarIcon: React.FC<IconProps> = ({ color }) => (
    <svg viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1" className="w-20 h-20 transition-transform duration-500 ease-in-out hover:rotate-[360deg] flex-shrink-0">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
);


const IconRow: React.FC<{ count: number, offset?: number }> = ({ count, offset = 0 }) => (
    <div className="flex justify-center items-center space-x-8 flex-nowrap">
        {Array.from({ length: count }).map((_, index) => {
            const colorIndex = (index + offset) % colorPalette.length;
            const iconColor = colorPalette[colorIndex];
            if ((index + offset) % 2 === 0) {
              return <HappyFaceIcon key={index} color={iconColor} />;
            }
            return <StarIcon key={index} color={iconColor} />;
        })}
    </div>
);


const FlowerFooter: React.FC = () => {
    return (
        <section className="bg-brand-light py-12 md:py-20 overflow-x-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-8">
                <div className="flex space-x-8 -translate-x-16">
                    <IconRow count={10} />
                </div>
                <div className="flex justify-center items-center space-x-8 w-full">
                    <IconRow count={2} offset={2} />
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-brown whitespace-nowrap px-4">
                        Lets make things together :)
                    </h2>
                    <IconRow count={2} offset={1} />
                </div>
                 <div className="flex space-x-8 translate-x-16">
                    <IconRow count={10} offset={1} />
                </div>
            </div>
        </section>
    );
};

export default FlowerFooter;
