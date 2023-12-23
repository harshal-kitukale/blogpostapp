import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const toast = useToast();
  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  const handleSubmit = () => {
  

    axios
      .post("http://localhost:8080/user/login", data)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          toast({
            title: res.data.message,
            // description: "We've created your account for you.",
            status: "success",
            duration: 3000,
            position: "top",
            isClosable: true,
          });
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("auth", true);
          if(res.data.type=="admin"){
            navigate("/admin");
          }else{
            navigate("/");

          }
        }
      })
      .catch((error) => {
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
      });
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Login
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl
              onChange={(e) => handleChange(e)}
              id="email"
              isRequired
            >
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl
              onChange={(e) => handleChange(e)}
              id="password"
              isRequired
            >
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack onClick={() => handleSubmit()} spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Not Registered?{" "}
                <Link href="./register" color={"blue.400"}>
                  Register here
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
