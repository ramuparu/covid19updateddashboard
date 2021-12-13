import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiLightBulb, HiOutlineLightBulb} from 'react-icons/hi'
import {AiOutlineMenuFold, AiOutlineCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {navMenuBtn: false, themeButton: true}

  userPressMenuButton = () => {
    this.setState({navMenuBtn: true})
  }

  userPressCloseIcon = () => {
    this.setState({navMenuBtn: false})
  }

  userPressLightThemeIcon = () => {
    this.setState({themeButton: false})
  }

  userPressDarkThemeIcon = () => {
    this.setState({themeButton: true})
  }

  whenThemeActivatedFunction = () => {
    const {themeButton} = this.state

    return (
      <>
        {themeButton ? (
          <li className="nav_light_list_style">
            <button
              className="nav_light_icon_style"
              type="button"
              onClick={this.userPressLightThemeIcon}
            >
              <HiOutlineLightBulb className="light_icon_style" />
            </button>
          </li>
        ) : (
          <li className="nav_light_list_style">
            <button
              className="nav_light_icon_style"
              type="button"
              onClick={this.userPressDarkThemeIcon}
            >
              <HiLightBulb />
            </button>
          </li>
        )}
      </>
    )
  }

  render() {
    const {navMenuBtn, themeButton} = this.state

    const navThemeCssApply = themeButton ? 'dark_nav_con' : 'light_nav_con'
    const headCssApply = themeButton
      ? 'dark_covid_head_style'
      : 'light_covid_head_style'

    const homeRouteCssApply = themeButton
      ? 'dark_home_route_list_style'
      : 'light_home_route_list_style'

    const aboutRouteCssApply = themeButton
      ? 'dark_about_route_list_style'
      : 'light_about_route_list_style'

    const closeIconCssApply = themeButton
      ? 'dark_close_icon_style'
      : 'light_close_icon_style'

    const menuIconCssApply = themeButton
      ? 'dark_menu_img_style'
      : 'light_menu_img_style'

    const vaccinationRouteCssApply = themeButton
      ? 'dark_vaccine_route_list_style'
      : 'light_vaccine_route_list_style'

    return (
      <nav className={navThemeCssApply}>
        <div className="btn_covid_home_card">
          <Link to="/" className="nav_Link">
            <h1 className={headCssApply}>COVID19INDIA</h1>
          </Link>

          <button
            className="menu_button_style"
            type="button"
            onClick={this.userPressMenuButton}
          >
            <AiOutlineMenuFold className={menuIconCssApply} />
          </button>
        </div>

        {navMenuBtn ? (
          <div className="home_route_small_card">
            <ul className="home_route_list_card">
              <Link to="/" className="nav_Link">
                <li className={homeRouteCssApply}>Home</li>
              </Link>
              <Link to="/vaccination" className="nav_Link">
                <li className={vaccinationRouteCssApply}>Vaccination</li>
              </Link>
              <Link to="/about" className="nav_Link">
                <li className={aboutRouteCssApply}>About</li>
              </Link>

              {this.whenThemeActivatedFunction()}
            </ul>
            <button
              type="button"
              onClick={this.userPressCloseIcon}
              className="close_icon_btn_style"
            >
              <AiOutlineCloseCircle className={closeIconCssApply} />
            </button>
          </div>
        ) : (
          ''
        )}

        <ul className="list_items_card">
          <Link to="/" className="nav_Link">
            <li className={homeRouteCssApply}>Home</li>
          </Link>
          <Link to="/vaccination" className="nav_Link">
            <li className={vaccinationRouteCssApply}>Vaccination</li>
          </Link>
          <Link to="/about" className="nav_Link">
            <li className={aboutRouteCssApply}>About</li>
          </Link>
          {this.whenThemeActivatedFunction()}
        </ul>
      </nav>
    )
  }
}

export default Header
