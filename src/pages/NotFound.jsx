import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="wrap notfound">
      <h1 className="h1">This page isn’t on the menu</h1>
      <p>The link may be old or mistyped. The food is still where it always was.</p>
      <div className="hero__ctas">
        <Link to="/" className="btn btn--dark">
          Go to the homepage
        </Link>
        <Link to="/menu" className="btn btn--line">
          See the menu
        </Link>
      </div>
    </section>
  )
}
