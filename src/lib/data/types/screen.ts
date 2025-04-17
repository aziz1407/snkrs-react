import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";

/** REACT APP STATE **/

export interface AppRootState { //screen-comp-based
    homePage: HomePageState;
    productsPage: ProductsPageState;
    ordersPage: OrdersStatePage;
}

/** HOMEPAGE **/
export interface HomePageState {
    popularDishes: Product[];
    newDishes: Product[];
    topUsers: Member[];
}

/** PRODUCTS PAGE **/
export interface ProductsPageState {
    admin: Member | null;
    chosenProduct: Product | null;
    products: Product[];
}

/** ORDERS PAGE **/
export interface OrdersStatePage {
    pausedOrders: Order[];
    processOrders: Order[];
    finishedOrders: Order[];
}
