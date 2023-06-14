import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";
import Mandirice from '../../img/new_menu/Mandi Rice.PNG'
import Friedrice from '../../img/new_menu/Fried Rice.JFIF'
import Jallofrice from '../../img/new_menu/Jollof Rice.JFIF'
import Whiterice from  '../../img/new_menu/White Rice.JFIF'

import { MyButton } from "../../MyButton";


function Lunch(){
    const navigate = useNavigate()
    const lunchmenus = [
        {
            image: <img src={Mandirice} alt='' className="sub_item_image"/>,
            title: 'Mandi Rice',
            price: '₦2500.00'
        },
        {
            image: <img src={Friedrice} alt='' className="sub_item_image"/>,
            title: 'Fried Rice',
            price: '₦2500.00'
        },

        {
            image: <img src={Whiterice} alt='' className="sub_item_image"/>,
            title: 'White Rice',
            price: '₦2000.00'
        },

        {
            image: <img src={Jallofrice} alt='' className="sub_item_image"/>,
            title: 'Jollof Rice',
            price: '₦2000.00'
        },

    ]
    return(
        <>
        {/* <MyButton style={{backgroundColor:'green', borderRadius:10}} btn_text={'DONTclick me'}/> */}
            <Card className="card__ p-3 mt-3">
                <span style={{fontSize:15, cursor:'pointer', color:'red'}} onClick={()=>navigate(-1)}>
                    /Go Back
                </span>
                <h1 className="about_title">Lunch</h1>
                <Row>
                    {lunchmenus.map((item) => (
                        <Col md={3}>
                            <Card className="p-2 submenu_card mb-3 shadow-sm">
                                {item.image}
                                <p className="item_title m-0">{item.title}</p>
                                <p className="item_price">{item.price}</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Card>
        </>
    )
}

export default Lunch
