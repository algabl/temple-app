import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { getUrl } from "aws-amplify/storage";
import { useQuery } from "react-query";

const TempleCard = ({ temple }) => {
  const fetchImage = async () => {
    const imageKey = temple.image_id;
    try {
      const response = await getUrl({ key: imageKey });
      return response.url.href;
    } catch (error) {
      console.error("Error fetching image from S3", error);
    }
  };

  const { data: imageUrl, isLoading } = useQuery(
    ["templeImage", temple.image_id],
    fetchImage,
    {
      staleTime: Infinity, // This will make the fetched data never stale
    }
  );

  return temple ? (
    <Link
      to={{ pathname: `/temple/${temple.temple_name_id}`, state: { temple } }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          {isLoading && <CircularProgress />}
          {imageUrl && (
            <CardMedia
              sx={{ height: 140, display: isLoading ? "none" : "block" }}
              component="img"
              src={imageUrl}
            />
          )}
          <Typography variant="h5" component="h2">
            {temple.name}
          </Typography>
          <Typography color="textSecondary">{temple.location}</Typography>
        </CardContent>
      </Card>
    </Link>
  ) : (
    <div>Loading...</div>
  );
};

export default TempleCard;
