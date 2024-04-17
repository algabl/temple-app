import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { getUrl } from "aws-amplify/storage";

const TempleCard = ({ temple }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      const imageKey = temple.image_id;
      try {
        const response = await getUrl({ key: imageKey });
        setImageUrl(response.url.href);
      } catch (error) {
        console.error("Error fetching image from S3", error);
      }
    };
    
    fetchImage();
  }, [temple.image_id]);



  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <Link to={`/temple/${temple.temple_name_id}`}>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          {loading && <CircularProgress />}
          {imageUrl && (
            <CardMedia
              sx={{ height: 140, display: loading ? "none" : "block" }}
              component="img"
              src={imageUrl}
              onLoad={handleImageLoad}
            />
          )}
          <Typography variant="h5" component="h2">
            {temple.name}
          </Typography>
          <Typography color="textSecondary">{temple.location}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TempleCard;
