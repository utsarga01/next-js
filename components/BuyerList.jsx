import { useQuery } from '@tanstack/react-query';
import React from 'react'

const BuyerList = () => {
  const {data,isPending,error}= useQuery
  return (
    <div>BuyerList</div>
  )
}

export default BuyerList;