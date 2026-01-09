import { FlightInfo as FlightInfoType } from '@/types';

interface Props {
  flight: FlightInfoType;
}

export default function FlightInfo({ flight }: Props) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-5 rounded-2xl mb-6 flex items-center gap-4 shadow-lg">
      <div className="text-3xl">✈️</div>
      <div className="flex-1">
        <div className="flex items-center gap-4 flex-wrap">
          <div>
            <span className="font-bold text-lg">{flight.departureTime}</span> {flight.departure}
          </div>
          <div className="text-2xl">→</div>
          <div>
            <span className="font-bold text-lg">{flight.arrivalTime}</span> {flight.arrival}
          </div>
        </div>
        {flight.flightNumber && (
          <div className="text-sm opacity-90 mt-1">{flight.flightNumber}</div>
        )}
      </div>
    </div>
  );
}
