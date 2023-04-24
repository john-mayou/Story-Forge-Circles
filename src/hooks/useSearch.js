import { useState, useEffect, useRef } from 'react';

// Custom hook to compare the previous and current dependencies using JSON.stringify
const useDeepCompareEffect = (effect, dependencies) => {
  const prevDepsRef = useRef();

  useEffect(() => {
    // Compare the serialized versions of the previous and current dependencies
    if (JSON.stringify(prevDepsRef.current) !== JSON.stringify(dependencies)) {
      // Update the previous dependencies reference
      prevDepsRef.current = dependencies;
      // Call the effect function if the dependencies have changed
      effect();
    }
  });
};

const useSearch = (data, searchKeySelector) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // Use the custom deep compare effect hook to prevent unnecessary updates
  useDeepCompareEffect(() => {
    // If searchTerm is empty, set filteredData to the original data
    if (searchTerm === '') {
      setFilteredData(data);
    } else {
      // Filter the data based on the searchKeySelector and searchTerm
      const filtered = data.filter((item) =>
        searchKeySelector(item).toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data, searchKeySelector]);

  // Return the filtered data, searchTerm, and setSearchTerm function for use in other components
  return { filteredData, searchTerm, setSearchTerm };
};

export default useSearch;
