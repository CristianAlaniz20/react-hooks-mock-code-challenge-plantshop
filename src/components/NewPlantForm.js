import React, { useState } from "react";

function NewPlantForm({ onNewPlant }) {
  const [newPlant, setNewPlant] = useState({
    name: "",
    image: "",
    price: 0,
  })
  
  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://127.0.0.1:6001/plants", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newPlant)
    })
    .then(response => response.json())
    .then(returnedNewPlant => onNewPlant(returnedNewPlant))
    .catch(error => console.log(error))
  }

  function handleValueChange(event) {
    setNewPlant({
      ...newPlant,
      [event.target.name]: event.target.value,
    })
  }
  
  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit} >
        <input type="text" name="name" placeholder="Plant name" value={newPlant.name} onChange={handleValueChange} />
        <input type="text" name="image" placeholder="Image URL" value={newPlant.image} onChange={handleValueChange} />
        <input type="number" name="price" step="0.01" placeholder="Price" value={newPlant.price} onChange={handleValueChange} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
