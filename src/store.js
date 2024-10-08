import { create } from "zustand";

// orderSingleMenu(메뉴 한개 담기) --> singleOrder(장바구니) --> ordersPerDay(하루에 발생한 주문들) --> stat(모든 주문들)
// orderSingleMenu로 메뉴 주문 한개에 대한 객체 생성  (페이지 간의 정보 넘겨주는데 활용)
// 주문담기 시점에 orderSingleMenu

// 결제시점에 singleOrderStore에 있는 전역 상태들을 orderHistory에 하나의 객체로 저장
// 후 singleOrderStore는 reset
// orderHistory 는 singleOrder들로 이루어진 배열???

export const orderStore = create((set, get) => ({
    takeOut: false, //false: 매장식사, true: 포장주문
    menuName: "",
    price: "", // price와 quantity 는 number, string 중에 뭘로 하는지에 따라서 함수에서 state 쓸지 결정됨
    quantity: "",
    details: "",
    order: [],

    eatPlace: (takeOut) => set({ takeOut }),

<<<<<<< HEAD
    takeOut : false,     //false: 매장식사, true: 포장주문
    menuName : '',
    price : '',         // price와 quantity 는 number, string 중에 뭘로 하는지에 따라서 함수에서 state 쓸지 결정됨
    quantity : 1,
    details : '',
    order : [],

    eatPlace : (takeOut) => set({takeOut}),

    orderSingleMenu : (menuName, price, quantity, details) => set({menuName, price, quantity, details}),

    singleOrder : ()=>{
        const { menuName, price, quantity, details, order } = get();   // 현재 값 접근        
        const newOrder = [...order, { menuName, price, quantity, details }];    
        set({ order: newOrder});
              
    },

    deleteSingleOrder : (index)=>{
        const {order} = get();
        const deletedOrder = order.filter((ord)=> ord.index !== parseInt(index));
        set({order: deletedOrder});
=======
    orderSingleMenu: (menuName, price, quantity, details) => set({ menuName, price, quantity, details }),

    singleOrder: () => {
        const { menuName, price, quantity, details, order } = get(); // 현재 값 접근
        if (Array.isArray(order)) {
            const newOrder = [...order, { menuName, price, quantity, details }];
            set({ order: newOrder });
        } else {
            console.error("Order is not an array!!!!!!!!!!!!");
        }
>>>>>>> 1b63467f821fdf47a839d43c22ccd7218b6dad36
    },

    reset: () => set({ takeOut: false, menuName: "", price: "", quantity: "", details: "" }),
}));

export const orderHistory = create((set) => ({
    ordersPerDay: [{}],

    storeOrder: () => [{}],
}));

<<<<<<< HEAD
export const memberNumber = create((set) => ({
    // 회원 추가

    phoneNumber : '', // 회원 전화번호
    point : '', // 회원 포인트

    add : (phoneNumber, point) => set({phoneNumber,point})
}))



=======
export const checkDetail = create((set) => ({
    selectedValues: {},
    setSelectedValues: (group, value) =>
        set((state) => ({
            selectedValues: {
                ...state.selectedValues,
                [group]: value,
            },
        })),
    toggleCheckbox: (group, value) =>
        set((state) => {
            const selectedCheckboxes = state.selectedValues[group] || [];
            if (selectedCheckboxes.includes(value)) {
                return {
                    selectedValues: {
                        ...state.selectedValues,
                        [group]: selectedCheckboxes.filter((v) => v !== value),
                    },
                };
            } else {
                return {
                    selectedValues: {
                        ...state.selectedValues,
                        [group]: [...selectedCheckboxes, value],
                    },
                };
            }
        }),
    resetValues: () =>
        set({
            selectedValues: {},
        }),
}));

export const memberNumber = create((set) => ({
    // 회원 추가

    phoneNumber: "", // 회원 전화번호
    point: "", // 회원 포인트

    add: (phoneNumber, point) => set({ phoneNumber, point }),
}));
>>>>>>> 1b63467f821fdf47a839d43c22ccd7218b6dad36
