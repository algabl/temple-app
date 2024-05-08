import {
  Box,
  CircularProgress,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";
import TempleViewBreadcrumbs from "../components/TempleViewBreadcrumbs";
import { useBreadcrumbs } from "./BreadcrumbsContext"; // import the hook
import { useParams } from "react-router-dom";

const TempleView = ({ allTemples }) => {
  const { temple_name_id } = useParams();
  const [temple, setTemple] = useState(null);
  const { addBreadcrumb } = useBreadcrumbs();

  useEffect(() => {
    // Assuming allTemples is an array of all temples
    const templeData = allTemples.find(
      (temple) => temple.temple_name_id === temple_name_id
    );
    setTemple(templeData);
  }, [temple_name_id, allTemples]);

  if (!temple) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Toolbar />
      <Box sx={{ textAlign: "left" }}>
        <TempleViewBreadcrumbs templeName={temple.name} />
        <Typography variant="h1">{temple.name}</Typography>
        <Typography variant="body1">{temple.location}</Typography>
        <Typography variant="body1">Date dedicated: {temple.date}</Typography>
        {temple.walk_score && (
          <Typography variant="body1">
            Walk score: {temple.walk_score}
          </Typography>
        )}
        {temple.bike_score && (
          <Typography variant="body1">
            Bike score: {temple.bike_score}
          </Typography>
        )}
        {temple.transit_score && (
          <Typography variant="body1">
            Transit score: {temple.transit_score}
          </Typography>
        )}
        <Typography variant="body1">
          Distance to city center: {temple.distance_to_city_center_mi}mi
        </Typography>
        {temple.closest_bus_mi && (
          <Typography variant="body1">
            Closest bus stop: {temple.closest_bus_mi}mi
          </Typography>
        )}
        {temple.closest_light_rail_mi && (
          <Typography variant="body1">
            Closest light rail station: {temple.closest_light_rail_mi}mi
          </Typography>
        )}
        {temple.closest_subway_mi && (
          <Typography variant="body1">
            Closest subway station: {temple.closest_subway_mi}mi
          </Typography>
        )}
        {temple.closest_other_rail_mi && (
          <Typography variant="body1">
            Closest other rail station: {temple.closest_other_rail_mi}mi
          </Typography>
        )}
        <Link component={RouterLink} to="/all-temples">
          Back to all temples
        </Link>
      </Box>
    </div>
  );
};

export default TempleView;
