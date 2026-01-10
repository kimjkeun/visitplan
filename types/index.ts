export interface TimelineItem {
  time: string;
  title: string;
  details: string;
  mustEat?: {
    title: string;
    items: string[];
  };
  tips?: string;
  priority?: boolean;
  location?: {
    name: string;
    searchQuery: string; // 구글 맵 검색용 정확한 영어 명칭
    lat: number;
    lng: number;
    address?: string;
  };
  placeInfo?: {
    description?: string;
    highlights?: string[];
    hours?: string;
    admission?: string;
    recommendations?: string;
  };
}

export interface FlightInfo {
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  flightNumber?: string;
}

export interface DaySchedule {
  id: string;
  dayNumber: number;
  title: string;
  subtitle: string;
  timeline: TimelineItem[];
  flight?: FlightInfo;
}

export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface UserNote {
  dayId: string;
  timelineIndex: number;
  note: string;
  timestamp: number;
}

export interface TripExpense {
  id: string;
  dayId: string;
  category: 'food' | 'transport' | 'shopping' | 'accommodation' | 'activity' | 'other';
  amount: number;
  currency: 'TWD' | 'KRW';
  description: string;
  timestamp: number;
}

export interface AppState {
  checklist: ChecklistItem[];
  notes: UserNote[];
  expenses: TripExpense[];
  tripStartDate: string | null;
}
