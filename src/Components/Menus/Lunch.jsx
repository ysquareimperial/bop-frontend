import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";
import Mandirice from '../../img/menu/Mandi Rice3.jpg'
import Friedrice from '../../img/menu/Fried Rice3.jpg'
import Jallofrice from '../../img/menu/Jallof Rice3.jpg'
import Brownrice from  '../../img/menu/Brown Rice.jpg'
import Whiterice from  '../../img/menu/White Rice.jpg'
import Orientalrice from '../../img/menu/Oriental Rice.jpg'
import Biryanirice from '../../img/menu/BiryaniCL.jpg'

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
            image: <img src={Jallofrice} alt='' className="sub_item_image"/>,
            title: 'Fried Rice',
            price: '₦2500.00'
        },

        {
            image: <img src={Brownrice} alt='' className="sub_item_image"/>,
            title: 'White Rice',
            price: '₦2500.00'
        },
        {
            image: <img src={Whiterice} alt='' className="sub_item_image"/>,
            title: 'White Rice',
            price: '₦2500.00'
        },
        {
            image: <img src={Orientalrice} alt='' className="sub_item_image"/>,
            title: 'White Rice',
            price: '₦2500.00'
        },
        {
            image: <img src={Biryanirice} alt='' className="sub_item_image"/>,
            title: 'White Rice',
            price: '₦2500.00'
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
