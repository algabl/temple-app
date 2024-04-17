import "./App.css";
import "@aws-amplify/ui-react/styles.css";

import {
  Button,
  Menu,
  MenuItem,
  Tabs,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { fetchUserAttributes, signOut } from "aws-amplify/auth";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TempleCard from "./components/TempleCard";
import TempleView from "./components/TempleView";
import { get } from "aws-amplify/api";

const myAPI = "templeapi";
const path = "/temple";

const App = () => {
  const [input, setInput] = useState("");
  const [temples, setTemples] = useState([]);
  const [allTemples, setAllTemples] = useState([]);
  const [userAttributes, setUserAttributes] = useState(null);

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

  async function handleFetchUserAttributes () {
    try {
      const userAttributes = await fetchUserAttributes();
      console.log("User attributes", userAttributes);
      setUserAttributes(userAttributes);
    } catch (error) {
      console.error("Error fetching user attributes", error);
    }
  }

  useEffect(() => {
    getAllTemples();
    handleFetchUserAttributes();
  }, []);

  return (
    <Router>
      <Container className="App">
        <Menu menuAlign="start">
          <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
          {userAttributes && <MenuItem>{userAttributes.email}</MenuItem> }
        </Menu>
        <h1>Temple Tracker</h1>
        
        <Routes>
          <Route path="/temple/:temple_name_id" element={<TempleView allTemples={allTemples} />} />
          <Route path="/" element={<Tabs.Container defaultValue="1">
          <Tabs.List>
            <Tabs.Item value="1">All Temples</Tabs.Item>
            <Tabs.Item value="2">Search Temples</Tabs.Item>
            <Tabs.Item value="3">Add Temples</Tabs.Item>
          </Tabs.List>
          <Tabs.Panel value="1">
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
          </Tabs.Panel>
          <Tabs.Panel value="2">
            <div>
              <input
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
          </Tabs.Panel>
          <Tabs.Panel value="3">Feature coming soon</Tabs.Panel>
        </Tabs.Container>} />
        </Routes>
      </Container>
    </Router>
  );
};

export default withAuthenticator(App);
