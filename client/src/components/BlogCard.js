import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        toast.success("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box onClick={() => navigate(`/blog/${id}`)} sx={{ cursor: "pointer" }}>
      <Card
        sx={{
          width: "90%",
          maxWidth: 700,
          margin: "20px auto",
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          transition: "transform 0.2s ease-in-out",
          ":hover": {
            transform: "scale(1.01)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          },
        }}
      >
        {isUser && (
          <Box display={"flex"} justifyContent="flex-end" p={1}>
            <Tooltip title="Edit">
              <IconButton onClick={handleEdit}>
                <ModeEditIcon color="info" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={handleDelete}>
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          </Box>
        )}

        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#FFD700", color: "#000" }} aria-label="user">
              {username?.charAt(0)?.toUpperCase()}
            </Avatar>
          }
          title={<Typography fontWeight={600}>{username}</Typography>}
          subheader={new Date(time).toLocaleString()}
        />
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
