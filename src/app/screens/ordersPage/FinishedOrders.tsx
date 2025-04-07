import React from "react";
import { Stack, Box } from "@mui/material";
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

  return (
    <TabPanel value={"3"}>
      <Stack>
        {finishedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className={"order-main-box"}>
              <Box className="order-box-scroll">
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} className={"orders-name-price"}>
                      <img
                        src={imagePath}
                        className="order-dish-img"
                      />
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
                  <p>Product Price</p>
                  <p>${order.orderTotal - order.orderDelivery}</p>
                  <img src={"/icons/plus.svg"} />
                  <p style={{ marginLeft: "10px" }}>Delivery fee</p>
                  <p>${order.orderDelivery}</p>
                  <img src={"/icons/pause.svg"} />
                  <p style={{ marginRight: "10px" }}>Total</p>
                  <p style={{ marginRight: "10px" }}>${order.orderTotal}</p>
                </Box>
              </Box>
            </Box>
          );
        })}

        {!finishedOrders || (finishedOrders.length === 0
          && (
          <Box marginLeft={"150px"} marginTop={"100px"}>
            <img
              src={"/icons/not-found.svg"}
              style={{ width: 300, height: 300 }}
            />
          </Box>
        ))}
      </Stack>
    </TabPanel>
  );
}
