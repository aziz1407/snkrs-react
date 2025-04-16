import React, { useEffect } from "react";
import Statistics from "./Statistics";
import NewArrival from "./NewArrival";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPopularDishes, setNewDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/data/types/product";
import ProductService from "../../../app/services/ProductService";
import "../../../css/home.css";
import MemberService from "../../../app/services/MemberService";
import { Member } from "../../../lib/data/types/member";
import { Box, useTheme } from "@mui/material";
import Trending from "./BestSeller";
import { ProductCollection } from "../../../lib/data/enums/product.enum";
import BestSeller from "./BestSeller";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)), //slice actions
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  const { setPopularDishes, setNewDishes, setTopUsers } = actionDispatch(
    useDispatch()
  );

  useEffect(() => {
    const product = new ProductService();

    product
      .getProducts({
        page: 1,
        limit: 1,
        order: "productViews",
        productCollection: ProductCollection.NIKE,

      })
      .then((data) => setPopularDishes(data)) //where data gets loaded to store
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        // productCollection: ProductCollection.DISH,
      })
      .then((data) => setNewDishes(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.log(err));
  }, []);

  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: 2,
      }}
      className={"homepage"}
    >
      <NewArrival />
      <Advertisement />
      <BestSeller />
      <Statistics />
      <ActiveUsers />
      <Events />
    </Box>
  );
}
