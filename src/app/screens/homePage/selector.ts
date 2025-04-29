import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/data/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;
export const retrievePopularDishes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.bestSeller
);

export const retreiveNewDrops = createSelector(
    selectHomePage,
    (HomePage) => HomePage.newDrops
  );

  export const retrieveTopUsers = createSelector(
    selectHomePage,
    (HomePage) => HomePage.topUsers
  );
