import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";
import bc from '../../img/new_menu/Bop Chicken Grill Full.JPG'
import st from '../../img/new_menu/Shish Tawook 4sticks.JFIF'
import cs from '../../img/new_menu/Chicken Skewers served.JFIF'
function Beef(){
    const navigate = useNavigate()
    const Beefmenus = [
{
    image:<img src={bc} alt='' className="sub_item_image"/>,
    title:'Bop Chicken Grill Full',
    price:'₦4500.00'
},
{
    image:<img src={st} alt='' className="sub_item_image"/>,
    title:'Shish Tawook 4sticks Chicken Skewers served',
    price:'₦2500.00'
},{
    image:<img src={cs} alt='' className="sub_item_image"/>,
    title:'Chicken Skewers served with Fries & Humms, Bread',
    price:'₦600.00'
},
    ]
    return(
        <>

          <Card className="card__ p-3 mt-3">

      
        <span style={{fontSize:15, cursor:'pointer', color:'red'}} onClick={()=>navigate(-1)}>/Go Back</span>
    <h1 className="about_title">Beef</h1>
    <Row>
        {Beefmenus.map((item)=>(

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
export default Beef