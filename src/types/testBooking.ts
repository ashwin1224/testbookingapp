export interface Country {
  id: string;
  name: string;
  code: string;
}

export interface City {
  id: string;
  name: string;
  countryId: string;
}

export interface TestDate {
  id: string;
  cityId: string;
  date: string;
  available: boolean;
  testType: 'Academic' | 'General Training';
  testMode: 'Computer' | 'Paper';
}

export interface TestLocation {
  country: Country;
  cities: City[];
}

export interface TestDateWithLocation extends TestDate {
  city: City;
  country: Country;
} 