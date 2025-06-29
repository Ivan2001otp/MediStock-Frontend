import React from 'react'

interface BlocProps {
    title : string;
    children : React.ReactNode;
    className? : string;
}

const Block : React.FC<BlocProps> = ({title, children, className}) => {
  return (
    <div className={className}>
        <h2 className='text-xl font-semibold mb-4 text-gray-700'>{title}</h2>
        {children}
    </div>
  );
}

export default Block