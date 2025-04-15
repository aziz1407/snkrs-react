import React from "react";
import { Stack, Box } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
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
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);

interface PausedOrdersProps {
  setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
  const {setValue} = props;
  const {authMember, setOrderBuilder} = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  //** HANDLERS **/

  const deleteOrderHandler = async (e: T) => {
    try {
      if(!authMember) throw Error(Messages.error2)
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirmation = window.confirm("Sure?");
      if(confirmation) {
        const order = new OrderService();

        await order.updateOrder(input);
        setOrderBuilder(new Date());
      }

    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (e: T) => {
    try {
      if(!authMember) throw Error(Messages.error2);
      //PAYMENT PROCESS
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.PROCESS,
      };

      const confirmation = window.confirm("Wanna proceed the payment?");
      if(confirmation) {
        const order = new OrderService();

        await order.updateOrder(input);
        setValue("2");
        setOrderBuilder(new Date());
      }

    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"1"}>
      <Stack>
        {pausedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className={"order-main-box"}>
              <Box className="order-box-scroll">
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} className={"orders-name-price"} sx={{color: "black"}}>
                      <img src={imagePath} className="order-dish-img" />
                      <p className={"title-dish"} >{product.productName}</p>
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
                  <p style={{color: "black"}}>Product Price</p>
                  <p style={{color: "black"}} >${order.orderTotal - order.orderDelivery}</p>
                  <img src={"/icons/plus.svg"} />
                  <p style={{ marginLeft: "10px", color: "black" }}>Delivery fee</p>
                  <p style={{color: "black"}}>${order.orderDelivery}</p>
                  <img src={"/icons/pause.svg"} />
                  <p style={{ marginLeft: "10px", color: "black"}}>Total</p>
                  <p>${order.orderTotal}</p>
                </Box>
                <Button
                  value={order._id}
                  variant="contained"
                  color="secondary"
                  className={"cancel-button"}
                  onClick={deleteOrderHandler}
                >
                  Cancel
                </Button>
                <Button
                  value={order._id}
                  variant="contained"
                  className={"pay-btn"}
                  onClick={processOrderHandler}
                >
                  Payment
                </Button>
              </Box>
            </Box>
          );
        })}

        {!pausedOrders ||
          (pausedOrders.length === 0 && (
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
