import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const TempleView = ({ allTemples }) => {
  const { temple_name_id } = useParams();
  const [temple, setTemple] = useState(null);

  useEffect(() => {
    // Assuming allTemples is an array of all temples
    const templeData = allTemples.find(
      (temple) => temple.temple_name_id === temple_name_id
    );
    console.log('Data' + templeData);
    setTemple(templeData);
  }, [temple_name_id, allTemples]);

  if (!temple) {
    return <div>Loading...</div>;
  }
  
  return (
    <div style={{ textAlign: 'left'}}>
      <h1>{temple.name}</h1>
      <p>{temple.location}</p>
      <p>Date dedicated: {temple.date}</p>
      {temple.walk_score && <p>Walk score: {temple.walk_score}</p>}
      {temple.bike_score && <p>Bike score: {temple.bike_score}</p>}
      {temple.transit_score && <p>Transit score: {temple.transit_score}</p>}
      <p>Distance to city center: {temple.distance_to_city_center_mi}mi</p>
      {temple.closest_bus_mi && <p>Closest bus stop: {temple.closest_bus_mi}mi</p>}
      {temple.closest_light_rail_mi && <p>Closest light rail station: {temple.closest_light_rail_mi}mi</p>}
      {temple.closest_subway_mi && <p>Closest subway station: {temple.closest_subway_mi}mi</p>}
      {temple.closest_other_rail_mi && <p>Closest other rail station: {temple.closest_other_rail_mi}mi</p>}
      <Link to="/">Back to all temples</Link>
    </div>
  );
};

export default TempleView;
