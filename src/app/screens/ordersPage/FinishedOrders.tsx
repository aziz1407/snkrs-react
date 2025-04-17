import React, { useState } from "react";
import { Stack, Box, Button } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { Product } from "../../../lib/data/types/product";
import { serverApi } from "../../../lib/config";
import { Order, OrderItem } from "../../../lib/data/types/order";

/** REDUX SLICE & SELECTOR **/
const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 2;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = finishedOrders?.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <TabPanel value={"3"}>
      <Stack>
        {currentOrders?.map((order: Order) => (
          <Box key={order._id} className={"order-main-box"}>
            <Box className="order-box-scroll">
              {order?.orderItems?.map((item: OrderItem) => {
                const product: Product = order.productData.filter(
                  (ele: Product) => item.productId === ele._id
                )[0];
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <Box key={item._id} className={"orders-name-price"} sx={{ color: "black" }}>
                    <img src={imagePath} className="order-dish-img" />
                    <p className={"title-dish"}>{product.productName}</p>
                    <Box className={"price-box"}>
                      <p>${item.itemPrice}</p>
                      <img src={"/icons/close.svg"} />
                      <p>{item.itemQuantity}</p>
                      <img src={"icons/pause.svg"} />
                      <p>${item.itemQuantity * item.itemPrice}</p>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Box className={"total-price-box"}>
              <Box className={"box-total"}>
                <p style={{ color: "black" }}>Product Price</p>
                <p style={{ color: "black" }}>${order.orderTotal - order.orderDelivery}</p>
                <img src={"/icons/plus.svg"} />
                <p style={{ marginLeft: "10px", color: "black" }}>Delivery fee</p>
                <p>${order.orderDelivery}</p>
                <img src={"/icons/pause.svg"} />
                <p style={{ marginRight: "10px", color: "black" }}>Total</p>
                <p style={{ marginRight: "10px", color: "black" }}>${order.orderTotal}</p>
              </Box>
            </Box>
          </Box>
        ))}

        {!currentOrders || currentOrders.length === 0 ? (
          <Box marginLeft={"150px"} marginTop={"100px"}>
            <img
              src={"/icons/not-found.svg"}
              style={{ width: 300, height: 300 }}
              alt="Not found"
            />
          </Box>
        ) : null}

        <Box className="pagination">
          {currentPage > 1 && (
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              variant="contained"
              sx={{ background: "orange", color: "white", textTransform: "capitalize"}}
            >
              Back
            </Button>
          )}
          {currentPage < Math.ceil((finishedOrders?.length ?? 0) / ordersPerPage) && (
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              variant="contained"
              sx={{ background: "orange", color: "white", marginTop: "15px", textTransform: "capitalize"}}
            >
              Next
            </Button>
          )}
        </Box>
      </Stack>
    </TabPanel>
  );
}
