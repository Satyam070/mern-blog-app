// src/pages/FullBlogView.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Avatar,
  Divider,
} from "@mui/material";
import axios from "axios";

const FullBlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data.blog);
      }
    } catch (error) {
      console.error("Error loading blog:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  if (!blog)
    return (
      <Typography variant="h6" textAlign="center" mt={5}>
        Blog not found
      </Typography>
    );

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 800,
        mx: "auto",
        mt: 5,
        p: 4,
        borderRadius: 3,
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h3" gutterBottom fontWeight={700}>
        {blog.title}
      </Typography>

      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Avatar sx={{ bgcolor: "#FFD700", color: "#000" }}>
          {blog.user?.username?.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography fontWeight={600}>{blog.user?.username}</Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(blog.createdAt).toLocaleString()}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <img
        src={blog.image}
        alt="blog visual"
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      />

      <Typography variant="body1" sx={{ lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
        {blog.description}
      </Typography>
    </Paper>
  );
};

export default FullBlogView;
