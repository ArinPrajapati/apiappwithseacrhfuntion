import React, { useState, useEffect } from "react";
import axios from "axios";

const Api = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("https://api.punkapi.com/v2/beers");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, []);

  const filteredData = data.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col p-10">
      <input
        type="text"
        placeholder="Search by name"
        className="border p-2 mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-3 gap-4">
        {filteredData.map((beer) => (
          <div key={beer.id} className="p-4">
            <div className="border rounded-lg p-4 ">
              <img
                src={beer.image_url}
                alt={beer.name}
                className="mb-4 w-16 mx-auto"
              />
              <h3 className="text-xl font-semibold mb-2">{beer.name}</h3>
              <p className="text-gray-600">{beer.tagline}</p>
              <p className="text-gray-500 mt-2">
                First brewed: {beer.first_brewed}
              </p>
              <p className="text-sm mt-4">{beer.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Api;
