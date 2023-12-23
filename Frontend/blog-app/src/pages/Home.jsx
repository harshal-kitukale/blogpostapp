import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../components/api";

const Home = () => {
  const [blogData, setBlogData] = useState({ title: "", content: "" });
  const toast = useToast();

  const handleInputChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
    console.log(blogData);
  };
  const handleSubmitData = async () => {
    console.log("bb;", blogData);
    const token = localStorage.getItem("token");
    if (blogData.title == "" && blogData.content == "") {
      alert("fields can not be empty");
      return;
    }
    try {
      const res = await axios.post(`${API_URL}/blog/createBlog`, blogData, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      if (res.status === 201) {
        toast({
          title: res.data.message,
          // description: "We've created your account for you.",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        setBlogData({ title: "", content: "" })
      }
    } catch (error) {
      if (error.response) {
        // Handle other errors and responses here
        console.error("Error response from the server:", error.response.data);
        toast({
          title: error.response.data.message,
          // description: "We've created your account for you.",
          status: "info",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      } else if (error.request) {
        // Handle network issues
        console.error("Network error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };
  return (
    <Box>
      <Heading as="h1" noOfLines={1}>
        Write Your Blog
      </Heading>
      <Box width="80%" display={"block"} margin="auto">
        <Input
          my={10}
          onChange={handleInputChange}
          name="title"
          value={blogData.title}
          placeholder="Type Your Title"
          size="md"
        />
        <Textarea
          my={5}
          value={blogData.content}
          name="content"
          onChange={handleInputChange}
          placeholder="Write your blog here"
          size="sm"
        />
      </Box>
      <Button onClick={handleSubmitData} colorScheme="blue" m={10}>
        Submit Blog
      </Button>
    </Box>
  );
};

export default Home;
