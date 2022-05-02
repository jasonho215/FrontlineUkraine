export interface What3WordsSuggestion {
  country: string;
  nearestPlace: string;
  words: string;
  rank: number;
  language: string;
}

export interface What3WordsAutoSuggestionResponse {
  suggestions: What3WordsSuggestion[];
}