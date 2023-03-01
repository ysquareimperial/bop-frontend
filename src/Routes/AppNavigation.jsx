import React from "react";
import { useRoutes } from "react-router-dom";
import About from "../Components/About";
import BookHere from "../Components/BookHere";
// import Book from "../Components/BookHere";
import HomePage from "../Components/HomePage";
import Menus from "../Components/Menus";
import Breakfast from "../Components/Menus/Breakfast";
import EnglishBreakfast from "../Components/Menus/EnglishBreakfast";
import Lunch from "../Components/Menus/Lunch";
import Pasta from "../Components/Menus/Pasta";
import Sides from "../Components/Menus/Sides";
import Soup from "../Components/Menus/Soup";
import Beef from "../Components/Menus/Beef";
import Appetizers from "../Components/Menus/Appetizers";
import AppIndex from "./AppIndex";
export default function AppNavigation(){
    let element = useRoutes([
        {
            path:'/',
            element:<HomePage/>,
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
                path:'/menus/ebreakfast',
                element:<EnglishBreakfast/>
                
                },
                {
                path:'/menus/lunch',
                element:<Lunch/>
                                    },
                                    {
                path:'/menus/pasta',
                element:<Pasta/>},

           {
                path:'/menus/sides',
                element:<Sides/>},
            {
                path:'/menus/soup',
                element:<Soup/>
            },

            {
                path:'/menus/appetizers',
                element:<Appetizers/>
            },

            {
                path:'/menus/Beef',
                element:<Beef/>
            },


            ]
        }
    ])
    return element
}