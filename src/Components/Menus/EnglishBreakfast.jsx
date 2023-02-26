import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";
import Ebreakfast1 from '../../img/menu/EbToast.jpg'
import Ebreakfast2 from '../../img/menu/Ebeans.jpg'

function EnglishBreakfast(){
    const navigate = useNavigate()
    const Englishbreakfastmenus = [
{
    image:<img src={Ebreakfast1} alt='' className="sub_item_image"/>,
    title:'Toast, Pancake, Sausage',
    price:'₦500.00'
},
{
    image:<img src={Ebreakfast2} alt='' className="sub_item_image"/>,
    title:'Baked Beans & Egg ',
    price:'₦1000.00'
}

    ]
    return(
        <>

          <Card className="card__ p-3 mt-3">

      
        <span style={{fontSize:15, cursor:'pointer', color:'red'}} onClick={()=>navigate(-1)}>/Go Back</span>
    <h1 className="about_title">Breakfast</h1>
    <Row>
        {breakfastmenus.map((item)=>(

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
export default EnglishBreakfast