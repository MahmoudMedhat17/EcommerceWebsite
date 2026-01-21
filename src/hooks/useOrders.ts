import { useEffect, useState } from "react";
import getOrders from "@/store/orders/thunk/getOrders";
import { resetOrderPlacement } from "@/store/orders/ordersSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import type { TProducts } from "@/types";




const useOrders = () => {
    // Here this showModal state to control the modal to open or close it.
  const [showModal, setShowModal] = useState(false);
  // Here this productDetails state to get the array of the products inside the order of the user.
  const [orderDetails, setOrderDetails] = useState<TProducts[]>([]);

  const { loading, error, userOrders } = useAppSelector((state) => state.orders);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(getOrders());

    return () => {
      promise.abort(); 
      // Here this dispatch resets the state of the order placement after the user succesfully orders something. state goes from "Successded" to "Idle" for ex.
      dispatch(resetOrderPlacement());
    }
  }, [dispatch]);

  // A function to show order details with the Order id.
  const handleOrderDetails = (id: number) => {
    // Here we set showModal to true to open up.
    setShowModal(true);
    // userOrder variable is to find if the the userId is equal to the order ID then that confirms that this is the order of this user Ex => userId = 1 and the ID of the order is 1.
    const userOrder = userOrders.find((order) => order.userId === id);
    // order variable to make sure that it returns an array with the orders and if not then return an empty array (Avoids TS error).
    const order = userOrder?.items ?? [];
    // We set the setOrderDetails with the default order data and the new order data to avoid mutation of the original order array.
    setOrderDetails([...order]);
  };

  // A function to close the Modal when the user want to close it and reset the setOrderDetails state with an empty array.
  const handleModal = () => {
    // Here set the Modal to false to let user close it.
    setShowModal(false);
    // Here reset the orderDetails array to empty when the modal is closed.
    setOrderDetails([]);
    }
    
    return { loading, userOrders, error,  showModal, orderDetails, handleOrderDetails, handleModal };

};


export default useOrders;