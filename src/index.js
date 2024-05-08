import "./index.css";

import { Amplify } from "aws-amplify";
import App from "./App";
import { BreadcrumbsProvider } from "./components/BreadcrumbsContext";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import awsExports from "./aws-exports";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme/theme";

Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BreadcrumbsProvider>
        <Router>
          <App />
        </Router>
      </BreadcrumbsProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// // In your main JavaScript file, register the service worker
// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", function () {
//     navigator.serviceWorker.register("/service-worker.js");
//   });
// }

// // In service-worker.js
// self.addEventListener("install", function (event) {
//   event.waitUntil(
//     caches.open("image-cache").then(function (cache) {
//       return cache.addAll([
//         // List of images to cache on install
//         // These can be URLs to images or other resources
//       ]);
//     })
//   );
// });

// self.addEventListener("fetch", function (event) {
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       // Cache hit - return the response from the cached version
//       if (response) {
//         return response;
//       }

//       // Not in cache - return the result from the live server
//       // and add it to the cache for next time
//       return fetch(event.request).then(function (response) {
//         return caches.open("image-cache").then(function (cache) {
//           cache.put(event.request, response.clone());
//           return response;
//         });
//       });
//     })
//   );
// });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
