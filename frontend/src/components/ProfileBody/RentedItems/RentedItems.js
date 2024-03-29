import React, { useState } from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'

function RentedItems() {
    const [itemsRented, setitemsRented]= useState(2)
    const [isitemsRented, setIsItemsRented]= useState(false)
    return (
        <div className='profileInfoCards'>
            <div className="flex sb">
                <div className="PICsHeader">
                   Rented Items 
                </div>
                <div onClick={()=> setIsItemsRented(!isitemsRented)} className="pointer">
                <IoMdAddCircleOutline color='blue' size={30} />
                </div>
            </div>

            <div className="PICInput">
               {
                   isitemsRented?
                   <input type="number" value={itemsRented} onChange={(e)=> setitemsRented(e.target.value)} />
                   :
                   <div className="PICsDetails">
                     {itemsRented + " Items Rented"}
                   </div>
               }
            </div>
        </div>
    )
}

export default RentedItems
