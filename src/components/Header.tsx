import '../styles/Head.css'
import helpingHandIcon from '../assets/helpingHandIcon.png'

function Header() {

  return (
    <>
      <header>
        <div className="icon">
          <img src={helpingHandIcon} alt="Helping Hand Logo" width="40px"/>
        </div>
        <div className="title">
          <p>A Helping Hand</p>
        </div>
        
      </header>
    </>
  )
}

export default Header