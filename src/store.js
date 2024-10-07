import { create } from "zustand";

// singleOrderStore로 주문 한개에 대한 객체 생성  (페이지 간의 정보 넘겨주는데 활용)
// 결제시점에 singleOrderStore에 있는 전역 상태들을 orderHistory에 하나의 객체로 저장
// 후 singleOrderStore는 reset
// orderHistory 는 singleOrder들로 이루어진 배열???


export const singleOrderStore = create((set)=>({

    forHere : true,     //true: 매장식사, false: 포장주문
    menuName : '',
    price : '',         // price와 quantity 는 number, string 중에 뭘로 하는지에 따라서 함수에서 state 쓸지 결정됨
    quantity : '',
    details : '',

    eatPlace : (forHere) => set({forHere}),

    order : (menuName, price, quantity, details) => set({menuName, price, quantity, details}),

    reset : () => set({forHere : true, menuName : '', price : '', quantity : '', details : ''})

}))

export const orderHistory = create((set)=>({

    ordersPerDay : [{}],

    storeOrder : ()=>[{}]

}))

export const checkDetail = create((set)=> ({
    details: [],
    setDetails: (menu) => set((state) => ({
        details: [...state.details, menu]
    })),
    setDetailFilter: (menu)=> set(()=>({
        details: menu
    })),
    setDetailsRadio:  (name, isChecked) => set((state) => {
        if (isChecked) {
            return { details: [...state.details, name] };
        } else {
            return { details: state.details.filter((item) => item !== name) };
        }
    })
}));






