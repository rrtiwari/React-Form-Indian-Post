import React, { useState } from "react";
import "../App.css";
import Loader from "./Loader";
import PostOfficeCard from "./PostOfficeCard";

function App() {
  const [pincode, setPincode] = useState("");
  const [postOffices, setPostOffices] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLookup = async () => {
    if (pincode.length !== 6) {
      setErrorMessage("Please enter a valid 6-digit Pincode");
      setPostOffices([]);
      return;
    }
    setErrorMessage("");
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await response.json();
      const result = data[0];

      if (result.Status === "Error" || result.PostOffice === null) {
        setErrorMessage("No data found for this pincode");
        setPostOffices([]);
      } else {
        setPostOffices(result.PostOffice);
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again later.");
      setPostOffices([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPostOffices = postOffices.filter((office) =>
    office.Name.toLowerCase().includes(searchText.toLowerCase())
  );

  const hasResults = !isLoading && postOffices.length > 0;
  const hasFilteredResults = filteredPostOffices.length > 0;

  return (
    <div className="app-container">
      <h1 className="app-title">Pincode Lookup App</h1>

      <div className="lookup-section">
        <input
          type="number"
          placeholder="Enter 6-digit Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="pincode-input"
        />

        <button onClick={handleLookup} className="lookup-button">
          Lookup
        </button>
      </div>

      {isLoading && <Loader />}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {hasResults && (
        <div className="results-section">
          <input
            type="text"
            placeholder="Filter by Post Office Name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="filter-input"
          />

          {!hasFilteredResults && (
            <p className="no-results">
              Couldn't find the postal data you're looking for.
            </p>
          )}

          {hasFilteredResults && (
            <div className="results-list">
              {filteredPostOffices.map((office, index) => (
                <PostOfficeCard key={index} office={office} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
