import React, { useState } from "react";
import {
  Stack,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  capitalize,
} from "@mui/material";
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

interface ProcessOrdersProps {
  setValue: (input: string) => void;
}

export default function ProcessOrders(props: ProcessOrdersProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { processOrders } = useSelector(processOrdersRetriever);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [actionType, setActionType] = useState<"cancel" | "finish" | null>(
    null
  ); // Track action type
  const ordersPerPage = 2; // Number of orders per page

  const handleConfirm = (orderId: string, action: "cancel" | "finish") => {
    setSelectedOrderId(orderId);
    setActionType(action);
    setConfirmOpen(true);
  };

  const handleCloseConfirm = () => {
    setConfirmOpen(false);
    setSelectedOrderId(null);
    setActionType(null);
  };

  const handleConfirmProceed = async () => {
    if (!selectedOrderId || !actionType) return;

    try {
      if (!authMember) throw Error(Messages.error2);

      const input: OrderUpdateInput = {
        orderId: selectedOrderId,
        orderStatus:
          actionType === "finish" ? OrderStatus.SOLD : OrderStatus.DELETE,
      };

      const order = new OrderService();
      await order.updateOrder(input);

      if (actionType === "finish") {
        setValue("3");
        setOrderBuilder(new Date());
      }

      // Close the dialog
      handleCloseConfirm();
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = processOrders?.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <TabPanel value={"2"}>
      <Stack spacing={3} className="order-page">
        {currentOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className="order-main-box">
              <Box className="order-box-scroll">
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} className="orders-name-price">
                      <img
                        src={imagePath}
                        className="order-dish-img"
                        alt={product.productName}
                      />
                      <p className="title-dish">{product.productName}</p>
                      <Box className="price-box">
                        <p>${item.itemPrice}</p>
                        <img src="/icons/close.svg" alt="x" />
                        <p>{item.itemQuantity}</p>
                        <img src="/icons/pause.svg" alt="=" />
                        <p>
                          ${(item.itemQuantity * item.itemPrice).toFixed(2)}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className="total-price-box">
                <Box className="box-total">
                  <p>Product Price</p>
                  <p>${(order.orderTotal - order.orderDelivery).toFixed(2)}</p>
                  <img src="/icons/plus.svg" alt="+" />
                  <p style={{ marginLeft: "10px" }}>Delivery fee</p>
                  <p>${order.orderDelivery.toFixed(2)}</p>
                  <img src="/icons/pause.svg" alt="=" />
                  <p style={{ marginLeft: "10px" }}>Total</p>
                  <p>${order.orderTotal.toFixed(2)}</p>
                </Box>
                <Box className="action-buttons">
                  <Button
                    value={order._id}
                    variant="contained"
                    color="secondary"
                    className="cancel-button"
                    onClick={() => handleConfirm(order._id, "cancel")} // Open dialog for Cancel
                  >
                    Cancel
                  </Button>
                  <Button
                    value={order._id}
                    variant="contained"
                    className="pay-btn"
                    onClick={() => handleConfirm(order._id, "finish")}
                  >
                    Finish
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })}

        {!currentOrders || currentOrders.length === 0 ? (
          <Box className="no-orders">
            <img
              src="/icons/not-found.svg"
              alt="No orders found"
              style={{ width: 300, height: 300 }}
            />
          </Box>
        ) : null}

        <Box className="pagination">
          {currentPage > 1 && (
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              variant="contained"
              sx={{ background: "orange", color: "white", fontStyle: "bold", textTransform: "capitalize" }}
            >
              Back
            </Button>
          )}
          {currentPage < Math.ceil(processOrders?.length / ordersPerPage) && (
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              variant="contained"
              sx={{ background: "orange", color: "white", fontStyle: "bold", textTransform: "capitalize" }}
            >
              Next
            </Button>
          )}
        </Box>
      </Stack>

      <Dialog
        open={confirmOpen}
        onClose={handleCloseConfirm}
        PaperProps={{ className: "confirmation-dialog" }}
      >
        <DialogTitle>
          {actionType === "finish"
            ? "Proceed with order?"
            : "Proceed with canceling the order?"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {actionType === "cancel"
              ? "Are you sure you want to cancel this order?"
              : "Are you sure you want to confirm the order?"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseConfirm}
            color="error"
            variant="outlined"
            sx={{ background: "red", color: "white" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmProceed}
            variant="contained"
            sx={{ background: "skyblue", color: "white" }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </TabPanel>
  );
}
