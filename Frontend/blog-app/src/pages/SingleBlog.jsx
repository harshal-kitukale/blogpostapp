import { Box, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../components/api";

const SingleBlog = () => {
    const [singleBlog,setSingleBlog]=useState("")
    const {id}=useParams()
    useEffect(() => {
        axios.defaults.headers.common["x-auth-token"] =
          localStorage.getItem("token");
        fetchData();
      }, []);
      const fetchData = async () => {
        try {
          const res = await axios.get(`${API_URL}/blog/${id}`);
          console.log(res.data.blog);
          setSingleBlog(res.data.blog);
        } catch (error) {
          console.error("Fetch data error:", error.response.data.error);
        }
      };
  return (
    <Box textAlign={"center"}>
      <Heading as='h3' >{singleBlog.title}</Heading>
      <Text fontSize='xl' my={5}>{singleBlog.content}</Text>
    </Box>
  );
};

export default SingleBlog;
