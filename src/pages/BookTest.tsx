import React, { useState, useEffect } from 'react';
import { Country, City, TestDateWithLocation } from '../types/testBooking';
import { testBookingService } from '../services/testBookingService';

const BookTest: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [testDates, setTestDates] = useState<TestDateWithLocation[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        const data = await testBookingService.getCountries();
        setCountries(data);
      } catch (err) {
        setError('Failed to load countries');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  useEffect(() => {
    const loadCities = async () => {
      if (!selectedCountry) {
        setCities([]);
        return;
      }

      try {
        setLoading(true);
        const data = await testBookingService.getCitiesByCountry(selectedCountry);
        setCities(data);
        setSelectedCity(''); // Reset city selection
        setTestDates([]); // Reset test dates
      } catch (err) {
        setError('Failed to load cities');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCities();
  }, [selectedCountry]);

  const handleSearch = async () => {
    if (!selectedCity) return;

    try {
      setLoading(true);
      setError(null);
      const data = await testBookingService.getTestDatesByCity(selectedCity, fromDate, toDate);
      setTestDates(data);
      setHasSearched(true);
    } catch (err) {
      setError('Failed to load test dates');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    setHasSearched(false);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
    setHasSearched(false);
  };

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(e.target.value);
    setHasSearched(false);
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(e.target.value);
    setHasSearched(false);
  };

  const handleResetDates = () => {
    setFromDate('');
    setToDate('');
    setHasSearched(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Book Your IELTS Test
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Select your preferred location and test date
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  disabled={loading}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 shadow-sm transition duration-150 ease-in-out"
                >
                  <option value="">Choose a country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={`transition-opacity duration-200 ${!selectedCountry ? 'opacity-50' : ''}`}>
                <label 
                  htmlFor="city" 
                  className={`block text-sm font-semibold mb-2 ${
                    !selectedCountry ? 'text-gray-500' : 'text-gray-700'
                  }`}
                >
                  Select City
                </label>
                <select
                  id="city"
                  name="city"
                  value={selectedCity}
                  onChange={handleCityChange}
                  disabled={loading || !selectedCountry}
                  className={`block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-150 ease-in-out ${
                    !selectedCountry 
                      ? 'bg-gray-50 text-gray-400 cursor-not-allowed' 
                      : 'bg-white text-gray-900'
                  }`}
                >
                  <option value="">Choose a city</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {!selectedCountry && (
                  <p className="mt-1 text-sm text-gray-500">Please select a country first</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`transition-opacity duration-200 ${!selectedCity ? 'opacity-50' : ''}`}>
                <label 
                  htmlFor="fromDate" 
                  className={`block text-sm font-semibold mb-2 ${
                    !selectedCity ? 'text-gray-500' : 'text-gray-700'
                  }`}
                >
                  From Date
                </label>
                <input
                  type="date"
                  id="fromDate"
                  name="fromDate"
                  value={fromDate}
                  onChange={handleFromDateChange}
                  min={today}
                  disabled={loading || !selectedCity}
                  className={`block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-150 ease-in-out ${
                    !selectedCity 
                      ? 'bg-gray-50 text-gray-400 cursor-not-allowed' 
                      : 'bg-white text-gray-900'
                  }`}
                />
                {!selectedCity && (
                  <p className="mt-1 text-sm text-gray-500">Please select a city first</p>
                )}
              </div>
              <div className={`transition-opacity duration-200 ${!selectedCity ? 'opacity-50' : ''}`}>
                <label 
                  htmlFor="toDate" 
                  className={`block text-sm font-semibold mb-2 ${
                    !selectedCity ? 'text-gray-500' : 'text-gray-700'
                  }`}
                >
                  To Date
                </label>
                <input
                  type="date"
                  id="toDate"
                  name="toDate"
                  value={toDate}
                  onChange={handleToDateChange}
                  min={fromDate || today}
                  disabled={loading || !selectedCity}
                  className={`block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-150 ease-in-out ${
                    !selectedCity 
                      ? 'bg-gray-50 text-gray-400 cursor-not-allowed' 
                      : 'bg-white text-gray-900'
                  }`}
                />
                {!selectedCity && (
                  <p className="mt-1 text-sm text-gray-500">Please select a city first</p>
                )}
              </div>
            </div>

            <div className="flex justify-center items-center gap-4 pt-4">
              {(fromDate || toDate) && (
                <button
                  onClick={handleResetDates}
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Reset Dates
                </button>
              )}
              <button
                onClick={handleSearch}
                disabled={loading || !selectedCountry || !selectedCity}
                className={`px-8 py-3 rounded-lg text-base font-semibold transition duration-150 ease-in-out ${
                  !selectedCountry || !selectedCity
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Searching...
                  </div>
                ) : (
                  'Search Available Dates'
                )}
              </button>
            </div>

            {loading && (
              <div className="flex justify-center items-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
                <span className="ml-3 text-gray-600">Loading...</span>
              </div>
            )}

            {error && (
              <div className="text-center py-8">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  Try Again
                </button>
              </div>
            )}

            {hasSearched && (
              testDates.length > 0 ? (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Test Dates</h2>
                  <div className="grid gap-4">
                    {testDates.map((testDate) => (
                      <div
                        key={testDate.id}
                        className="group relative bg-white rounded-xl border border-gray-200 hover:border-blue-500 transition duration-150 ease-in-out overflow-hidden"
                      >
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="space-y-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {formatDate(testDate.date)}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {testDate.city.name}, {testDate.country.name}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                                  {testDate.testType}
                                </span>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                                  {testDate.testMode}
                                </span>
                              </div>
                            </div>
                            <div className="mt-4 md:mt-0">
                              <button
                                disabled={!testDate.available}
                                className={`w-full md:w-auto px-6 py-3 rounded-lg text-sm font-semibold transition duration-150 ease-in-out ${
                                  testDate.available
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                              >
                                {testDate.available ? 'Book Now' : 'Fully Booked'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No test dates available for the selected criteria.</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTest; 