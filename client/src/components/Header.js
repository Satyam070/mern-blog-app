// src/components/Header.js
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Tabs,
  Tab,
  Box,
  Stack,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
import axios from "axios";

const Header = () => {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState({});
  const userId = localStorage.getItem("userId");
  let isLogin = useSelector((state) => state.isLogin) || userId;

  const navItems = [
    { label: "Blogs", to: "/blogs" },
    { label: "My Blogs", to: "/my-blogs" },
    { label: "Create Blog", to: "/create-blog" },
  ];

  const handleLogout = () => {
    dispatch(authActions.logout());
    toast.success("Logout Successfully");
    localStorage.clear();
    navigate("/login");
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/api/v1/user/get-user/${userId}`);
      if (data?.success) setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) fetchUser();
  }, [userId]);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#ffffff",
          color: "#000",
          borderBottom: "1px solid #e0e0e0",
          borderRadius: 0,
        }}
      >
        <Toolbar>
          {isMobile && isLogin && (
            <IconButton
              sx={{ mr: 2, color: "#000" }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#000",
              fontFamily: "Georgia, serif",
              flexGrow: 1,
            }}
          >
            bLOGGER
          </Typography>

          {!isMobile && isLogin && (
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
              sx={{
                "& .MuiTab-root:hover": {
                  color: "#FFD700",
                },
              }}
            >
              {navItems.map((item) => (
                <Tab
                  key={item.to}
                  label={item.label}
                  LinkComponent={Link}
                  to={item.to}
                  sx={{ fontWeight: 600 }}
                />
              ))}
            </Tabs>
          )}

          <Stack direction="row" spacing={1}>
            {!isLogin ? (
              <>
                <Button component={Link} to="/login">Login</Button>
                <Button component={Link} to="/register">Register</Button>
              </>
            ) : (
              <Button onClick={handleLogout}>Logout</Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }} onClick={() => setDrawerOpen(false)}>
          <Box display="flex" alignItems="center" gap={2} p={2}>
            <Avatar sx={{ bgcolor: "#FFD700", color: "#000" }}>
              {user?.username?.charAt(0)?.toUpperCase()}
            </Avatar>
            <Box>
              <Typography fontWeight={600}>{user?.username}</Typography>
              <Typography variant="body2">{user?.email}</Typography>
            </Box>
          </Box>
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItem
                button
                key={item.to}
                component={Link}
                to={item.to}
                sx={{
                  "&:hover": {
                    backgroundColor: "#fff8dc",
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            <Divider />
            <ListItem
              button
              onClick={handleLogout}
              sx={{ "&:hover": { backgroundColor: "#fff8dc" } }}
            >
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
