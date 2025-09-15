/*
  # Create motors listings table

  1. New Tables
    - `motors_listings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `motor_type` (text)
      - `emirate` (text)
      - `make_model` (text)
      - `trim` (text)
      - `regional_specs` (text)
      - `year` (text)
      - `kilometres` (text)
      - `body_type` (text)
      - `is_insured` (boolean)
      - `price` (text)
      - `phone_number` (text)
      - `post_title` (text)
      - `description` (text)
      - `fuel_type` (text)
      - `exterior_colour` (text)
      - `interior_colour` (text)
      - `warranty` (text)
      - `transmission_type` (text)
      - `seating_capacity` (text)
      - `horse_power` (text)
      - `steering_hand` (text)
      - `technical_features` (text[])
      - `location` (text)
      - `status` (text, default 'draft')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `motors_listings` table
    - Add policies for authenticated users to manage their own listings
*/

CREATE TABLE IF NOT EXISTS motors_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  motor_type text NOT NULL,
  emirate text NOT NULL,
  make_model text NOT NULL,
  trim text DEFAULT '',
  regional_specs text NOT NULL,
  year text NOT NULL,
  kilometres text NOT NULL,
  body_type text NOT NULL,
  is_insured boolean NOT NULL,
  price text NOT NULL,
  phone_number text NOT NULL,
  post_title text DEFAULT '',
  description text DEFAULT '',
  fuel_type text DEFAULT '',
  exterior_colour text DEFAULT '',
  interior_colour text DEFAULT '',
  warranty text DEFAULT '',
  transmission_type text DEFAULT '',
  seating_capacity text DEFAULT '',
  horse_power text DEFAULT '',
  steering_hand text DEFAULT '',
  technical_features text[] DEFAULT '{}',
  location text DEFAULT '',
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'sold', 'inactive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE motors_listings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own listings"
  ON motors_listings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own listings"
  ON motors_listings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own listings"
  ON motors_listings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own listings"
  ON motors_listings
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Public can view published listings
CREATE POLICY "Anyone can view published listings"
  ON motors_listings
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_motors_listings_updated_at
  BEFORE UPDATE ON motors_listings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();