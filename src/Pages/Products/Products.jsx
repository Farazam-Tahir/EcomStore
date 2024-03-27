import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useLoadingStore from "../../Store/LoadingStore/LoadingStore";
import useCartStore from "../../Store/CartStore/CartStore";
import cartIcon from '../../images/cartIcon.png';

import {
  Image,
  Heading,
  Text,
  Divider,
  Button,
  Flex,
  VStack,
  Box,
  HStack,
  Spinner
} from "@chakra-ui/react";

const Products = () => {
  const [data, setData] = useState([]);
  const [cartData, setCartData] = useState({
    items : [],
    cartCount : 0
  });
  const {loading, setLoading} = useLoadingStore();
  const {cartItems, setCartItems} = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        console.log("Data received successfully");
        // console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const goToBuyNow = (productId)=>{
    navigate(`/buynow/${productId}`);
  }
  console.log("State data");
  console.log(data);

  const addDataToDb = async()=>{
      setCartData({...cartData , cartCount : cartItems+1})

  }

  const addToCart = (index)=>{
    setCartItems(cartItems+1);
    const {title, price} = data[index];
    const productInfo = {title, price};
    setCartData({...cartData, items : {productInfo}});
    addDataToDb(index);
}
// cartData.cartCount = cartItems;
console.log(cartData.cartCount);
console.log(cartData.items);

return (
    <>
    { loading? (
        <VStack justifyContent='center' w='100%' h='100vh'>
            <Spinner size='xl' color="blue.500"/>
        </VStack>
    ) : (
    <Box px ={['10px','10px','20px','30px']}
        py="20px">
      <HStack justifyContent='space-between' alignItems='center' width='100%' mb='30px' p='20px'>
        <Heading>
            EcomStore
        </Heading>
        <Button background='none' position='relative'>
            <Image src={cartIcon} w='100%' h='100%' objectFit='contain'/>
            <Text position='absolute' right='6' top='-2' color='red'>
                {cartData.cartCount}
            </Text>
        </Button>
      </HStack>
      <Divider mb="10px" />
      <Flex
        flexWrap="wrap"
        w="100%"
        justifyContent="space-around"
        gap="30px"
        p={['10px','10px','10px','30px']}
      >
        {data.map((product, index) => {
          return (
            <VStack
              w={['100%', '47%', '47%', '31%']}
              h='500px'
              boxShadow="xl"
              p="10px"
              justifyContent="space-between"
              key={product.id}
            >
              <Box w="100%" h="50%">
                <Image
                  src={product.image}
                  w="100%"
                  h="100%"
                  objectFit="contain"
                />
              </Box>
              <Divider />
              <VStack spacing="10px" my="2px" p="10px" alignItems='flex-start'>
                <Heading fontSize="xl">
                  {product.title.length > 35
                    ? `${product.title.substring(0, 35)}...`
                    : product.title}
                </Heading>
                <Text fontSize='small'>
                  {product.description.length > 100
                    ? `${product.description.substring(0, 100)}...`
                    : product.description}
                </Text>
                <Text fontSize="large" fontWeight="bold">
                  Rs {product.price}
                </Text>
                <HStack>
                  <Button colorScheme="blue" p="20px" onClick={()=> goToBuyNow(product.id)}>
                    Buy Now
                  </Button>
                  <Button
                    colorScheme="teal"
                    variant="ghost"
                    color="primary"
                    p="20px"
                    onClick={()=> addToCart(index)}
                  >
                    Add to cart
                  </Button>
                </HStack>
              </VStack>
            </VStack>
          );
        })}
      </Flex>
    </Box>
    )}
    </>
  );
};

export default Products;
