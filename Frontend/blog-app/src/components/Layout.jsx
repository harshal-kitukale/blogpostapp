import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    const logoutUser=()=>{

    }
  return (
    <Box>
      <Flex bg="blue.400">
        <Text p="4">
          <Link to="/">Home</Link>
        </Text>
        <Text p="4">
          <Link to="/blogs">Your Blogs</Link>
        </Text>
        <Spacer/>
        <Button m={[2, 3]}  onClick={logoutUser}>Logout</Button>
      </Flex>
         <Outlet/>
    </Box>
  );
};

export default Layout;
