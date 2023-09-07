import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import ApiComponent from './ApiComponent';
import Nav from './Nav';

function App() {
  const [fetchedData, setFetchedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [btndisable,setbtndisable] = useState(false);
  const pageSize = 16;
let nextPageNumber = 1;
  useEffect(() => {
    // Fetch random nxx videos using Axios or any other method here
    // Example:
    // fetch('your-api-endpoint')
    //   .then((response) => response.json())
    //   .then((data) => setFetchedData(data));
  }, []); // Empty dependency array to fetch data once when the component mounts

  useEffect(() => {
    updateCurrentData();
  }, [fetchedData, currentPage]);

  const updateCurrentData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const newData = fetchedData.slice(startIndex, endIndex);
    setCurrentData(newData);
  };
  const nextPage = () => {
    if (currentPage < Math.ceil(fetchedData.length / pageSize)) {
      setCurrentPage(currentPage + 1);
      console.log(fetchedData)
    } else if (currentPage == Math.ceil(fetchedData.length / pageSize)) {
      // No more pages available, make an additional API request
      nextPageNumber = nextPageNumber + 1;
      const nextPageUrl =  searchTerm ? searchTerm : `https://lust.scathach.id/Xvideos/search?key=milf&page=${nextPageNumber}`;
      fetch(nextPageUrl)
        .then((response) => response.json())
        .then((data) => {
          
          const newData = data.data;
            // Additional data found, append the new data and increment the page
            setFetchedData([...fetchedData, ...newData]);
            setCurrentPage(currentPage + 1);
        })
        .catch((error) => {
          console.error('Error fetching additional data:', error);
        });
    }
  };
  

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onDataFetched = (data) => {
    setFetchedData(data);
  };

  const handleSearch = (term) => {
    const searchUrl = `https://lust.scathach.id/Xvideos/search?key=${term}&page=1`;
    setSearchTerm(searchUrl);
  };

  return (
    <>
      <Nav handleSearch={handleSearch} />
      <div className='main'>
        <ApiComponent apiUrl={searchTerm ? searchTerm : "https://lust.scathach.id/Xvideos/search?key=milf&page=1"} onDataFetched={onDataFetched} />
        <div className='video-container'>
          {currentData.map((video) => (
            <div key={video.id} className="video">
              <Link to="/player" state={video}>
                <img
                  className="video-thumb"
                  src={video.image}
                  alt={video.title}
                  width="640"
                  height="360"
                />
              </Link>
              <p className="duration">{video.duration}</p>
              <div className="info">
                <h2>{video.title}</h2>
                <h2>{video.views}</h2>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button onClick={previousPage} disabled={currentPage === 1}>
            Previous Page
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={nextPage}
            
          
          >
            Next Page
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
