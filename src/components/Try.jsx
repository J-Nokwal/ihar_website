import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../store/tryStore';

const Try = () => {
    const counter = useSelector((state) => state.try.counter);
    const dispatch = useDispatch();
    console.log("zzzzzzzzz");
    useEffect(()=>{
        dispatch(increment());
    },[])

  return (
    <div>{counter}</div>
  )
}

export default Try