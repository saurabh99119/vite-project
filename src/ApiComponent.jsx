import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const ApiComponent = ({ apiUrl, onDataFetched }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const api = async () => {
    try {
      const res = await fetch(apiUrl);

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error:', error);

      // Call the ApiComponent again with a static URL
      const staticApiUrl = 'https://lust.scathach.id/Xvideos/search?key=milf&page=1';

      try {
        const dataArray = await fetch(staticApiUrl).then((response) => response.json());
        return dataArray;
      } catch (error) {
        console.log(error);
      }

      // Use navigate instead of history.push
      navigate('/');
      return [];
    }
  };

  const fetchData = async () => {
    try {
      const dataArray = await api();
      setData(dataArray.data);
      console.log(dataArray.data);
      onDataFetched(dataArray.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiUrl]);

  return null;
};

export default ApiComponent;
