import React from "react"
import { Navigate } from "react-router-dom"
import { Chat } from "./channels/Chat"
import { HomeView } from "./home/HomeView"
import { Receiver } from "./secret/receive/Receiver"
import { ShowMessage } from "./secret/receive/ShowMessage"
import { Sender } from "./secret/send/Sender"
import { ShowRecipt } from "./secret/send/ShowRecipt"

export const routes = [
    {
        path: '/',
        element: <HomeView />
    },
    {
        path: "/chat",
        children: [
            {
                path: '/',
                element: <Chat />,
            },
            {
                path: '/:id',
                element: <Chat />,
            }
        ]
    },
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