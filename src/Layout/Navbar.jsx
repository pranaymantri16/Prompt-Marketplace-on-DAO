import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
    <div className="nav-left">
      <h1 className="brand">promato</h1>
      <div className="nav-links">
        <Link to="/about">About</Link>
        <Link to="/career">Career</Link>
        <Link to="#buy">Buy</Link>
        <Link to="#signin">Sign In</Link>
      </div>
    </div>
    <div className="nav-right">
      <div className="search-container">
        <input type="text" placeholder="Search prompts" className="search-bar" />
      </div>
      <button className="wallet-btn">Connect Wallet</button>
    </div>
  </nav>
  )
}

export default Navbar