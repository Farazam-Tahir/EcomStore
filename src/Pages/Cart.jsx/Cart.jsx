import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HStack,
  ListItem,
  VStack,
  Text,
  Heading,
  List,
  Button,
  Divider,
} from "@chakra-ui/react";
import getDataFromDb from "../../GlobalFunctions/LocalStorageFunctions";
import { removeItemFromDb } from "../../GlobalFunctions/LocalStorageFunctions";

const Cart = () => {
  const [cartInfo, setCartInfo] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const data = getDataFromDb();
    setCartInfo(data);
  }, []);

  console.log("data received");
  console.log(cartInfo);

  const removeItem = (index) => {
    removeItemFromDb(index);
    const newData = getDataFromDb();
    setCartInfo(newData);
  };

  return (
    <VStack>
      <Heading p="30px">My Cart Items</Heading>
      <Divider />
      <List w="100%" p="30px" spacing="20px">
        {cartInfo.map((info, index) => {
          return (
            <ListItem key={index} w="100%" bgColor="gray.200" p="20px">
              <HStack justifyContent="space-between">
                <Text fontWeight="bold" fontSize="xl" w="60%">
                  {info.title}
                </Text>
                <Text fontWeight="bold" fontSize="xl">
                  {info.price}
                </Text>
                <Button
                  background="none"
                  color="red"
                  onClick={() => removeItem(index)}
                >
                  Remove Item
                </Button>
              </HStack>
            </ListItem>
          );
        })}
      </List>

      <Button onClick={() => navigate("/products")}>
        Return to all products
      </Button>
    </VStack>
  );
};

export default Cart;
