
export interface Suggestion {
  category: 'Bug' | 'Performance' | 'Style' | 'Best Practice' | 'Security';
  description: string;
  line_number: number;
  original_code: string;
  suggested_code: string;
}

export interface ReviewResult {
  overall_summary: string;
  suggestions: Suggestion[];
}

