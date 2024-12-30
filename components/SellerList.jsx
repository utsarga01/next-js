import $axios from '@/lib/axios.instance'; 
import React, { useEffect } from 'react'; 
 
const SellerList = () => { 
  useEffect(() => { 
    const getProduct = async () => { 
      try { 
        const res = await $axios.post('/product/seller/list', { 
          page: 1, 
          limit: 10, 
        }); 
        console.log(res); 
      } catch (error) { 
        console.log('error vayo'); 
      } 
    }; 
    getProduct(); 
  }, []); 
  return <div>Seller List</div>; 
}; 
 
export default SellerList;