import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://feqvowvntmgnebgyyyix.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlcXZvd3ZudG1nbmViZ3l5eWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NDMzNDIsImV4cCI6MjA3MzAxOTM0Mn0.A7mG5-3EFBFBHFiOFe1N5vqDTXRL44MVjWLrGzXoh2o";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Temporary console logs to verify environment variables
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey);


// Types for our database
export interface MotorsListing {
  id: string;
  user_id: string;
  motor_type: string;
  emirate: string;
  make_model: string;
  trim?: string;
  regional_specs: string;
  year: string;
  kilometres: string;
  body_type: string;
  is_insured: boolean;
  price: string;
  phone_number: string;
  post_title?: string;
  description?: string;
  fuel_type?: string;
  exterior_colour?: string;
  interior_colour?: string;
  warranty?: string;
  transmission_type?: string;
  seating_capacity?: string;
  horse_power?: string;
  steering_hand?: string;
  technical_features?: string[];
  location?: string;
  status: 'draft' | 'published' | 'sold' | 'inactive';
  created_at: string;
  updated_at: string;
}