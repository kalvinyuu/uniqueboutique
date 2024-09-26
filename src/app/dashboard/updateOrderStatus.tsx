import { useState } from 'react'
import { updateOrderStatus } from "@/app/actions"
import { OrderStat } from "@/app/types"

export default function UpdateOrderStat({ID}: {ID: number}) {
    const [status, setStatus] = useState(true);
    const updateStat = updateOrderStatus(ID)
    
    function handleClick() {
	setStatus(!status)
	updateStat
    }

    return (
	<>
	    <button onClick={handleClick}>
		Change to {status ? 'Recieved' : 'Shipped'}
	    </button>
	    <h1>
		{status ? OrderStat.Recieved : OrderStat.Shipped}
	    </h1>
	</>
    )
}
