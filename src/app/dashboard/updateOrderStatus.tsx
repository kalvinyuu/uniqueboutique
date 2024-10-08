'use client'

import { useState, useEffect } from 'react';
import { updateOrderStatus, orderStatus } from "@/app/actions";
import { OrderStat } from "@/app/types";

export function UpdateOrderStat({ ID }: { ID: number }) {
    const [status, setStatus] = useState<"Received." | "Shipped.">('Received.');

    
    function handleClick() {
        if (status === "Received.") {
             updateOrderStatus(ID);
            setStatus("Shipped.");
        } else {
            updateOrderStatus(ID);
            setStatus("Received.");
        }
    }

    return (
        <>
            <button onClick={handleClick}>
                Change to {status === "Received." ? 'Shipped' : 'Received'}
            </button>
            <h1>
                {status === "Received." ? "Received" : "Shipped"}
            </h1>
        </>
    );
}

export function UpdateShippedOrderStat({ ID }: { ID: number }) {
    const [status, setStatus] = useState<"Received." | "Shipped.">('Shipped.');

    
    function handleClick() {
        if (status === "Received.") {
             updateOrderStatus(ID);
            setStatus("Shipped.");
        } else {
            updateOrderStatus(ID);
            setStatus("Received.");
        }
    }

    return (
        <>
            <button onClick={handleClick}>
                Change to {status === "Received." ? 'Shipped' : 'Received'}
            </button>
            <h1>
                {status === "Received." ? "Received" : "Shipped"}
            </h1>
        </>
    );
}
