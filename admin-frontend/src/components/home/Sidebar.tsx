import React, { FC } from 'react';
interface OptionalProps {
  setShow?:React.Dispatch<React.SetStateAction<boolean>> ;
}
const Sidebar:FC<OptionalProps> = () => {

  return (
    <>
    <div className="flex flex-col items-center min-w-350 h-full text-white">

    </div>
    </>
  )
}

export default Sidebar
