import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";
import beef from '../../img/menu/beef.jpg'
import soup from '../../img/menu/soup.jpg'
import pasta from '../../img/menu/pasta1.jpg'
import appetizers from '../../img/menu/appetizers.jpg'
import sides from '../../img/menu/sides.jpg'
import lunch from '../../img/menu/lunch.jpg'
function Soup(){
    const navigate = useNavigate()
    const SoupMenu = [
{
    image:<img src={beef} alt='' className="sub_item_image"/>,
    title:'Fries & Sausage,Egg',
    price:'₦500.00'
},
{
    image:<img src={soup} alt='' className="sub_item_image"/>,
    title:'Potato Wedges & Sauce',
    price:'₦1300.00'
},{
    image:<img src={pasta} alt='' className="sub_item_image"/>,
    title:'Golden Yam',
    price:'₦600.00'
},{
    image:<img src={appetizers} alt='' className="sub_item_image"/>,
    title:'Fried Yam',
    price:'₦500.00'
},{
    image:<img src={sides} alt='' className="sub_item_image"/>,
    title:'Indomie, Sausage, Egg',
    price:'₦500.00'
},{
    image:<img src={lunch} alt='' className="sub_item_image"/>,
    title:'Indomie, Sausage, Egg & Sardine',
    price:'₦700.00'
},

    ]
    return(
        <>

          <Card className="card__ p-3 mt-3">

      
        <span style={{fontSize:15, cursor:'pointer', color:'red'}} onClick={()=>navigate(-1)}>/Go Back</span>
    <h1 className="about_title">Soup</h1>
    <Row>
        {SoupMenu.map((item)=>(

            <Col md={3}>
                <Card className="p-2 submenu_card mb-3 shadow-sm">

                {item.image}
                <p className="item_title m-0">
                    {/* {if(item.title.length>16){
                      item.title.substring(0,16)...  
                    }else{
                        item.title
                    }} */}
{item.title.length>23?`${item.title.substring(0,23)}...`:item.title}

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
export default Soup