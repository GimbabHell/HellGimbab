import { create } from "zustand";

// orderSingleMenu(메뉴 한개 담기) --> singleOrder(장바구니) --> ordersPerDay(하루에 발생한 주문들) --> stat(모든 주문들)
// orderSingleMenu로 메뉴 주문 한개에 대한 객체 생성  (페이지 간의 정보 넘겨주는데 활용)
// 주문담기 시점에 orderSingleMenu

// 결제시점에 singleOrderStore에 있는 전역 상태들을 orderHistory에 하나의 객체로 저장
// 후 singleOrderStore는 reset
// orderHistory 는 singleOrder들로 이루어진 배열???

export const orderStore = create((set, get) => ({
    
    menuName: '',
    quantity: 1,
    categoryCode: 1,
    details: '',    // details key 와 value 로 이루어진 배열
    detailsToShow: '',  // 보여주기용 details values
    orderNum: 1,
    price: 0, // price와 quantity 는 number, string 중에 뭘로 하는지에 따라서 함수에서 state 쓸지 결정됨
    detailsPrice: 0,       // details 선택으로 인한 추가금
    itemPrice: 0,          // price + detailsPrice
    unitPrice: 0,           // itemPrice * quantity

    toGo: false, //false: 매장식사, true: 포장주문
    totalPrice: 0,          // 총 가격
    totalObjNum: 0,         // 총 개수
    forHereReceiptNum: 0,            // 주문번호/// 결제완료시 배부
    toGoReceiptNum: 100,
    date: [],               // 결제시에 날짜, 시간이 담기는 배열
    order: [],              // 1회의 주문을 담아주는 배열//// 결제완료시 reset
    orderHistory: [],       // 결제완료된 모든 주문을 담아주는 기록 배열
    
    selectedMenus: [],      // 장바구니에 담긴 메뉴들의 이름을 기록해주는 배열 

    setDate: (year, month, date, day, hour, minute) => set({ date: {['year'] : year,
                                                                    ['month'] : month,
                                                                    ['date'] : date,
                                                                    ['day'] : day,
                                                                    ['hour'] : hour,
                                                                    ['minute'] : minute }}),

    setReceiptNum: () => {
        const { toGo, toGoReceiptNum, forHereReceiptNum } = get();
        if(toGo === true){
            set({ toGoReceiptNum : toGoReceiptNum + 1});
        }else{
            set({ forHereReceiptNum : forHereReceiptNum + 1});
        }
    },

    setOrderHistory: (userNum) => {
        const { order, orderHistory, toGo, totalPrice, totalObjNum, toGoReceiptNum, forHereReceiptNum, date } = get();
        const newHistory = toGo === true? [...orderHistory, { userNum, date, toGo, toGoReceiptNum, totalPrice, totalObjNum, order }] :
                                          [...orderHistory, { userNum, date, toGo, forHereReceiptNum, totalPrice, totalObjNum, order }];
        set({ orderHistory: newHistory });
    },

    resetReceiptNum: () => {
        const { orderHistory, date } = get();
        if(orderHistory.length !== 0) {
            if(date.date !== orderHistory[orderHistory.length - 1].date.date){
                set({ forHereReceiptNum: 0, toGoReceiptNum: 100 })
            }
        }
    },

    setSelectedMenus: (selecMenu) => {
        set({ selectedMenus: selecMenu});
    },

    clearAll: () => set({ order: [], selectedMenus: [] }),

    setPlace: (toGo) => set({ toGo }),

    setDetailPrice: (detailsPrice) => set({detailsPrice}),

    setItemPrice: () => {
        const { price, detailsPrice } = get(); // 현재 price 접근
        set({ itemPrice: price + detailsPrice });
    },

    setUnitPrice: () => {
        const { itemPrice, quantity} = get();
        set({ unitPrice: itemPrice * quantity});
    },

    setTotalPrice: (totalPrice) => set({totalPrice}),

    setTotalObjNum: (totalObjNum) => set({totalObjNum}),

    setDetailsToShow: () => {
        const { details } = get(); // 현재 details 접근
        const detailValues = Object.values(details);
        set({ detailsToShow: detailValues.join(', ')});
    },

    setOrderDetails: (menuName, price, categoryCode, details) => set({ menuName, price, categoryCode, details }),

    singleOrder: () => {
        const { menuName, price, quantity, details, detailsToShow, order, orderNum, detailsPrice, itemPrice, unitPrice, categoryCode } = get(); // 현재 값 접근
        const newOrder = [...order, { orderNum, menuName, categoryCode, price, quantity, details, detailsToShow, detailsPrice, itemPrice, unitPrice }];
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
                if(ord.quantity > 1){
                    return {...ord, quantity: ord.quantity - 1,
                                    unitPrice: ord.unitPrice - ord.itemPrice
                    };
                }
            }
            return ord;
        });
        set({ order : redQttOrder});
    },

    addQuantity: (num) =>{
        const { order } = get();
        const addQttOrder = order.map((ord)=> {
            if(ord.orderNum === parseInt(num)){
                if(ord.quantity < 10){
                    return {...ord, quantity: ord.quantity + 1,
                                    unitPrice: ord.unitPrice + ord.itemPrice
                    };
                }
            }
            return ord;
        });
        set({ order : addQttOrder});
    },

    addQuantityBySelect: () =>{
        const { order, menuName } = get();
        const addQttOrd = order.map((ord)=> {
            if(ord.menuName === menuName){
                if(ord.quantity < 10){
                    return {...ord, quantity: ord.quantity + 1,
                                    unitPrice: ord.unitPrice + ord.itemPrice
                    };
                }
            }
            return ord;
        });
        set({ order : addQttOrd});
    },

    reset: () => set({ menuName: '', price: 0, quantity: 1, details: '', detailsToShow: '', detailsPrice: 0, itemPrice: 0, unitPrice: 0 }),

    resetAll: () => set({ toGo : false, menuName: '', quantity: 1, categoryCode: 1, details: '', detailsToShow: '', orderNum:1, 
        price: 0, detailsPrice: 0, itemPrice: 0, unitPrice: 0, totalPrice: 0, totalObjNum: 0, order: [], selectedMenus: [] }),


    resetFinal: () => set({menuName: '', quantity: 1, categoryCode: 1, details: '', detailsToShow: '', orderNum: 1, price: 0, itemPrice: 0, unitPrice: 0, 
        toGo: false, totalPrice: 0, date: [], order: [], selectedMenus: []})

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
    plusPoint : '', // 사용자가 사용할 포인트
    
    members : [],
    
    // 회원 추가 
    add: (phoneNumber, point) => {
        set(state => {
            const exists = state.members.some(member => member.phoneNumber === phoneNumber);
            if (!exists) {
                return {
                    members: [...state.members, { phoneNumber, point}],
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
                    return { ...member, point: parseInt(member.point) + parseInt(pointsToAdd) };
                }
                return member;
            });
            return { members };
        });
    },

    
    plusPointNum: (value) => {
        set({ plusPoint: value })
    } ,


    plusPhoneNum: (value) => {
        set({ phoneNumber: value })
    } ,

    


    subtractPoints: (phoneNumber, value) => {
        set((state) => {
            const updatedMembers = state.members.map(member => {
                if (member.phoneNumber === phoneNumber) {
                    // 기존 포인트에서 차감하고 0 미만으로 떨어지지 않게 설정
                    const newPoint = Math.max(0, member.point - value);
                    return { ...member, point: newPoint }; // 포인트 업데이트
                }
                return member; // 해당 회원이 아닐 경우 원래 회원 정보 유지
            });
            return { members: updatedMembers }; // 업데이트된 회원 정보로 상태 반환
        });
    },
    


    // 회원 조회 
    // 원래는 return member || null; 이였음.... 
    findMember: (phoneNumber) => {
        const member = get().members.find(member => member.phoneNumber === phoneNumber);
        return member? member : null; // 회원이 없으면 null 반환
        
    },

    // 포인트 조회
    getPoints: (phoneNumber) => {
        
       // console.log(state.members)
         const member = get().members.find(member => member.phoneNumber === phoneNumber);
        // console.log(member);
        // console.log(member.point);
        return member ? member.point : null;; // 포인트 반환, 없으면 null
    },

    // reset: () => set({ phoneNumber : '',   point : '', plusPointNumber : '' })

}))











