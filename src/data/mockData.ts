import { Country, City, TestDate } from '../types/testBooking';

export const countries: Country[] = [
  { id: 'uae', name: 'United Arab Emirates', code: 'AE' },
  { id: 'sa', name: 'Saudi Arabia', code: 'SA' },
  { id: 'qa', name: 'Qatar', code: 'QA' },
  { id: 'kw', name: 'Kuwait', code: 'KW' },
  { id: 'bh', name: 'Bahrain', code: 'BH' },
  { id: 'om', name: 'Oman', code: 'OM' },
  { id: 'eg', name: 'Egypt', code: 'EG' },
];

export const cities: City[] = [
  // UAE
  { id: 'dxb', name: 'Dubai', countryId: 'uae' },
  { id: 'auh', name: 'Abu Dhabi', countryId: 'uae' },
  { id: 'shj', name: 'Sharjah', countryId: 'uae' },
  
  // Saudi Arabia
  { id: 'ruh', name: 'Riyadh', countryId: 'sa' },
  { id: 'jed', name: 'Jeddah', countryId: 'sa' },
  { id: 'dmm', name: 'Dammam', countryId: 'sa' },
  
  // Qatar
  { id: 'doh', name: 'Doha', countryId: 'qa' },
  
  // Kuwait
  { id: 'kwc', name: 'Kuwait City', countryId: 'kw' },
  
  // Bahrain
  { id: 'mnh', name: 'Manama', countryId: 'bh' },
  
  // Oman
  { id: 'mct', name: 'Muscat', countryId: 'om' },
  
  // Egypt
  { id: 'cai', name: 'Cairo', countryId: 'eg' },
  { id: 'alx', name: 'Alexandria', countryId: 'eg' },
];

// Helper function to generate random dates
const generateRandomDates = (cityId: string): TestDate[] => {
  const dates: TestDate[] = [];
  const today = new Date();
  
  for (let i = 0; i < 6; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + (i * 7)); // One test per week
    
    dates.push({
      id: `${cityId}-${date.toISOString().split('T')[0]}`,
      cityId,
      date: date.toISOString().split('T')[0],
      available: Math.random() > 0.3, // 70% chance of being available
      testType: Math.random() > 0.5 ? 'Academic' : 'General Training',
      testMode: Math.random() > 0.5 ? 'Computer' : 'Paper',
    });
  }
  
  return dates;
};

// Generate test dates for all cities
export const testDates: TestDate[] = cities.flatMap(city => generateRandomDates(city.id)); 