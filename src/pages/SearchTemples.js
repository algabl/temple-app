import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { InputBase } from "@mui/material";
import TempleCard from "../components/TempleCard";
import Toolbar from "@mui/material/Toolbar";
import { get } from "aws-amplify/api";

const myAPI = "templeapi";
const path = "/temple";

function SearchTemples() {
  const [temples, setTemples] = React.useState([]);
  const [input, setInput] = React.useState("");

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      getTemple();
    }
  }

  async function getTemple(e) {
    let searchParam = input;

    const myInit = {
      queryParams: {
        name: searchParam,
      },
    };
    const { body } = await get({
      apiName: myAPI,
      path: path,
      options: myInit,
    }).response;
    const data = await body.json();
    console.log(data);
    let newTemples = data;
    setTemples(newTemples);
  }

  async function clearTemples() {
    setTemples([]);
  }

  return (
    <Box sx={{ p: 3 }}>
      <Toolbar />
      <div>
        <InputBase
          placeholder="search"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </div>
      <br />
      <Button onClick={() => getTemple()}>Search for temples</Button>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent="center"
      >
        {temples.map((thisTemple, index) => {
          return (
            <Grid item xs={4}>
              <TempleCard temple={thisTemple} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default SearchTemples;
