export interface BeerStop {
  id: number;
  name: string;
  originalName: string;
  animal: string;
  animalEmoji: string;
  address: string;
  latitude: number;
  longitude: number;
  hours: {
    saturday: string;
    sunday: string;
    isVague?: boolean;
  };
  payment: 'Cash Only' | 'Card Preferred' | 'Cash & Card' | 'Cash Preferred';
  beers: string[];
  description: string;
  history: string;
  shortFact: string;
  difficulty: number; // 1 to 5 (chance of getting a table)
  googleMapsUrl: string;
  avgPriceCoefficients: 1 | 2 | 3; // € | €€ | €€€
  highlightIcon: string; // design icon key
}

export interface UserNote {
  stopId: number;
  visited: boolean;
  rating: number;
  notes: string;
}
