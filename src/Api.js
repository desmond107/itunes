import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Function to fetch API data
    const fetchData = async () => {
      try {
        const response = await fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetch function
  }, []);

  return (
    <div>
      {data ? (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyComponent;
