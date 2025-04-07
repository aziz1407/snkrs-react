import { Container, Stack, Box } from "@mui/material";
import { useState, SyntheticEvent, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import { Dispatch } from "@reduxjs/toolkit";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import Divider from "../../components/divider";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { Order, OrderInquiry } from "../../../lib/data/types/order";
import { useDispatch } from "react-redux";
import { OrderStatus } from "../../../lib/data/enums/order.enum";
import OrderService from "../../../app/services/OrderService";
import { useGlobals } from "../../../app/hooks/useGlobals";
import "../../../css/order.css";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/data/enums/member.enum";

/** REDUX SLICE **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)), //slice actions
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const history = useHistory();
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const { orderBuilder, authMember } = useGlobals();
  const [value, setValue] = useState("1");
  const [orderInquiry, setorderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  //** HANDLERS */
  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!authMember) history.push("/");

  return (
    <div className="order-page">
      <Container className="order-container">
        <Stack className="order-left">
          <TabContext value={value}>
            <Box
              sx={{
                borderColor: "divider",
                marginTop: "56px",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic-tabs-example"
                style={{ marginLeft: "50px" }}
              >
                <Tab label="PAUSED ORDERS" value={"1"}></Tab>
                <Tab label="PROCESS ORDERS" value={"2"}></Tab>
                <Tab label="FINISHED ORDERS" value={"3"}></Tab>
              </Tabs>
            </Box>
            <Stack className="order-main-content">
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />

              <Stack className="right-card">
                <Stack className="right-1">
                  <div className="image-frame">
                    <div className="icon-frame">
                    <div className={"order-user-img"}>
              <img
                  src={authMember?.memberImage
                    ? `${serverApi}/${authMember.memberImage}`
                    : "/icons/default-user.svg"}
                  className={"order-user-avatar"}
                /> 
                <div className={"order-user-icon-box"}>
                  <img
                    src={authMember?.memberType === MemberType.RESTAURANT
                      ? "/icons/restaurant.svg"
                      : "/icons/user-badge.svg"}
                    className={"order-user-prof-img"}
                  />
                </div>
              </div>
                    </div>
                  </div>
                  <span className="name">{authMember?.memberNick}</span>
                  <Box
                    sx={{
                      fontFamily: "comissioner",
                      fontSize: "18px",
                      color: "#A1A1A1",
                    }}
                  >
                    {authMember?.memberType}
                  </Box>
                  <Box marginTop={"40px"}>
                    <Divider width="332" height="2" bg="#A1A1A1" />
                  </Box>
                  <Stack className="city-desc">
                    <Box>
                      <img
                        src="/icons/location.svg"
                        style={{ marginRight: "10px" }}
                      />
                    </Box>
                    <span>{authMember?.memberAddress
                ? authMember.memberAddress
                : "no address"}</span>
                  </Stack>
                </Stack>
                <Stack className="right-2">
                  <input
                    type="text"
                    placeholder="Card number"
                    className="input-1"
                  />

                  <div className="second-column">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="input-2"
                    />

                    <input
                      type="text"
                      placeholder="CVV"
                      maxLength={3}
                      pattern="[0-9]*"
                      className="input-3"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Cardholder name"
                    className="input-4"
                  />

                  <div className="cards">
                    <div>
                      <img src="/icons/visa-card.svg" alt="" />
                    </div>
                    <div>
                      <img src="/icons/master-card.svg" alt="" />
                    </div>
                    <div>
                      <img src="/icons/paypal-card.svg" alt="" />
                    </div>
                    <div>
                      <img src="/icons/western-card.svg" alt="" />
                    </div>
                  </div>
                </Stack>
              </Stack>
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
