import React from "react"
import { Navigate } from "react-router-dom"
import { Receiver } from "./secret/receive/Receiver"
import { ShowMessage } from "./secret/receive/ShowMessage"
import { Sender } from "./secret/send/Sender"
import { ShowRecipt } from "./secret/send/ShowRecipt"

export const routes = [
    {
        path: '/secret',
        children: [
            {
                path: '/make',
                element: <Sender />
            },
            {
                path: '/',
                element: <Navigate to="./make" />
            },
            {
                path: '/:id',
                element: <Receiver />
            },
            {
                path: '/make/recipt',
                element: <ShowRecipt />
            },
            {
                path: '/:id/message',
                element: <ShowMessage />
            },
        ]
    }
]