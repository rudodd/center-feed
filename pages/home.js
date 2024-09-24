// import library functionality
import React, { useEffect } from 'react';

// import custom functionality
import useData from '../utils/useData';

// import components
import Header from '../components/Header';

export default function Home() {
  const { data, isLoading } = useData();

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <>
      <Header loading={isLoading} refresh={null}/>
    </>
  )
}