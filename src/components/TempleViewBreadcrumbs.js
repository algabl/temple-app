import * as React from "react";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import MuiLink from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import { useBreadcrumbs } from "./BreadcrumbsContext";

export default function TempleViewBreadcrumbs({ templeName }) {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <MuiLink
        key={index}
        underline="hover"
        color="inherit"
        component={RouterLink}
        to={breadcrumb.path}
      >
        {breadcrumb.name}
      </MuiLink>
      ))}
    </Breadcrumbs>
  );
}
