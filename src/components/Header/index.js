import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiLightBulb, HiOutlineLightBulb} from 'react-icons/hi'
import {AiOutlineMenuFold, AiOutlineCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {navMenuBtn: false}

  userPressMenuButton = () => {
    this.setState({navMenuBtn: true})
  }

  userPressCloseIcon = () => {
    this.setState({navMenuBtn: false})
  }

  render() {
    const {navMenuBtn} = this.state

    return (
      <nav className="dark_nav_con">
        <div className="btn_covid_home_card">
          <Link to="/" className="nav_Link">
            <h1 className="dark_covid_head_style">COVID19INDIA</h1>
          </Link>

          <button
            className="menu_button_style"
            type="button"
            onClick={this.userPressMenuButton}
          >
            <AiOutlineMenuFold className="dark_menu_img_style" />
          </button>
        </div>

        {navMenuBtn ? (
          <div className="home_route_small_card">
            <ul className="home_route_list_card">
              <Link to="/" className="nav_Link">
                <li className="dark_home_route_list_style">Home</li>
              </Link>

              <Link to="/about" className="nav_Link">
                <li className="dark_about_route_list_style">About</li>
              </Link>
            </ul>
            <button
              type="button"
              onClick={this.userPressCloseIcon}
              className="close_icon_btn_style"
            >
              <AiOutlineCloseCircle className="dark_close_icon_style" />
            </button>
          </div>
        ) : (
          ''
        )}

        <ul className="list_items_card">
          <Link to="/" className="nav_Link">
            <li className="dark_home_route_list_style">Home</li>
          </Link>

          <Link to="/about" className="nav_Link">
            <li className="dark_about_route_list_style">About</li>
          </Link>
        </ul>
      </nav>
    )
  }
}

export default Header
