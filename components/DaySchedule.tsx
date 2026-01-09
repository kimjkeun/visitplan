'use client';

import { DaySchedule as DayScheduleType } from '@/types';
import TimelineItem from './TimelineItem';
import FlightInfo from './FlightInfo';

interface Props {
  schedule: DayScheduleType;
}

export default function DaySchedule({ schedule }: Props) {
  return (
    <section className="bg-white rounded-3xl p-8 shadow-xl border-l-8 border-gradient-to-b from-pink-500 to-teal-400 animate-fadeIn">
      {/* Day Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-400 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
          {schedule.dayNumber}
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-pink-600 mb-1">{schedule.title}</h2>
          <p className="text-gray-600 text-lg">{schedule.subtitle}</p>
        </div>
      </div>

      {/* Flight Info */}
      {schedule.flight && <FlightInfo flight={schedule.flight} />}

      {/* Timeline */}
      <div className="relative pl-10">
        {/* Timeline Line */}
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 to-teal-400"></div>

        {/* Timeline Items */}
        <div className="space-y-8">
          {schedule.timeline.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              dayId={schedule.id}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
