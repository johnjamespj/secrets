import React from "react"
import { Navigate } from "react-router-dom"

export const routes = [
    {
        path: '/secret',
        children: [
            {
                path: '/make',
            },
            {
                path: '/',
                element: <Navigate to="/make" />
            },
            {
                path: '/:id',
            },
        ]
    }
]