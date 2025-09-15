import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create client if environment variables are properly configured
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

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