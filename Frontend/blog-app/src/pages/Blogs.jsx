import { Box, Button, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../components/api";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    axios.defaults.headers.common["x-auth-token"] =
      localStorage.getItem("token");
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/blog/getBlogs`);
      console.log(res.data.blogs);
      setBlogs(res.data.blogs);
    } catch (error) {
      console.error("Fetch data error:", error.response.data.error);
    }
  };

  return (
    <Box>
      <Heading textAlign={"center"}>Blogs</Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} my={15}>
        {blogs.length > 0 &&
          blogs.map((el, index) => (
            <GridItem key={index} w="100%" h="100px" bg="blue.300">
              <Text fontSize="2xl">Title-{el.title}</Text>
              <Button onClick={()=>navigate(`/blogs/${el._id}`)} color={"black.500"}>view Blog</Button>
            </GridItem>
          ))}
      </Grid>
    </Box>
  );
};

export default Blogs;
