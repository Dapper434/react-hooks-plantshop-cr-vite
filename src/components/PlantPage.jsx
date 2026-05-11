import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
const [plants, setPlants] = useState([]);
const [searchQuery, setSearchQuery] = useState("");
useEffect(() => {
  fetch("http://localhost:6001/plants")
    .then((response) => response.json())
    .then((data) => setPlants(data));
}, []);
  
  return (
    <main>
      <NewPlantForm />
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <PlantList plants={plantsToDisplay} />
    </main>
  );
}

export default PlantPage;
