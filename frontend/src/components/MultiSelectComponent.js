import React, { useState, useEffect } from 'react';
import AsyncSelect  from 'react-select/async';
import axios from 'axios';
import { publicApi } from '../services/api';

const MultiSelectComponent = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const fetchOptions = async (inputValue) => {
    try {
      const response = await publicApi.get("/author/getallauthors", {
        params: {input_word: inputValue },
      });
      const newOptions = response.data[0].map(item => ({
        value: item.authorid,
        label: item.authorid
      }));
      return newOptions;
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  return (
    <AsyncSelect
      isMulti
      cacheOptions
      loadOptions={fetchOptions}
      defaultOptions
      onChange={handleChange}
      value={selectedOptions}
      placeholder="Select options..."
    />
  );
};

export default MultiSelectComponent;