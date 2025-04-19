import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/data/types/screen";

const initialState: HomePageState = {
  bestSeller: [],
  newDrops: [],
  topUsers: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setBestSeller: (state, action) => {  //state = initalState, action = data
      state.bestSeller = action.payload;
    },
    setNewDrops: (state, action) => {
      state.newDrops = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

export const { setBestSeller, setNewDrops, setTopUsers } =
  homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;