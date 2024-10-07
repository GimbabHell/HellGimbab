import {create} from "zustand";
// member.json 에 없는 회원을 추가해 줄 zustand 

const useState = create((set) => ({

    phoneNumber : 0, // 회원 전화번호
    point : 0, // 회원 포인트

    add : () => set((state) => ({}))





}))