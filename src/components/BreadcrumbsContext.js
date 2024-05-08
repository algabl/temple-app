import React, { createContext, useCallback, useContext, useState } from "react";

import { clear } from "@testing-library/user-event/dist/clear";

// Create a context for the breadcrumbs
const BreadcrumbsContext = createContext();

// Create a provider that holds the breadcrumb history
export function BreadcrumbsProvider({ children }) {
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const addBreadcrumb = useCallback((breadcrumb) => {
    setBreadcrumbs((prevBreadcrumbs) => [...prevBreadcrumbs, breadcrumb]);
  }, []);

  const hasBreadcrumb = useCallback(
    (name) => {
      return breadcrumbs.some((breadcrumb) => breadcrumb.name === name);
    },
    [breadcrumbs]
  );
  const clearBreadcrumbs = useCallback(() => {
    setBreadcrumbs([]);
  }, []);

  const value = { breadcrumbs, addBreadcrumb, hasBreadcrumb, clearBreadcrumbs };

  return (
    <BreadcrumbsContext.Provider value={value}>
      {children}
    </BreadcrumbsContext.Provider>
  );
}

// Create a hook to use the breadcrumbs
export function useBreadcrumbs() {
  const context = useContext(BreadcrumbsContext);
  if (!context) {
    throw new Error("useBreadcrumbs must be used within a BreadcrumbsProvider");
  }
  return context;
}
