import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database schema
export interface User {
  id: string;
  email: string;
  phone?: string;
  name?: string;
  is_agent: boolean;
  created_at: string;
  updated_at: string;
}

export interface Location {
  id: string;
  name: string;
  type: 'emirate' | 'city' | 'area';
  parent_id?: string;
  latitude?: number;
  longitude?: number;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id?: string;
  icon?: string;
  color?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Listing {
  id: string;
  user_id: string;
  category_id: string;
  location_id: string;
  title: string;
  description?: string;
  price?: number;
  currency: string;
  phone: string;
  status: 'draft' | 'published' | 'expired' | 'sold';
  views_count: number;
  is_featured: boolean;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface MotorListing {
  id: string;
  listing_id: string;
  motor_type: string;
  make_model: string;
  trim?: string;
  regional_specs?: string;
  year?: number;
  kilometres?: number;
  body_type?: string;
  is_insured?: boolean;
  fuel_type?: string;
  exterior_colour?: string;
  interior_colour?: string;
  warranty?: string;
  transmission_type?: string;
  seating_capacity?: string;
  horse_power?: string;
  steering_hand?: string;
  created_at: string;
}

export interface JobListing {
  id: string;
  listing_id: string;
  job_title: string;
  job_role?: string;
  industry?: string;
  gender_preference?: string;
  employment_type?: string;
  is_remote: boolean;
  min_experience?: string;
  min_education?: string;
  monthly_salary?: string;
  company_name?: string;
  company_size?: string;
  nationality?: string;
  office_location_id?: string;
  created_at: string;
}

export interface PropertyListing {
  id: string;
  listing_id: string;
  property_type: 'Residential' | 'Commercial' | 'Land';
  property_subtype?: string;
  is_landlord: boolean;
  property_size?: string;
  total_closing_fee?: string;
  bedrooms?: string;
  developer?: string;
  ready_by?: string;
  annual_community_fee?: string;
  is_furnished?: string;
  property_reference_id?: string;
  buyer_transfer_fee?: string;
  seller_transfer_fee?: string;
  maintenance_fees?: string;
  occupancy_status?: string;
  ad_number?: string;
  rera_landlord_name?: string;
  rera_property_status?: string;
  zoned_for?: string;
  approved_building_area?: string;
  is_freehold?: boolean;
  youtube_url?: string;
  created_at: string;
}

export interface ClassifiedListing {
  id: string;
  listing_id: string;
  product_title: string;
  identifier_2?: string;
  identifier_3?: string;
  age_of_product?: string;
  usage_condition?: string;
  item_condition?: string;
  warranty?: string;
  created_at: string;
}

export interface ListingImage {
  id: string;
  listing_id: string;
  image_url: string;
  alt_text?: string;
  sort_order: number;
  created_at: string;
}

export interface Amenity {
  id: string;
  name: string;
  category: string;
  icon?: string;
  created_at: string;
}

export interface TechnicalFeature {
  id: string;
  name: string;
  category: string;
  created_at: string;
}