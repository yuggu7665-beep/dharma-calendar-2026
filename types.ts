
export interface Festival {
  id: string;
  name: string;
  hindiName: string;
  date: string;
  description: string;
  significance: string;
  rituals: string[];
  type: 'major' | 'minor' | 'fast';
  icon: string;
}

export interface PanchangData {
  tithi: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  sunrise: string;
  sunset: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum FestivalCategory {
  ALL = 'All',
  EKADASHI = 'Ekadashi',
  SHIVARATRI = 'Shivaratri',
  PURNIMA = 'Purnima',
  AMAVASYA = 'Amavasya',
  MAJOR = 'Major Festivals'
}
