// http://localhost:8080/admin/allusers
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Grid,
  Box,
  GridItem,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { API_URL } from "../components/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [data, setData] = useState([]);
  const [key, setKey] = useState("allusers");
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios.defaults.headers.common["x-auth-token"] =
  //     localStorage.getItem("token");
  //   fetchData();
  // }, []);

  const fetchData = async (endpoint) => {
    axios.defaults.headers.common["x-auth-token"] =
      localStorage.getItem("token");
    try {
      const res = await axios.get(`${API_URL}/admin/${endpoint}`);
      const newdata=res.data
      console.log(newdata );
      setData(res.data);
    } catch (error) {
      console.error("Fetch data error:", error.response.data.error);
    }
  };
  const handleClick = (endpoint) => {
    setKey(endpoint);
    fetchData(endpoint);
  };
  const handleDeleteUser = (id) => {
    axios
      .delete(`${API_URL}/admin/users/${id}`)
      .then((res) => {
        // console.log(res.data);
        // setData(res.data);
        fetchData(key)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteBlog=(id)=>{
    axios
    .delete(`${API_URL}/admin/blog/${id}`)
    .then((res) => {
      // console.log(res.data);
      // setData(res.data);
      fetchData(key)
    })
    .catch((err) => {
      console.log(err);
    });
  }

    const logoutUser=()=>{
            localStorage.removeItem("token")
            localStorage.removeItem("auth")
            window.location.reload();
    }
  return (
    <Grid minH="300px" templateColumns="200px 1fr">
      <Box bg="blue.300">
        <Button
          onClick={() => handleClick("allusers")}
          display={"block"}
          m={"auto"}
          my={10}
        >
          Users
        </Button>
        <Button
          onClick={() => handleClick("allblogs")}
          display={"block"}
          m={"auto"}
        >
          Blogs
        </Button>
        <Button
          onClick={() => logoutUser()}
          display={"block"}
          m={"auto"}
          my={20}
        >
          Logout
        </Button>
      </Box>
      {key == "allusers" ? (
        <TableContainer>
          <Heading my={10}>Users</Heading>
          <Table variant="simple">
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
            <Thead>
              <Tr>
                <Th>User Name</Th>
                <Th>Email</Th>
                <Th isNumeric>Manage</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.length > 0 &&
                data.map((el) => (
                  <Tr>
                    <Td>{el.username}</Td>
                    <Td>{el.email}</Td>
                    <Button onClick={() => handleDeleteUser(el._id)}>Delete</Button>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Box>
          <Heading textAlign={"center"}>Blogs</Heading>
          <Grid
            templateColumns="repeat(3, 1fr)"
            m={"auto"}
            gap={6}
            my={15}
            w={"95%"}
          >
            {data.length > 0 &&
              data.map((el, index) => (
                <GridItem key={index} w="100%" minH="100px" bg="blue.300">
                  <Text my={5} fontSize="2xl">Title-{el.title}</Text>
                  <Button
                    onClick={() => navigate(`/blogs/${el._id}`)}
                    color={"black.500"}
                  >
                    view Blog
                  </Button>
                  <Button
                    onClick={() => handleDeleteBlog(el._id)}
                    color={"black.500"}
                  >
                    Delete Blog
                  </Button>
                </GridItem>
              ))}
          </Grid>
        </Box>
      )}
    </Grid>
  );
};

export default Admin;
