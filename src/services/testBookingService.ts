import { Country, City, TestDate, TestDateWithLocation, TestLocation } from '../types/testBooking';
import { countries, cities, testDates } from '../data/mockData';

export interface TestBookingService {
  getCountries(): Promise<Country[]>;
  getCitiesByCountry(countryId: string): Promise<City[]>;
  getTestDatesByCity(cityId: string, fromDate?: string, toDate?: string): Promise<TestDateWithLocation[]>;
  getTestLocations(): Promise<TestLocation[]>;
}

class TestBookingServiceImpl implements TestBookingService {
  async getCountries(): Promise<Country[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return countries;
  }

  async getCitiesByCountry(countryId: string): Promise<City[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return cities.filter(city => city.countryId === countryId);
  }

  async getTestDatesByCity(cityId: string, fromDate?: string, toDate?: string): Promise<TestDateWithLocation[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredDates = testDates.filter(testDate => testDate.cityId === cityId);

    // Apply date filtering if dates are provided
    if (fromDate || toDate) {
      filteredDates = filteredDates.filter(testDate => {
        const testDateObj = new Date(testDate.date);
        const fromDateObj = fromDate ? new Date(fromDate) : null;
        const toDateObj = toDate ? new Date(toDate) : null;

        if (fromDateObj && toDateObj) {
          return testDateObj >= fromDateObj && testDateObj <= toDateObj;
        } else if (fromDateObj) {
          return testDateObj >= fromDateObj;
        } else if (toDateObj) {
          return testDateObj <= toDateObj;
        }
        return true;
      });
    }

    // Add city and country information
    return filteredDates.map(testDate => {
      const city = cities.find(c => c.id === testDate.cityId)!;
      const country = countries.find(c => c.id === city.countryId)!;
      return {
        ...testDate,
        city,
        country,
      };
    });
  }

  async getTestLocations(): Promise<TestLocation[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return countries.map(country => ({
      country,
      cities: cities.filter(city => city.countryId === country.id),
    }));
  }
}

// Export a singleton instance
export const testBookingService = new TestBookingServiceImpl(); 