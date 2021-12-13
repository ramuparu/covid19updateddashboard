import {Link} from 'react-router-dom'

import {BiChevronRightSquare} from 'react-icons/bi'

import './index.css'

const SearchStateResults = props => {
  const {eachSearch} = props
  const {stateCode, stateName} = eachSearch
  return (
    <Link to={`/state/${stateCode}`} className="covid_state_table_link_style">
      <li className="states_list_card">
        <p className="state_name_para_style">{stateName}</p>
        <div className="stateCode_icon_card">
          <p className="state_code_para_style">{stateCode}</p>
          <BiChevronRightSquare className="right_square_icon_style" />
        </div>
      </li>
    </Link>
  )
}

export default SearchStateResults
