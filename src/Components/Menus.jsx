import React from 'react'
import { Card, Col, Row } from 'reactstrap'
import beef from '../img/menu/beef.jpg'
import soup from '../img/menu/soup.jpg'
import pasta from '../img/menu/pasta1.jpg'
import appetizers from '../img/menu/appetizers.jpg'
import sides from '../img/menu/sides.jpg'
import lunch from '../img/menu/lunch.jpg'
import englishbreakfast from '../img/menu/Baked Beans & Egg2.jpg'
import breakfast from '../img/menu/breakfast.jpg'
import { useNavigate } from 'react-router-dom'
export default function Menus() {
  const navigate = useNavigate()
  const menu = [
    {
      image: <img className="menu_img" src={breakfast} />,
      title: 'Breakfast',
      link: '/menus/breakfast',
    },
    {
      image: <img className="menu_img" src={englishbreakfast} />,
      title: 'English Breakfast (Fresh)',
      link: '/menus/ebreakfast',
    },
    {
      image: <img className="menu_img" src={lunch} />,
      title: 'Lunch',
      link: '/menus/lunch',
    },
    {
      image: <img className="menu_img" src={pasta} />,
      title: 'Pasta Spaghetti',
      link: '/menus/pasta',
    },
    {
      image: <img className="menu_img" src={beef} />,
      title: 'Beef & Grills',
      link: '/menus/beef',
    },
    {
      image: <img className="menu_img" src={sides} />,
      title: 'Sides',
      link: '/menus/sides',
    },
    {
      image: <img className="menu_img" src={appetizers} />,
      title: 'Appetizers',
      link: '/menus/appetizers',
    },
    {
      image: <img className="menu_img" src={soup} />,
      title: 'Soup',
      link: '/menus/soup',
    },
  ]
  return (
    <>
      <Card className="card__ p-3 mt-3">
        <h1 className="about_title">Menu</h1>
        <Row>
          {menu.map((item) => (
            <Col md={3}>
              <Card
                className="menu_card p-2 shadow-sm mb-4"
                onClick={() => navigate(item.link)}
              >
                {item.image}
                <p className="menu_title">{item.title}</p>
              </Card>
            </Col>
          ))}
        </Row>
        <Row></Row>
      </Card>
    </>
  )
}
