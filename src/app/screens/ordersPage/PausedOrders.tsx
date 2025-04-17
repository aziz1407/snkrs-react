import React, { useState } from "react";
import {
  Stack,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
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
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [deleteOrderConfirmOpen, setDeleteOrderConfirmOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); 
  const ordersPerPage = 2; 


  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = pausedOrders?.slice(indexOfFirstOrder, indexOfLastOrder);

  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleConfirm = (orderId: string) => {
    setSelectedOrderId(orderId);
    setConfirmOpen(true);
  };

  const handleCloseConfirm = () => {
    setConfirmOpen(false);
    setSelectedOrderId(null);
  };

  const handleConfirmProceed = async () => {
    if (!selectedOrderId) return;

    try {
      if (!authMember) throw Error(Messages.error2);
      const input: OrderUpdateInput = {
        orderId: selectedOrderId,
        orderStatus: OrderStatus.PROCESS,
      };
      const order = new OrderService();
      await order.updateOrder(input);
      setValue("2");
      setOrderBuilder(new Date());
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    } finally {
      handleCloseConfirm();
    }
  };

  const handleDeleteOrderConfirm = (orderId: string) => {
    setSelectedOrderId(orderId);
    setDeleteOrderConfirmOpen(true);
  };

  const handleCloseDeleteOrderConfirm = () => {
    setDeleteOrderConfirmOpen(false);
    setSelectedOrderId(null);
  };

  const handleDeleteOrderProceed = async () => {
    if (!selectedOrderId) return;

    try {
      if (!authMember) throw Error(Messages.error2);
      const input: OrderUpdateInput = {
        orderId: selectedOrderId,
        orderStatus: OrderStatus.DELETE,
      };
      const order = new OrderService();
      await order.updateOrder(input);
      setOrderBuilder(new Date());
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    } finally {
      handleCloseDeleteOrderConfirm();
    }
  };

  return (
    <TabPanel value={"1"}>
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
                        <p>${(item.itemQuantity * item.itemPrice).toFixed(2)}</p>
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
                    onClick={() => handleDeleteOrderConfirm(order._id)}
                  >
                    Cancel
                  </Button>
                  <Button
                    value={order._id}
                    variant="contained"
                    className="pay-btn"
                    onClick={() => handleConfirm(order._id)}
                  >
                    Payment
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })}

        {!currentOrders ||
          (currentOrders.length === 0 && (
            <Box className="no-orders">
              <img
                src="/icons/not-found.svg"
                alt="No orders found"
                style={{ width: 300, height: 300 }}
              />
            </Box>
          ))}

        <div className="pagination">
          {currentPage > 1 && (
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              variant="contained"
              sx={{
                background: "orange",
                color: "white",
                fontWeight: "bold",
                textTransform: "capitalize"
              }}
            >
              Back
            </Button>
          )}
          {currentPage < Math.ceil(pausedOrders?.length / ordersPerPage) && (
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              variant="contained"
              sx={{
                background: "orange",
                color: "white",
                fontWeight: "bold",
                textTransform: "capitalize"
              }}
            >
              Next
            </Button>
          )}
        </div>
      </Stack>

      <Dialog
        open={deleteOrderConfirmOpen}
        onClose={handleCloseDeleteOrderConfirm}
        PaperProps={{ className: "confirmation-dialog" }}
      >
        <DialogTitle>Proceed with Deletion?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this order?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteOrderConfirm}
            color="error"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteOrderProceed}
            color="primary"
            variant="contained"
            sx={{ background: "red", color: "white" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmOpen}
        onClose={handleCloseConfirm}
        PaperProps={{ className: "confirmation-dialog" }}
      >
        <DialogTitle>Proceed with Payment?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to continue with the payment?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="error" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmProceed}
            variant="contained"
            sx={{ background: "skyblue", color: "white" }}
          >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </TabPanel>
  );
}
