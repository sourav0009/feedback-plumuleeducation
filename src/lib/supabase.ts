import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface GradeSection {
  id: string;
  name: string;
  grade_range: string;
  color: string;
  icon_emoji: string;
  sort_order: number;
  created_at: string;
}

export interface Question {
  id: string;
  grade_section_id: string;
  question_text: string;
  question_number: number;
  correct_option: string;
  created_at: string;
}

export interface QuestionOption {
  id: string;
  question_id: string;
  option_letter: string;
  image_url: string;
  label: string;
  created_at: string;
}
