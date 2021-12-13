import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="pageNotFound_page">
    <img
      src="https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638334657/Group_7484pagenotfound_n9aal4.png"
      alt="not-found-pic"
      className="notFound_img"
    />
    <h1 className="page_head">PAGE NOT FOUND</h1>
    <p className="sorry_para">
      we are sorry, the page you requested could not be found
    </p>
    <Link to="/" className="home_link_style">
      <button className="home_btn_style" type="button">
        Home
      </button>
    </Link>
  </div>
)

export default NotFound
