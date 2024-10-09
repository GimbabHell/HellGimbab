import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import MenuNavBar from "../components/Menu/MenuNavBar";
import { useEffect, useState } from "react";
import { orderStore } from "../store";

const MenuPage = () => {
    // menuDetail 에서 넘어온 정보들을 zustand에 저장
    // menuOrder 에서 zustand 접근해서 장바구니 넣기
    const location = useLocation();
    const orderData = location.state;

    // zustand orderStore
    const { orderSingleMenu } = orderStore();

    useEffect(() => {
        if (orderData !== null) {
            const menu = orderData.menu;
            const details = orderData.selectedValues;
            orderSingleMenu(menu.name, menu.price, details);
            console.log(orderData);
        }
    }, [orderData]);

    return (
        <>
            <MenuNavBar />
            <Outlet />
        </>
    );
};

export default MenuPage;
