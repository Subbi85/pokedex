import React from 'react'

const Layout = () => {
  return (
    <div className='flex flex-row'>
        {/*LIST*/}
        <div className=' flex-col flex-1 bg-yellow-100'>
            Liste der Pokemon
        </div>
        <div className=' justify-center align-middle items-center flex-6'>
            Detailansicht
        </div>
    </div>
  )
}

export default Layout
