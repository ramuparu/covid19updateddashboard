import {Component} from 'react'
import Loader from 'react-loader-spinner'
import NotFound from '../NotFound'

import './index.css'

const apiStatusKeys = {
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class DistrictsNames extends Component {
  state = {districtNamesList: [], apiStatus: apiStatusKeys.initial}

  componentDidMount() {
    this.getVaccinationDistrictWiseNamesApiCall()
  }

  getVaccinationDistrictWiseNamesApiCall = async () => {
    const {selectedState} = this.props
    const parsedState = parseInt(selectedState)
    this.setState({apiStatus: apiStatusKeys.inprogress})
    const response = await fetch(
      `https://apis.ccbp.in/covid19-districts-data/${parsedState}`,
    )

    if (response.ok) {
      const data = await response.json()
      const districtNamesKeysChange = data.districts.map(eachDistrict => ({
        districtId: eachDistrict.district_id,
        districtName: eachDistrict.district_name,
      }))
      this.setState({
        apiStatus: apiStatusKeys.success,
        districtNamesList: districtNamesKeysChange,
      })
    } else {
      this.setState({apiStatus: apiStatusKeys.failure})
    }
  }

  renderDistrictsFailureView = () => <NotFound />

  renderDistrictsLoaderView = () => (
    <div className="covid-loader-container" testId="districtDetailsLoader">
      <Loader type="Tailspin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderDistrictsSuccessView = () => {
    const {districtNamesList} = this.state

    return (
      <select
        className="district_names_select_card"
        placeholder="select District"
        onChange=""
      >
        {districtNamesList.map(eachDistrict => (
          <option
            value={eachDistrict.districtName}
            key={eachDistrict.districtId}
          >
            {eachDistrict.districtName}
          </option>
        ))}
      </select>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusKeys.inprogress:
        return this.renderDistrictsLoaderView()
      case apiStatusKeys.failure:
        return this.renderDistrictsFailureView()
      case apiStatusKeys.success:
        return this.renderDistrictsSuccessView()
      default:
        return null
    }
  }
}

export default DistrictsNames
