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
    price: 0, // price와 quantity 는 number, string 중에 뭘로 하는지에 따라서 함수에서 state 쓸지 결정됨
    quantity: 1,
    details: "",    // details key 와 value 로 이루어진 배열
    detailsToShow: "",  // 보여주기용 details values
    orderNum: 1,
    order: [],

    setPlace: (takeOut) => set({ takeOut }),

    setPrice: (detailPrice) => {
        const { price } = get(); // 현재 price 접근
        set({ price: price + detailPrice });
    },

    setDetailsToShow: () => {
        const { details } = get(); // 현재 details 접근
        const detailValues = Object.values(details);
        set({ detailsToShow: detailValues.join('   ||   ')});
    },

    orderSingleMenu: (menuName, price, details) => set({ menuName, price, details }),

    singleOrder: () => {
        const { menuName, price, quantity, details, detailsToShow, order, orderNum } = get(); // 현재 값 접근
        const newOrder = [...order, { orderNum, menuName, price, quantity, details, detailsToShow }];
        set({ order: newOrder });
        set({ orderNum: orderNum + 1 });
    },

    deleteSingleOrder: (num) => {
        const { order } = get();
        const deletedOrder = order.filter((ord) => ord.orderNum !== parseInt(num));
        set({ order: deletedOrder });
    },

    reduceQuantity: (num) =>{
        const { order } = get();
        const redQttOrder = order.map((ord)=> {
            if(ord.orderNum === parseInt(num)){
                return {...ord, quantity: ord.quantity - 1};
            }
            return ord;
        });
        set({ order : redQttOrder});
    },

    reset: () => set({ takeOut: false, menuName: '', price: 0, quantity: 1, details: '', detailsToShow: '' }),
}));

export const orderHistory = create((set) => ({
    ordersPerDay: [{}],

    storeOrder: () => [{}],
}));

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
