import './index.css'

const StatesData = props => {
  const {eachState} = props
  const {
    stateName,
    confirmed,
    active,
    recovered,
    deceased,
    population,
  } = eachState
  return (
    <li className="stateWise_row_list_card">
      <p className="stateWise_row_stateName_data">{stateName}</p>
      <p className="stateWise_row_confirmed_data">{confirmed}</p>
      <p className="stateWise_row_active_data">{active}</p>
      <p className="stateWise_row_recover_data">{recovered}</p>
      <p className="stateWise_row_deceased_data">{deceased}</p>
      <p className="stateWise_row_population_data">{population}</p>
    </li>
  )
}

export default StatesData
