import React from 'react'
import Block from './Block'

const MainContent = () => {
  return (
   <main className='flex-1 p-6 overflow-y-auto'>
    
    <section className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
        <Block title="Block 1" className="bg-white p-6 rounded-lg shadow">
            <p>Your current ML worth score : <span className='font-bold text-blue-600 text-2xl'>8 / 10</span></p>
            <p className='text-sm text-gray-500 mt-1'>Score updated daily.</p>
        </Block>

        <Block title="Block 2" className="bg-white p-6 rounded-lg shadow">
            <p>Block 1</p>
            <p>Add new Supply</p>
        </Block>
    </section>

    <section className='grid grid-cols-1'>
        <Block title="Block 3" className="bg-white p-6 rounded-lg shadow">
            <p>display all the supply items</p>
            <p>display all the supply items - update/delete</p>
        </Block>
    </section>
   </main>
  );
};

export default MainContent