import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";
import beef from '../../img/menu/beef.jpg'
import p_wedges from '../../img/menu/PotatoWedges.jpg'
import golden_y from '../../img/menu/pasta1.jpg'
import fried_y from '../../img/menu/friedyam.jpg'
import indomie from '../../img/menu/Indomie_Sausage.jpg'
import indomie_s from '../../img/menu/IndomieSardine.jpg'
function Breakfast(){
    const navigate = useNavigate()
    const breakfastmenus = [
{
    image:<img src={beef} alt='' className="sub_item_image"/>,
    title:'Fries & Sausage,Egg',
    price:'₦500.00'
},
{
    image:<img src={p_wedges} alt='' className="sub_item_image"/>,
    title:'Potato Wedges & Sauce',
    price:'₦1300.00'
},{
    image:<img src={golden_y} alt='' className="sub_item_image"/>,
    title:'Golden Yam',
    price:'₦600.00'
},{
    image:<img src={fried_y} alt='' className="sub_item_image"/>,
    title:'Fried Yam',
    price:'₦500.00'
},{
    image:<img src={indomie} alt='' className="sub_item_image"/>,
    title:'Indomie, Sausage, Egg',
    price:'₦500.00'
},{
    image:<img src={indomie_s} alt='' className="sub_item_image"/>,
    title:'Indomie, Sausage, Egg & Sardine',
    price:'₦700.00'
},

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
export default Breakfast