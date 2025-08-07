import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Grid, Typography } from "@mui/material";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <Grid item xs={12} sm={10} md={8} key={blog._id}>
            <BlogCard
              id={blog._id}
              isUser={true}
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
          You haven't created any blogs yet.
        </Typography>
      )}
    </Grid>
  );
};

export default UserBlogs;
