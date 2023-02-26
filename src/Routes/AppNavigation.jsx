import React from "react";
import { useRoutes } from "react-router-dom";
import About from "../Components/About";
import BookHere from "../Components/BookHere";
import Book from "../Components/BookHere";
import HomePage from "../Components/HomePage";
import Menus from "../Components/Menus";
import Breakfast from "../Components/Menus/Breakfast";
import EnglishBreakfast from "../Components/Menus/EnglishBreakfast";
import AppIndex from "./AppIndex";
export default function AppNavigation(){
    let element = useRoutes([
        {
            path:'/',
            element:<AppIndex/>,
            children:[{index:true}]
        },
        {
            element:<AppIndex/>,
            children:[
                {
                    path:'/home',
                    element:<HomePage/>
            },
                {
                    path:'/menus',
                    element:<Menus/>
                },
                {
                    path:'/about',
                    element:<About/>
                },
                {
                    path:'/book',
                    element:<BookHere/>
                },
                {
                    path:"/menus/breakfast",
                    element:<Breakfast/>
                },
                {
path:'/menus/englishbreakfast',
element:<EnglishBreakfast/>
                },
            ]
        }
    ])
    return element
}