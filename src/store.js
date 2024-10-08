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

    orderSingleMenu: (menuName, price, quantity, details) => set({ menuName, price, quantity, details }),

    singleOrder: () => {
        const { menuName, price, quantity, details, order } = get(); // 현재 값 접근
        
        const newOrder = [...order, { menuName, price, quantity, details }];
        set({ order: newOrder });
        
    },

    reset: () => set({ takeOut: false, menuName: "", price: "", quantity: "", details: "" }),
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


export const useMemberStore = create((set, get) => ({
    // 회원 추가

    phoneNumber : '', // 회원 전화번호
    point : '', // 회원 포인트
    totalCost : 0,
    members : [],


    // 회원 추가
    add: (phoneNumber, point) => {
        set(state => {
            const exists = state.members.some(member => member.phoneNumber === phoneNumber);
            if (!exists) {
                return {
                    members: [...state.members, { phoneNumber, point }],
                    phoneNumber: '',
                    point: 0
                };
            }
            return state; // 중복되는 전화번호일 경우 상태를 변경하지 않음
        });
    },


    // 포인트 추가
    addPoints: (phoneNumber, pointsToAdd) => {
        set(state => {
            const members = state.members.map(member => {
                if (member.phoneNumber === phoneNumber) {
                    return { ...member, point: member.point + pointsToAdd };
                }
                return member;
            });
            return { members };
        });
    },


    // 포인트 차감
    subtractPoints: (phoneNumber, pointsToSubtract) => {
        set(state => {
            const members = state.members.map(member => {
                if (member.phoneNumber === phoneNumber) {
                    return { ...member, point: Math.max(0, member.point - pointsToSubtract) };
                     // 포인트가 0 이하로 떨어지지 않도록
                }
                return member;
            });
            return { members };
        });
    },


    // 회원 조회
    findMember: (phoneNumber) => {
        const member = get().members.find(member => member.phoneNumber === phoneNumber);
        return member || null; // 회원이 없으면 null 반환
    },

    // 포인트 조회
    getPoints: (phoneNumber) => {
        const member = get().members.find(member => member.phoneNumber === phoneNumber);
        return member ? member.point : null; // 포인트 반환, 없으면 null
    }


}))











