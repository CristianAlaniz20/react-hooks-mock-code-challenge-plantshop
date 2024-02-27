import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("http://127.0.0.1:6001/plants")
    .then(response => response.json())
    .then(data => setPlants(data))
    .catch(error => console.log(error))
  }, [])

  function handleNewPlant(newPlant) {
    setPlants([...plants, newPlant])
  }

  function handleSearchChange(event) {
    setSearch(event.target.value)
  }

  const plantsToDisplay = plants.filter(plant => {
    if (search.length > 0) {
      const plantName = plant.name.toLowerCase()
      return plantName.includes(search.toLowerCase())
    } else {
      return plant
    }
  })
  
  return (
    <main>
      <NewPlantForm onNewPlant={handleNewPlant} />
      <Search onSearchChange={handleSearchChange} search={search} />
      <PlantList plants={plantsToDisplay} />
    </main>
  );
}

export default PlantPage;
