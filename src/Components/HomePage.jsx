import React from "react";
import grill from '../img/grill.jpg'
import salad from '../img/salad.jpg'
import head from '../img/head_chef.jpg'
import { Card, Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
export default function HomePage(){
    const navigate = useNavigate()
    const cards =[
        {
            title:'Our New Menu',
            image:<img src={grill} alt='home_img' className="card_image"/>,
            description:'Our menu consists of 12-15 seasonal items based on Italian, Greek, and Turkish culture.',
            link:'See our menu',
            routeto:'/menus'
        },
        {
            title:'Book a Table',
            image:<img src={salad} alt='home_img' className="card_image"/>,
            description:'Reserve your table for an Italian, Greek, and Turkish dining experience.',
            link:'Book your table now',
            routeto:'/book'
        },{
            title:'Opening Hours',
            image:<img src={head} alt='home_img' className="card_image"/>,
            description:'The Bites of Paradise Restaurant is open 7 days a week, including public holidays.',
          hour1:'Mon - Fri: 8am - 10pm',
          hour2:'Sat: 8am - 11pm',
          hour3:'Sun: 8am - 10pm'
        },

    ]
    return(
        <>
<section>
    <article id="hero">
      <h1 class="heading_shadow">SPECIAL OFFER</h1>
      <p>
        30% Off This Weekend 
      </p>
      <a href="#" class="cta" onClick={()=>navigate('/book')}> Book now </a>
    </article>
  </section>

  <div className="mt-4">
    <Row>
        {cards.map((item)=>(

            <Col md={4}>
<Card className="home_card shadow-sm p-3 mb-2">
<h2 className="card_title">{item.title}</h2>
{item.image}
<p className="mt-3">{item.description}</p>
<p className="link" onClick={()=>navigate(item.routeto)}>{item.link}</p>
<p>{item.hour1}</p>
<p>{item.hour2}</p>
<p>{item.hour3}</p>
</Card>
        </Col>
            ))}
    </Row>
  </div>
        </>
    )
}