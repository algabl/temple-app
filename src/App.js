import "./App.css";
import "@aws-amplify/ui-react/styles.css";

import { QueryClient, QueryClientProvider } from "react-query";
import React, { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import AddTemples from "./pages/AddTemples";
import AllTemples from "./pages/AllTemples";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Home from "./pages/Home";
import SearchTemples from "./pages/SearchTemples";
import TempleAppBar from "./components/TempleAppBar";
import TempleView from "./components/TempleView";
import { get } from "aws-amplify/api";
import { withAuthenticator } from "@aws-amplify/ui-react";

const myAPI = "templeapi";
const path = "/temple";
const queryClient = new QueryClient();

const App = () => {
  const [allTemples, setAllTemples] = useState([]);
  
  async function getAllTemples() {
    const { body } = await get({
      apiName: myAPI,
      path: path,
    }).response;
    const data = await body.json();
    console.log(data);
    let newTemples = data;
    setAllTemples(newTemples);
  }

  useEffect(() => {
    getAllTemples();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Box>
        <TempleAppBar />
        <Container className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search-temples" element={<SearchTemples />} />
            <Route path="/add-temples" element={<AddTemples />} />
            <Route
              path="/all-temples"
              element={<AllTemples allTemples={allTemples} />}
            />{" "}
            <Route
              path="/temple/:temple_name_id"
              element={<TempleView allTemples={allTemples} />}
            />
          </Routes>
        </Container>
      </Box>
    </QueryClientProvider>
  );
};

export default withAuthenticator(App);
