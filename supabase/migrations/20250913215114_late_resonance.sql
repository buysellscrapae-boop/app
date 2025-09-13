/*
  # Create comprehensive listings schema for UAE classifieds platform

  1. Core Tables
    - `users` - User profiles and contact information
    - `locations` - Emirates, cities, and GPS coordinates
    - `categories` - Hierarchical category structure
    - `listings` - Main listing data with common fields

  2. Category-Specific Tables
    - `motor_listings` - Vehicle-specific fields
    - `job_listings` - Employment-specific fields
    - `property_listings` - Real estate-specific fields
    - `classified_listings` - General item-specific fields

  3. Supporting Tables
    - `listing_images` - Image storage and management
    - `amenities` - Property amenities reference
    - `technical_features` - Motor features reference

  4. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Core Tables
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  phone text,
  name text,
  is_agent boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('emirate', 'city', 'area')),
  parent_id uuid REFERENCES locations(id),
  latitude decimal,
  longitude decimal,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  parent_id uuid REFERENCES categories(id),
  icon text,
  color text,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  category_id uuid REFERENCES categories(id) NOT NULL,
  location_id uuid REFERENCES locations(id) NOT NULL,
  title text NOT NULL,
  description text,
  price decimal,
  currency text DEFAULT 'AED',
  phone text NOT NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'expired', 'sold')),
  views_count integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Category-Specific Tables
CREATE TABLE IF NOT EXISTS motor_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  motor_type text NOT NULL CHECK (motor_type IN ('Car', 'Motorcycle', 'Auto Accessories & Parts', 'Heavy Vehicles', 'Boats', 'Number Plates')),
  make_model text NOT NULL,
  trim text,
  regional_specs text CHECK (regional_specs IN ('GCC', 'American', 'Canadian', 'European', 'Japanese', 'Korean', 'Chinese', 'Other')),
  year integer CHECK (year >= 1921 AND year <= 2026),
  kilometres integer,
  body_type text CHECK (body_type IN ('SUV', 'Coupe', 'Sedan', 'Crossover', 'Convertible', 'Hard Top', 'Pickup Truck', 'Hatchback', 'Soft Top Convertible', 'Sports Car', 'Van', 'Wagon', 'Utility Truck', 'Others')),
  is_insured boolean,
  fuel_type text CHECK (fuel_type IN ('Petrol', 'Diesel', 'Hybrid', 'Electric')),
  exterior_colour text,
  interior_colour text,
  warranty text CHECK (warranty IN ('Yes', 'No', 'Does Not Apply')),
  transmission_type text CHECK (transmission_type IN ('Manual', 'Automatic')),
  seating_capacity text CHECK (seating_capacity IN ('2', '4', '5', '6', '7', '8', '8+')),
  horse_power text,
  steering_hand text CHECK (steering_hand IN ('Left', 'Right')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS job_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  job_title text NOT NULL,
  job_role text,
  industry text,
  gender_preference text CHECK (gender_preference IN ('Male', 'Female', 'Any')),
  employment_type text CHECK (employment_type IN ('Full-time', 'Part-time', 'Contract', 'Temporary')),
  is_remote boolean DEFAULT false,
  min_experience text,
  min_education text CHECK (min_education IN ('High School / Secondary', 'Bachelors', 'Masters', 'PhD', 'Not Applicable')),
  monthly_salary text,
  company_name text,
  company_size text CHECK (company_size IN ('1–10 employees', '11–50', '51–200', '200–500', '500–1000', '1000–5000', '5000–10,000', 'More than 10,000')),
  nationality text,
  office_location_id uuid REFERENCES locations(id),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS property_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  property_type text NOT NULL CHECK (property_type IN ('Residential', 'Commercial', 'Land')),
  property_subtype text,
  is_landlord boolean DEFAULT true,
  property_size text,
  total_closing_fee text,
  bedrooms text,
  developer text,
  ready_by date,
  annual_community_fee text,
  is_furnished text CHECK (is_furnished IN ('Furnished', 'Non-Furnished', 'Unfurnished', 'Optional')),
  property_reference_id text,
  buyer_transfer_fee text,
  seller_transfer_fee text,
  maintenance_fees text,
  occupancy_status text CHECK (occupancy_status IN ('Vacant', 'Occupied')),
  ad_number text,
  rera_landlord_name text,
  rera_property_status text CHECK (rera_property_status IN ('Complete', 'Incomplete')),
  zoned_for text CHECK (zoned_for IN ('Residential', 'Commercial', 'Retail', 'Industrial', 'Mixed Use')),
  approved_building_area text,
  is_freehold boolean,
  youtube_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS classified_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  product_title text NOT NULL,
  identifier_2 text,
  identifier_3 text,
  age_of_product text CHECK (age_of_product IN ('Brand New', '0–1 months', '1–6 months', '6–12 months', '1–2 years', '2–5 years', '10 years', '10+ years')),
  usage_condition text CHECK (usage_condition IN ('Never Used', 'Used Once', 'Light Usage', 'Normal Usage', 'Heavy Usage')),
  item_condition text CHECK (item_condition IN ('Flawless', 'Excellent', 'Good', 'Average')),
  warranty text CHECK (warranty IN ('Yes', 'No', 'Does Not Apply')),
  created_at timestamptz DEFAULT now()
);

-- Supporting Tables
CREATE TABLE IF NOT EXISTS listing_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  image_url text NOT NULL,
  alt_text text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS amenities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  icon text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS technical_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS listing_amenities (
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE,
  amenity_id uuid REFERENCES amenities(id) ON DELETE CASCADE,
  PRIMARY KEY (listing_id, amenity_id)
);

CREATE TABLE IF NOT EXISTS listing_technical_features (
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE,
  feature_id uuid REFERENCES technical_features(id) ON DELETE CASCADE,
  PRIMARY KEY (listing_id, feature_id)
);

CREATE TABLE IF NOT EXISTS job_languages (
  listing_id uuid REFERENCES job_listings(listing_id) ON DELETE CASCADE,
  language text NOT NULL,
  PRIMARY KEY (listing_id, language)
);

CREATE TABLE IF NOT EXISTS job_benefits (
  listing_id uuid REFERENCES job_listings(listing_id) ON DELETE CASCADE,
  benefit text NOT NULL,
  PRIMARY KEY (listing_id, benefit)
);

-- Insert initial data
INSERT INTO locations (name, type) VALUES
  ('Abu Dhabi', 'emirate'),
  ('Ajman', 'emirate'),
  ('Al Ain', 'emirate'),
  ('Dubai', 'emirate'),
  ('Fujairah', 'emirate'),
  ('Ras Al Khaimah', 'emirate'),
  ('Sharjah', 'emirate'),
  ('Umm Al Quwain', 'emirate');

INSERT INTO categories (name, slug, icon, color) VALUES
  ('Motors', 'motors', '🚗', '#DC2626'),
  ('Jobs', 'jobs', '💼', '#059669'),
  ('Property for Sale', 'property-sale', '🏠', '#2563EB'),
  ('Property for Rent', 'property-rent', '🏢', '#7C3AED'),
  ('All Classifieds', 'classifieds', '📦', '#F59E0B');

-- Insert amenities
INSERT INTO amenities (name, category) VALUES
  ('Maid''s Room', 'residential'),
  ('Study', 'residential'),
  ('Central Air Conditioning & Heating', 'residential'),
  ('Concierge Service', 'residential'),
  ('Balcony', 'residential'),
  ('Private Garden', 'residential'),
  ('Private Pool', 'residential'),
  ('Private Gym', 'residential'),
  ('Private Jacuzzi', 'residential'),
  ('Shared Pool', 'both'),
  ('Shared Spa', 'both'),
  ('Shared Gym', 'both'),
  ('Security', 'both'),
  ('Maid Service', 'residential'),
  ('Covered Parking', 'both'),
  ('Built-in Wardrobes', 'residential'),
  ('Walk-in Closet', 'residential'),
  ('Built-in Kitchen Appliances', 'residential'),
  ('View of Water', 'both'),
  ('View of Landmark', 'both'),
  ('Pets Allowed', 'residential'),
  ('Double-Glazed Windows', 'residential'),
  ('Daycare Center', 'residential'),
  ('Electricity Backup', 'both'),
  ('First Aid Medical Center', 'both'),
  ('Service Elevators', 'both'),
  ('Prayer Room', 'both'),
  ('Laundry Room', 'both'),
  ('Broadband Internet', 'both'),
  ('Satellite / Cable TV', 'both'),
  ('Business Center', 'commercial'),
  ('Intercom', 'both'),
  ('ATM Facility', 'both'),
  ('Kids Play Area', 'residential'),
  ('Reception / Waiting Room', 'commercial'),
  ('Maintenance Staff', 'both'),
  ('CCTV Security', 'both'),
  ('Cafeteria / Canteen', 'both'),
  ('Shared Kitchen', 'both'),
  ('Facilities for Disabled', 'both'),
  ('Storage Areas', 'both'),
  ('Cleaning Services', 'both'),
  ('Barbecue Area', 'residential'),
  ('Lobby in Building', 'both'),
  ('Waste Disposal', 'both'),
  ('Conference Room', 'commercial'),
  ('Available Furnished', 'commercial'),
  ('Available Network', 'commercial'),
  ('Dining in Building', 'commercial'),
  ('Retail in Building', 'commercial');

-- Insert technical features
INSERT INTO technical_features (name, category) VALUES
  ('Cruise Control', 'motor'),
  ('Front Airbags', 'motor'),
  ('Dual Exhaust', 'motor'),
  ('ABS', 'motor'),
  ('All-Wheel Drive', 'motor'),
  ('Side Airbags', 'motor'),
  ('Power Steering', 'motor'),
  ('Entourage System', 'motor'),
  ('All-Wheel Steering', 'motor'),
  ('4-Wheel Drive', 'motor'),
  ('Rear-Wheel Drive', 'motor'),
  ('Tiptronic Gears', 'motor'),
  ('Front-Wheel Drive', 'motor');

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE motor_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE classified_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE technical_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_technical_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_benefits ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own data" ON users FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "Locations are publicly readable" ON locations FOR SELECT TO authenticated USING (true);

CREATE POLICY "Categories are publicly readable" ON categories FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can read all published listings" ON listings FOR SELECT TO authenticated USING (status = 'published' OR user_id = auth.uid());
CREATE POLICY "Users can create own listings" ON listings FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own listings" ON listings FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can delete own listings" ON listings FOR DELETE TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Motor listings follow parent listing policy" ON motor_listings FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM listings WHERE listings.id = motor_listings.listing_id AND (listings.status = 'published' OR listings.user_id = auth.uid()))
);

CREATE POLICY "Job listings follow parent listing policy" ON job_listings FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM listings WHERE listings.id = job_listings.listing_id AND (listings.status = 'published' OR listings.user_id = auth.uid()))
);

CREATE POLICY "Property listings follow parent listing policy" ON property_listings FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM listings WHERE listings.id = property_listings.listing_id AND (listings.status = 'published' OR listings.user_id = auth.uid()))
);

CREATE POLICY "Classified listings follow parent listing policy" ON classified_listings FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM listings WHERE listings.id = classified_listings.listing_id AND (listings.status = 'published' OR listings.user_id = auth.uid()))
);

CREATE POLICY "Listing images follow parent listing policy" ON listing_images FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM listings WHERE listings.id = listing_images.listing_id AND (listings.status = 'published' OR listings.user_id = auth.uid()))
);

CREATE POLICY "Amenities are publicly readable" ON amenities FOR SELECT TO authenticated USING (true);
CREATE POLICY "Technical features are publicly readable" ON technical_features FOR SELECT TO authenticated USING (true);

CREATE POLICY "Listing amenities follow parent listing policy" ON listing_amenities FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM listings WHERE listings.id = listing_amenities.listing_id AND (listings.status = 'published' OR listings.user_id = auth.uid()))
);

CREATE POLICY "Listing technical features follow parent listing policy" ON listing_technical_features FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM listings WHERE listings.id = listing_technical_features.listing_id AND (listings.status = 'published' OR listings.user_id = auth.uid()))
);

CREATE POLICY "Job languages follow parent listing policy" ON job_languages FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM job_listings jl JOIN listings l ON l.id = jl.listing_id WHERE jl.listing_id = job_languages.listing_id AND (l.status = 'published' OR l.user_id = auth.uid()))
);

CREATE POLICY "Job benefits follow parent listing policy" ON job_benefits FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM job_listings jl JOIN listings l ON l.id = jl.listing_id WHERE jl.listing_id = job_benefits.listing_id AND (l.status = 'published' OR l.user_id = auth.uid()))
);