import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import TempleCard from "../components/TempleCard";
import { Toolbar } from "@mui/material";

function AllTemples({allTemples}) {
  return (
    <div>
      <Toolbar />
      <h1>All Temples</h1>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent="center"
      >
        {allTemples.map((thisTemple, index) => {
          return (
            <Grid item xs={4}>
              <TempleCard temple={thisTemple} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default AllTemples;
