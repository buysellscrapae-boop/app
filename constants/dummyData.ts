import { 
  Home, 
  Sofa, 
  Tv, 
  Lamp, 
  Drill, 
  Shirt, 
  Building, 
  Landmark, 
  ClipboardList,
  Bed,
  ChefHat,
  Lightbulb,
  Wrench,
  Archive,
  Car,
  Smartphone,
  Watch,
  Headphones,
  Camera,
  Gamepad2
} from 'lucide-react-native';

// Enhanced categories with better iconography and organization
export const CATEGORIES = [
  // Living Room
  { name: 'Sofas & Seating', icon: Sofa, color: '#2563EB', category: 'furniture' },
  { name: 'Tables & Storage', icon: Archive, color: '#059669', category: 'furniture' },
  { name: 'Entertainment', icon: Tv, color: '#DC2626', category: 'furniture' },
  
  // Bedroom
  { name: 'Beds & Mattresses', icon: Bed, color: '#7C3AED', category: 'furniture' },
  { name: 'Wardrobes', icon: Archive, color: '#DB2777', category: 'furniture' },
  
  // Kitchen & Appliances
  { name: 'Kitchen Appliances', icon: ChefHat, color: '#EA580C', category: 'furniture' },
  
  // Lighting & Decor
  { name: 'Lighting', icon: Lightbulb, color: '#F59E0B', category: 'furniture' },
  { name: 'Home Decor', icon: Lamp, color: '#10B981', category: 'furniture' },
  
  // Tools & Hardware
  { name: 'Tools & Hardware', icon: Drill, color: '#6366F1', category: 'furniture' },
  { name: 'Garden Tools', icon: Wrench, color: '#84CC16', category: 'furniture' },
  
  // Electronics
  { name: 'Mobile Phones', icon: Smartphone, color: '#06B6D4', category: 'electronics' },
  { name: 'Laptops & Computers', icon: Tv, color: '#8B5CF6', category: 'electronics' },
  { name: 'Audio & Headphones', icon: Headphones, color: '#F97316', category: 'electronics' },
  { name: 'Cameras', icon: Camera, color: '#EF4444', category: 'electronics' },
  { name: 'Gaming', icon: Gamepad2, color: '#22C55E', category: 'electronics' },
  { name: 'Wearables', icon: Watch, color: '#A855F7', category: 'electronics' },
  
  // Vehicles
  { name: 'Cars', icon: Car, color: '#DC2626', category: 'vehicles' },
  
  // Fashion
  { name: 'Clothing', icon: Shirt, color: '#EC4899', category: 'fashion' },
  
  // Property
  { name: 'Residential Rent', icon: Home, color: '#059669', category: 'property' },
  { name: 'Residential Sale', icon: Building, color: '#DC2626', category: 'property' },
  { name: 'Commercial', icon: Landmark, color: '#7C3AED', category: 'property' },
  { name: 'Off-Plan', icon: ClipboardList, color: '#F59E0B', category: 'property' },
];

// Enhanced listings with better categorization
export const LISTINGS = [
  {
    id: '1',
    title: 'Modern Leather Sofa',
    price: '1,200 AED',
    category: 'Sofas & Seating',
    image: 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Slightly used modern leather sofa, great condition. No pets, no smoking household.',
    seller: 'Ahmed M.',
    location: 'Dubai Marina',
    featured: true,
  },
  {
    id: '2',
    title: 'Samsung 55" 4K Smart TV',
    price: '1,500 AED',
    category: 'Entertainment',
    image: 'https://images.pexels.com/photos/5721865/pexels-photo-5721865.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: '2 years old, perfect working condition with remote and original box.',
    seller: 'Fatima K.',
    location: 'Downtown Dubai',
    featured: true,
  },
  {
    id: '3',
    title: 'iPhone 14 Pro Max',
    price: '3,200 AED',
    category: 'Mobile Phones',
    image: 'https://images.pexels.com/photos/14740599/pexels-photo-14740599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Excellent condition, 256GB, with original box and accessories.',
    seller: 'Omar S.',
    location: 'Business Bay',
    featured: true,
  },
  {
    id: '4',
    title: 'MacBook Pro M2',
    price: '4,500 AED',
    category: 'Laptops & Computers',
    image: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: '13-inch, 512GB SSD, barely used, perfect for professionals.',
    seller: 'Sara B.',
    location: 'Jumeirah',
    featured: true,
  },
  {
    id: '5',
    title: 'King Size Bed Frame',
    price: '800 AED',
    category: 'Beds & Mattresses',
    image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Solid wood frame, excellent condition, mattress not included.',
    seller: 'Layla R.',
    location: 'Al Barsha',
    featured: false,
  },
  {
    id: '6',
    title: 'Designer Table Lamp',
    price: '250 AED',
    category: 'Lighting',
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Beautiful modern lamp, adds character to any room. LED bulb included.',
    seller: 'Ahmed H.',
    location: 'Deira',
    featured: false,
  },
];

// Property data for residential and commercial sections
export const RESIDENTIAL_PROPERTIES = [
  {
    id: '1',
    price: 'AED 36,999',
    title: '2 Beds • 2 Baths',
    location: 'Bu Daniq',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'apartment',
    area: '1,200 sq ft'
  },
  {
    id: '2',
    price: 'AED 39,999',
    title: '1 Bed • 2 Baths',
    location: 'Al Majaz 1, Al Majaz',
    image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'apartment',
    area: '900 sq ft'
  },
  {
    id: '3',
    price: 'AED 18,999',
    title: 'Studio • 1 Bath',
    location: 'Muwaileh',
    image: 'https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'studio',
    area: '500 sq ft'
  }
];

export const COMMERCIAL_PROPERTIES = [
  {
    id: '1',
    price: 'AED 3,500,000',
    title: '4 Beds • 5 Baths',
    location: 'Shoumous Residence',
    image: 'https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'villa',
    area: '3,500 sq ft'
  },
  {
    id: '2',
    price: 'AED 9,501,000',
    title: '2 Beds • 3 Baths',
    location: 'DAMAC Bay Tower',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'penthouse',
    area: '2,200 sq ft'
  },
  {
    id: '3',
    price: 'AED 4,800,000',
    title: '5 Beds • 6 Baths',
    location: 'Shoumous',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'villa',
    area: '4,000 sq ft'
  }
];

export const EMIRATES = [
  'Abu Dhabi',
  'Ajman',
  'Al Ain',
  'Dubai',
  'Fujairah',
  'Ras Al Khaimah',
  'Sharjah',
  'Umm Al Quwain',
];

// Property types for the grid
export const PROPERTY_TYPES = [
  { id: 'villa', name: 'Villa', icon: '🏠', color: '#059669' },
  { id: 'apartment', name: 'Apartments', icon: '🏢', color: '#2563EB' },
  { id: 'studio', name: 'Studio', icon: '🏠', color: '#7C3AED' },
  { id: 'penthouse', name: 'Penthouse', icon: '🏙️', color: '#DC2626' },
  { id: 'townhouse', name: 'Townhouse', icon: '🏘️', color: '#F59E0B' },
  { id: 'office', name: 'Office', icon: '🏢', color: '#6366F1' },
  { id: 'retail', name: 'Retail', icon: '🏪', color: '#EC4899' },
  { id: 'warehouse', name: 'Warehouse', icon: '🏭', color: '#84CC16' },
];