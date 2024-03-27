import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useLoadingStore from "../../Store/LoadingStore/LoadingStore";

import {
  Box,
  Text,
  HStack,
  VStack,
  Image,
  Heading,
  Button,
  Spinner,
} from "@chakra-ui/react";

const BuyNow = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const {loading, setLoading} = useLoadingStore();

  useEffect(() => {
    setLoading(true);
    axios.get("https://fakestoreapi.com/products/" + id).then((myProduct) => {
      const { title, description, price, image } = myProduct.data;
      setProduct({ title, description, price, image });
      setLoading(false);
    });
  }, []);

  console.log(product);

  return (

    <>
    { loading? (
        <VStack justifyContent='center' w='100%' h='100vh'>
            <Spinner size='xl' color="blue.500"/>
        </VStack>
    ) : (
    <HStack justifyContent="space-between" p="50px" h="100vh">
      <Box w="50%" h="100%">
        <Image src={product.image} w="100%" h="100%" objectFit="contain" />
      </Box>
      <VStack w="50%" alignItems="flex-start" padding="40px" spacing="30px">
        <Heading fontSize="50px">{product.title}</Heading>
        <Text>{product.description}</Text>
        <Heading>Rs {product.price}</Heading>
        <HStack>
          <Button colorScheme="blue" p="30px">
            Buy Now
          </Button>
          <Button colorScheme="teal" variant="ghost" color="primary" p="30px">
            Add to cart
          </Button>
        </HStack>
        <Button onClick={()=> navigate('/')}>Return to all Products</Button>
      </VStack>
    </HStack>
    )}
    </>
  );
};

export default BuyNow;
