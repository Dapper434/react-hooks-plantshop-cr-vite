import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => {
        if (cancelled) return;
        setPlants((prev) => {
          if (prev.length === 0) return data;
          const serverIds = new Set(data.map((p) => p.id));
          const localOnly = prev.filter((p) => !serverIds.has(p.id));
          return [...data, ...localOnly];
        });
      });
    return () => {
      cancelled = true;
    };
  }, []);
  
  
  const plantsToDisplay = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPlant = async (newPlant) => {
    const response = await fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    });
    const created = await response.json();
    setPlants((prev) => [...prev, created]);
  };

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchQuery={searchQuery} onSearchChange={setSearchQuery} />
     
      <PlantList plants={plantsToDisplay} />
    </main>
  );
}

export default PlantPage;