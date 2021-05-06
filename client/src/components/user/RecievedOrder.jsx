import React from 'react'

const RecievedOrder = ({ order }) => {
    return (
        <div>
            {
                order.total
            }
        </div>
    )
}
export default RecievedOrder;