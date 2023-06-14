import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Col, Row } from 'reactstrap'
// import beef from '../../img/menu/beef.jpg'
// import p_wedges from '../../img/menu/PotatoWedges.jpg'
// import golden_y from '../../img/menu/pasta1.jpg'
// import fried_y from '../../img/menu/friedyam.jpg'
// import indomie from '../../img/menu/Indomie_Sausage.jpg'
// import indomie_s from '../../img/menu/IndomieSardine.jpg'
import be from '../../img/new_menu/Boiled Eggs.JPG'
import fy from '../../img/new_menu/Fried Yam.JFIF'
import fS from '../../img/new_menu/Fries & Sausage, Egg.JFIF'
import gy from '../../img/new_menu/Golden Yam.JPG'
import is from '../../img/new_menu/Indomie, Sausage, Egg & Sardine.JFIF'
import ise from '../../img/new_menu/Indomie, Sausage, Egg.JFIF'
import pw from '../../img/new_menu/Potato Wedges & Sauce.JFIF'
function Breakfast() {
  const navigate = useNavigate()
  const breakfastmenus = [
    {
      image: <img src={fS} alt="" className="sub_item_image" />,
      title: 'Fries & Sausage,Egg',
      price: '₦500.00',
    },
    {
      image: <img src={pw} alt="" className="sub_item_image" />,
      title: 'Potato Wedges & Sauce',
      price: '₦1300.00',
    },
    {
      image: <img src={be} alt="" className="sub_item_image" />,
      title: 'Boiled Eggs',
      price: '₦600.00',
    },
    {
        image: <img src={gy} alt="" className="sub_item_image" />,
        title: 'Golden Yam',
        price: '₦600.00',
      },
    {
      image: <img src={fy} alt="" className="sub_item_image" />,
      title: 'Fried Yam',
      price: '₦500.00',
    },
    {
      image: <img src={ise} alt="" className="sub_item_image" />,
      title: 'Indomie, Sausage, Egg',
      price: '₦500.00',
    },
    {
      image: <img src={is} alt="" className="sub_item_image" />,
      title: 'Indomie, Sausage, Egg & Sardine',
      price: '₦700.00',
    },
  ]
  return (
    <>
      <Card className="card__ p-3 mt-3">
        <span
          style={{ fontSize: 15, cursor: 'pointer', color: 'red' }}
          onClick={() => navigate(-1)}
        >
          /Go Back
        </span>
        <h1 className="about_title">Breakfast</h1>
        <Row>
          {breakfastmenus.map((item) => (
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
export default Breakfast
