import {FaTwitter} from 'react-icons/fa'

import {VscGithubAlt} from 'react-icons/vsc'

import {FiInstagram} from 'react-icons/fi'

import './index.css'

export default function Footer() {
  return (
    <div className="footer_page">
      <h1 className="footer_covid_head_style">COVID19INDIA</h1>
      <p className="footer_para_style">
        We stand with everyone fighting on the front lines
      </p>
      <div className="footer_icons_card">
        <VscGithubAlt className="github_icon_style" />
        <FiInstagram className="instagram_icon_style" />
        <FaTwitter className="twitter_icon_style" />
      </div>
    </div>
  )
}
