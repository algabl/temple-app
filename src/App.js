import "./App.css";
import "@aws-amplify/ui-react/styles.css";

import { Button, Tabs, withAuthenticator } from "@aws-amplify/ui-react";
import React, { useEffect, useState } from "react";

import { get } from "aws-amplify/api";
import logo from "./logo.svg";
import uploadFile from "./functions/upload";

const myAPI = "templeapi";
const path = "/temple";

const App = () => {
  const [input, setInput] = useState("");
  const [temples, setTemples] = useState([]);

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

  return (
    <div className="App">
      <h1>Temple Tracker</h1>
      <Tabs.Container defaultValue="1">
        <Tabs.List>
          <Tabs.Item value="1">All Temples</Tabs.Item>
          <Tabs.Item value="2">Add Temples</Tabs.Item>
        </Tabs.List>
        <Tabs.Panel value="1">
          <div>
            <input
              placeholder="search"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <br />
          <Button onClick={() => getTemple()}>Search for temples</Button>

          {temples.map((thisTemple, index) => {
            return (
              <div key={thisTemple.name}>
                <span>
                  <b>TempleName</b>:{thisTemple.name}
                </span>
              </div>
            );
          })}
        </Tabs.Panel>
        <Tabs.Panel value="2">Feature coming soon</Tabs.Panel>
      </Tabs.Container>
    </div>
  );
};

export default withAuthenticator(App);
