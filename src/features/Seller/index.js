import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import TableChartIcon from '@material-ui/icons/TableChart';
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import Account from "./pages/Account/Account";
import Shirts from "./pages/FootballShirts/FootballShirts";
import Setting from "./pages/Setting/Setting";
import SellerLayout from "../../components/Layout/seller/SellerLayout";
import OrdersDetail from "../../components/OrdersDetail";
import Order from "./pages/Orders/Orders";
const pages = [
    {
        title: "Tài khoản",
        href: "/seller/account",
        icon: <AccountBoxIcon />,
    },
    
    {
        title: "Sản phẩm",
        href: "/seller/shirts",
        icon: <TableChartIcon />,
    },
    {
        title: "Đơn hàng",
        href: "/seller/order",
        icon: <ShoppingBasketIcon />,
    },
    {
        title: "Cài đặt",
        href: "/seller/setting",
        icon: <SettingsIcon />,
    },
    
];


function Seller(props) {
    const match = useRouteMatch();
    return (
        <SellerLayout pages={pages} >
            <Switch>
                <Redirect exact from={match.url} to="/seller/account" />

                <Route
                    exact
                    path={`${match.url}/account`}
                    component={Account}
                />
                <Route exact path={`${match.url}/shirts`} component={Shirts}/>
                <Route exact path={`${match.url}/order`} component={Order}/>
                <Route
                    exact path={`${match.url}/setting`}
                    component={Setting}
                />
                <Route
                    exact
                    path={`${match.url}/orders/detail/:id_orders`}
                    component={OrdersDetail}
                />
            </Switch>
        </SellerLayout>
    );
}

export default Seller;