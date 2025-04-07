import React from "react";
import { Stack, Box } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { Product } from "../../../lib/data/types/product";
import { Messages, serverApi } from "../../../lib/config";
import {
  Order,
  OrderItem,
  OrderUpdateInput,
} from "../../../lib/data/types/order";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { T } from "../../../lib/data/types/common";
import { OrderStatus } from "../../../lib/data/enums/order.enum";
import { useGlobals } from "../../../app/hooks/useGlobals";
import OrderService from "../../../app/services/OrderService";

/** REDUX SLICE & SELECTOR **/
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders })
);

interface ProcessedOrdersProps {
  setValue: (input: string) => void;
}

export default function ProcessOrders(props: ProcessedOrdersProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { processOrders } = useSelector(processOrdersRetriever);

  //** HANDLERS **/

  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw Error(Messages.error2);

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const confirmation = window.confirm("Got your order?");
      if (confirmation) {
        const order = new OrderService();

        await order.updateOrder(input);
        setValue("3");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"2"}>
      <Stack>
        {processOrders?.map((order: Order) => {
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
                  <p>Product Price</p>
                  <p>${order.orderTotal - order.orderDelivery}</p>
                  <img src={"/icons/plus.svg"} />
                  <p style={{ marginLeft: "10px" }}>Delivery fee</p>
                  <p>${order.orderDelivery}</p>
                  <img src={"/icons/pause.svg"} />
                  <p style={{ marginRight: "10px" }}>Total</p>
                  <p style={{ marginRight: "10px" }}>${order.orderTotal}</p>
                </Box>
                <p style={{ marginRight: "5px" }}>
                  {moment().format("YY-MM-DD: HH:mm")}
                </p>
                <Button
                  value={order._id}
                  variant="contained"
                  className="verify-button"
                  onClick={finishOrderHandler}
                >
                  Confirm Order
                </Button>
              </Box>
            </Box>
          );
        })}

        {!processOrders ||
          (processOrders.length === 0 && (
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
