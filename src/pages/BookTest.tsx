import React, { useState } from 'react';

interface TestDate {
  date: string;
  available: boolean;
  location: string;
}

const BookTest: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [testDates, setTestDates] = useState<TestDate[]>([]);

  const countries = [
    { id: 'us', name: 'United States' },
    { id: 'uk', name: 'United Kingdom' },
    { id: 'ca', name: 'Canada' },
    { id: 'au', name: 'Australia' },
  ];

  const cities = {
    us: ['New York', 'Los Angeles', 'Chicago'],
    uk: ['London', 'Manchester', 'Birmingham'],
    ca: ['Toronto', 'Vancouver', 'Montreal'],
    au: ['Sydney', 'Melbourne', 'Brisbane'],
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedCity('');
    setTestDates([]);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    setSelectedCity(city);
    // Simulate fetching test dates
    const mockDates: TestDate[] = [
      { date: '2024-04-15', available: true, location: city },
      { date: '2024-04-22', available: true, location: city },
      { date: '2024-04-29', available: false, location: city },
    ];
    setTestDates(mockDates);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Book Your IELTS Test
        </h1>

        <div className="space-y-6">
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Select Country
            </label>
            <select
              id="country"
              name="country"
              value={selectedCountry}
              onChange={handleCountryChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {selectedCountry && (
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                Select City
              </label>
              <select
                id="city"
                name="city"
                value={selectedCity}
                onChange={handleCityChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Select a city</option>
                {cities[selectedCountry as keyof typeof cities]?.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          )}

          {testDates.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Available Test Dates</h2>
              <div className="space-y-4">
                {testDates.map((testDate) => (
                  <div
                    key={testDate.date}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(testDate.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">{testDate.location}</p>
                    </div>
                    <button
                      disabled={!testDate.available}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        testDate.available
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {testDate.available ? 'Book Now' : 'Fully Booked'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookTest; 