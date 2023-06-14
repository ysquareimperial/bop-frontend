import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";
import tps from '../../img/new_menu/Toast, Pancake, Sausage.JFIF'
import be from '../../img/new_menu/Baked Beans & Egg.JFIF'
import { MyButton } from "../../MyButton";
function EBreakfast(){
    const navigate = useNavigate()
    const Ebreakfastmenus = [
{
    image:<img src={tps} alt='' className="sub_item_image"/>,
    title:'Toast, Pancake, Sausage',
    price:'₦500.00'
},
{
    image:<img src={be} alt='' className="sub_item_image"/>,
    title:'Baked Beans & Egg',
    price:'₦1300.00'
}
    ]
    return(
        <>
        {/* <MyButton btn_text={'click me'}/>
        <MyButton btn_text={'click'}/>
        <MyButton btn_text={'click'}/>
        <MyButton btn_text={'click'}/> */}

          <Card className="card__ p-3 mt-3">

      
        <span style={{fontSize:15, cursor:'pointer', color:'red'}} onClick={()=>navigate(-1)}>/Go Back</span>
    <h1 className="about_title">English Breakfast</h1>
    <Row>
        {Ebreakfastmenus.map((item)=>(

            <Col md={3}>
                <Card className="p-2 submenu_card mb-3 shadow-sm">

                {item.image}
                <p className="item_title m-0">

{item.title}
                </p>
                <p className="item_price">

{item.price}
                </p>
                </Card>
        </Col>
            ))}
        </Row>
        </Card>
        </>
    )
}
export default EBreakfast