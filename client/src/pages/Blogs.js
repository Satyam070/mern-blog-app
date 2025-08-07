import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Grid, Typography } from "@mui/material";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <Grid item xs={12} sm={10} md={8} key={blog._id}>
            <BlogCard
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              username={blog.user.username}
              time={blog.createdAt}
            />
          </Grid>
        ))
      ) : (
        <Typography variant="h6" textAlign="center" sx={{ width: "100%", mt: 4 }}>
          No blogs available.
        </Typography>
      )}
    </Grid>
  );
};

export default Blogs;
