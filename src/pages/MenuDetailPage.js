import { useEffect } from 'react';
import data from '../data/menuCategory.json';

const MenuDetailPage = () => {

    // 넘어온 아이디 값 test로 넣어둠
    const id = 1;

    useEffect(()=>{
        function getData(id){
            return data.find(item=>item.products);
        }
        console.log(getData(id));

        /* const menuCategory = getData(id);
        console.log(menuCategory); */

        const menuCategory = data.map(item=>{console.log(item.products)
            return item.products.find(num=>num===id)
        })
        console.log(menuCategory);
        console.log(menuCategory.find(item=>item !== undefined));

    }, [])

    

}

export default MenuDetailPage;