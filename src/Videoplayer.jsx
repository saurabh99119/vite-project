import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ApiComponent from "./ApiComponent";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import tag from "./Tag";

const Videoplayer = () => {
  const location = useLocation();
  const videoData = location.state;
  const [fetchedData, setFetchedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 9; // Number of videos to display per page
  const iframeRef = useRef(null); // Create a ref for the iframe element

  // Destructure the videoData object
  const { title, image, duration, views, video, id } = videoData;

  // Define an inline style object for the iframe
  const iframeStyle = {
    marginTop: "4rem",
    width: "80%", // Full width
    height: "80vh", // Full height
  };

  const vidCont = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
  };

  const onDataFetched = (data) => {
    setFetchedData(data);
    console.log(data);
  };

  const handleViewMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * videosPerPage;
  const endIndex = startIndex + videosPerPage;
  const videosToDisplay = fetchedData.slice(0, endIndex); // Display all fetched videos

  // Function to scroll to the iframe element
  const scrollToIframe = () => {
    if (iframeRef.current) {
      iframeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Nav />
      <div style={vidCont}>
        {/* Fullscreen iframe with inline style */}
        <iframe
          className="video-player"
          src={video}
          title={title}
          allowFullScreen
          frameBorder="0"
          style={iframeStyle} // Apply inline style
          onDoubleClick={(e) => e.preventDefault()}
          ref={iframeRef} // Assign the ref to the iframe element
        ></iframe>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "80%",
            marginBottom: "1rem",
          }}
        >
          <h2>{title}</h2>
          <p>Views: {views}</p>
        </div>

        <ApiComponent
          apiUrl={`https://lust.scathach.id/Xvideos/search?key=${tag}&page=1`}
          onDataFetched={onDataFetched}
        />

        <div className="video-container">
          {videosToDisplay.map((video) => (
            <div
              key={video.id}
              className="video2"
              onClick={scrollToIframe} // Attach onClick event to trigger scroll
            >
              <Link to="/player" state={video}>
                <img
                  className="video-thumb"
                  src={video.image}
                  alt={video.title}
                  width="540"
                  height="260"
                />
              </Link>
              <p className="duration">{video.duration}</p>
              <div className="info2">
                <h2>{video.title}</h2>
                <h2>{video.views}</h2>
              </div>
            </div>
          ))}
        </div>

        {fetchedData.length > videosPerPage * currentPage && (
          <button onClick={handleViewMore} className="view-more-button">
            View More
          </button>
        )}
      </div>
    </>
  );
};

export default Videoplayer;
