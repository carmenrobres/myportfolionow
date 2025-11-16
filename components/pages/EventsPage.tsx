import React, { useState } from 'react';
import { events } from '../../data';
import { Event } from '../../types';

const EventsPage: React.FC = () => {
  const [hoveredEvent, setHoveredEvent] = useState<Event | null>(null);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase();
    const year = date.getUTCFullYear();
    return { day, month, year };
  };

  return (
    <div className="animate-fade-in container mx-auto px-4 sm:px-6 lg:p-8 relative">
      <h1 className="text-3xl font-bold tracking-tight mb-12 text-black dark:text-brand-light">Upcoming Events</h1>
      
      <div className="grid grid-cols-12 gap-x-4 text-xs text-brand-muted dark:text-gray-400 uppercase tracking-wider mb-4 px-4">
        <div className="col-span-2">Date</div>
        <div className="col-span-4">Name</div>
        <div className="col-span-4">Location</div>
        <div className="col-span-2">Country</div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700" onMouseLeave={() => setHoveredEvent(null)}>
        {events.map((event) => {
          const start = formatDate(event.startDate);
          const end = formatDate(event.endDate);
          const isSameDay = event.startDate === event.endDate;

          return (
            <div
              key={event.id}
              onMouseEnter={() => setHoveredEvent(event)}
              className={`transition-colors duration-200 ${hoveredEvent?.id === event.id ? 'bg-brand-yellow dark:bg-yellow-900/50' : ''}`}
            >
              <div className="grid grid-cols-12 gap-x-4 items-center border-b border-gray-200 dark:border-gray-700 py-4 px-4">
                <div className="col-span-2 text-sm">
                  {isSameDay ? (
                    <div>
                      <span>{start.day} {start.month}</span><br />
                      <span>{start.year}</span>
                    </div>
                  ) : (
                    <div>
                      <span>{start.day} {start.month} - {end.day} {end.month}</span><br />
                      <span>{start.year} - {end.year}</span>
                    </div>
                  )}
                </div>
                <div className="col-span-4 flex items-center gap-x-4">
                  <span className="font-medium text-brand-dark-gray dark:text-gray-300">{event.name}</span>
                  <span className="text-xs border border-brand-muted dark:border-gray-500 text-brand-muted dark:text-gray-400 rounded-full px-3 py-1">
                    {event.type}
                  </span>
                </div>
                <div className="col-span-4 text-sm text-brand-muted dark:text-gray-400">{event.location}</div>
                <div className="col-span-2 flex justify-between items-center text-sm text-brand-muted dark:text-gray-400">
                  <span>{event.country}</span>
                  <span className="text-lg">{event.link ? '↗' : '+'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {hoveredEvent && (
        <div className="pointer-events-none fixed top-1/2 right-20 -translate-y-1/2 z-10 hidden lg:block">
          <div className="w-[300px] h-[400px] bg-brand-light-gray dark:bg-brand-dark-gray rounded-lg overflow-hidden shadow-2xl">
            <img 
              src={hoveredEvent.image} 
              alt={hoveredEvent.name}
              className="w-full h-full object-cover animate-fade-in"
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default EventsPage;