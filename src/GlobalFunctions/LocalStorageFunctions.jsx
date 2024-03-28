const getDataFromDb = () => {
  const myData = JSON.parse(localStorage.getItem("cartData"));

  return myData;
};

const addDataToDb = (newItem) => {
  // setCartData({...cartData , cartCount : cartItems+1})
  localStorage.setItem("cartData", JSON.stringify(newItem));
};

const removeItemFromDb = (itemIndex) => {
  const itemList = getDataFromDb();
  itemList.splice(itemIndex, 1);
  addDataToDb(itemList);
};

export default getDataFromDb;
export { addDataToDb, removeItemFromDb };
