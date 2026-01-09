import { create } from 'zustand';
import { ChecklistItem, UserNote, TripExpense } from '@/types';
import { initialChecklist } from './tourData';
import { getFromStorage, saveToStorage, STORAGE_KEYS } from './localStorage';

interface TourStore {
  // State
  checklist: ChecklistItem[];
  notes: UserNote[];
  expenses: TripExpense[];
  tripStartDate: string | null;
  currentDay: string;
  exchangeRate: number; // TWD to KRW

  // Actions - Checklist
  toggleChecklistItem: (id: string) => void;
  resetChecklist: () => void;

  // Actions - Notes
  addNote: (note: Omit<UserNote, 'timestamp'>) => void;
  deleteNote: (dayId: string, timelineIndex: number) => void;

  // Actions - Expenses
  addExpense: (expense: Omit<TripExpense, 'id' | 'timestamp'>) => void;
  deleteExpense: (id: string) => void;

  // Actions - Trip
  setTripStartDate: (date: string | null) => void;
  setCurrentDay: (dayId: string) => void;
  setExchangeRate: (rate: number) => void;

  // Actions - Init
  initializeFromStorage: () => void;
}

export const useTourStore = create<TourStore>((set, get) => ({
  // Initial State
  checklist: initialChecklist,
  notes: [],
  expenses: [],
  tripStartDate: null,
  currentDay: 'day1',
  exchangeRate: 37.5, // Default TWD to KRW rate

  // Checklist Actions
  toggleChecklistItem: (id) => {
    set((state) => {
      const newChecklist = state.checklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      saveToStorage(STORAGE_KEYS.CHECKLIST, newChecklist);
      return { checklist: newChecklist };
    });
  },

  resetChecklist: () => {
    set({ checklist: initialChecklist });
    saveToStorage(STORAGE_KEYS.CHECKLIST, initialChecklist);
  },

  // Notes Actions
  addNote: (note) => {
    set((state) => {
      const newNote: UserNote = {
        ...note,
        timestamp: Date.now(),
      };
      const newNotes = [...state.notes, newNote];
      saveToStorage(STORAGE_KEYS.NOTES, newNotes);
      return { notes: newNotes };
    });
  },

  deleteNote: (dayId, timelineIndex) => {
    set((state) => {
      const newNotes = state.notes.filter(
        (note) => !(note.dayId === dayId && note.timelineIndex === timelineIndex)
      );
      saveToStorage(STORAGE_KEYS.NOTES, newNotes);
      return { notes: newNotes };
    });
  },

  // Expenses Actions
  addExpense: (expense) => {
    set((state) => {
      const newExpense: TripExpense = {
        ...expense,
        id: `exp-${Date.now()}`,
        timestamp: Date.now(),
      };
      const newExpenses = [...state.expenses, newExpense];
      saveToStorage(STORAGE_KEYS.EXPENSES, newExpenses);
      return { expenses: newExpenses };
    });
  },

  deleteExpense: (id) => {
    set((state) => {
      const newExpenses = state.expenses.filter((exp) => exp.id !== id);
      saveToStorage(STORAGE_KEYS.EXPENSES, newExpenses);
      return { expenses: newExpenses };
    });
  },

  // Trip Actions
  setTripStartDate: (date) => {
    set({ tripStartDate: date });
    saveToStorage(STORAGE_KEYS.TRIP_START_DATE, date);
  },

  setCurrentDay: (dayId) => {
    set({ currentDay: dayId });
  },

  setExchangeRate: (rate) => {
    set({ exchangeRate: rate });
  },

  // Initialize from localStorage
  initializeFromStorage: () => {
    if (typeof window !== 'undefined') {
      const checklist = getFromStorage(STORAGE_KEYS.CHECKLIST, initialChecklist);
      const notes = getFromStorage<UserNote[]>(STORAGE_KEYS.NOTES, []);
      const expenses = getFromStorage<TripExpense[]>(STORAGE_KEYS.EXPENSES, []);
      const tripStartDate = getFromStorage<string | null>(STORAGE_KEYS.TRIP_START_DATE, null);

      set({ checklist, notes, expenses, tripStartDate });
    }
  },
}));
