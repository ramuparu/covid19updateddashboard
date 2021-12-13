import {Component} from 'react'

import Loader from 'react-loader-spinner'
import {changeStateKeysData} from '../Home/index'
import TimeLineData from '../TimeLineData'
import CasesStatus from '../CasesStatus'
import NotFound from '../NotFound'
import Footer from '../Footer'
import './index.css'

const apiStatusKeys = {
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class SearchCovidCasesByIndividualStates extends Component {
  state = {
    deltaObj: {},
    delta21Obj: {},
    delta7: {},
    districtsObj: [],
    metaObj: {},
    totalCasesObj: {},
    apiStatus: apiStatusKeys.initial,
    stateName: '',
    activeStatus: 'confirmed',
    stateNameCode: '',
  }

  componentDidMount() {
    this.userSearchStateWiseData()
  }

  userSearchStateWiseData = async () => {
    this.setState({apiStatus: apiStatusKeys.inprogress})
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    stateCode.toUpperCase()

    const response = await fetch('https://apis.ccbp.in/covid19-state-wise-data')

    const data = await response.json()
    console.log(data)
    this.setState({stateNameCode: stateCode})

    if (response.ok) {
      const stateInformation = data[stateCode]

      this.convertDistrictsDataIntoListItemsUsingForInMethod(
        stateInformation.districts,
      )

      const deltaItems = stateInformation.delta
      const delta7Items = stateInformation.delta7
      const delta21Items = stateInformation.delta21_14
      const totalCasesItems = stateInformation.total

      const metaInfoItems = {
        date: stateInformation.meta.date,
        lastUpdated: stateInformation.meta.last_updated,
        population: stateInformation.meta.population,
        testedDate: stateInformation.meta.tested.date,
        testedSource: stateInformation.meta.tested.source,
        vaccinatedDate: stateInformation.meta.vaccinated,
      }

      const stateValue = changeStateKeysData.find(
        eachState => eachState.stateCode === stateCode,
      )
      const stateNameFinal = stateValue.stateName

      this.setState({
        apiStatus: apiStatusKeys.success,
        deltaObj: deltaItems,
        delta7: delta7Items,
        delta21Obj: delta21Items,
        metaObj: metaInfoItems,
        totalCasesObj: totalCasesItems,
        stateName: stateNameFinal,
      })
    } else {
      this.setState({apiStatus: apiStatusKeys.failure})
    }
  }

  convertDistrictsDataIntoListItemsUsingForInMethod = data => {
    const resultList = []
    const keyNames = Object.keys(data)
    keyNames.forEach(keyName => {
      if (data[keyName]) {
        const {total} = data[keyName]

        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0

        const districtName = keyName

        resultList.push({
          districtName,
          confirmed,
          deceased,
          recovered,

          tested,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    this.setState({districtsObj: resultList})
  }

  whenUserClickConfirmedCases = () => {
    this.setState({activeStatus: 'confirmed'})
  }

  renderConfirmedCases = () => {
    const {districtsObj} = this.state

    districtsObj.sort((a, b) => b.confirmed - a.confirmed)

    return (
      <ul className="districts_unlist_con">
        {districtsObj.map(eachDistrict => (
          <li className="districts_list_card" key={eachDistrict.districtName}>
            <p className="district_stats_style">{eachDistrict.confirmed}</p>
            <p className="district_name_style">{eachDistrict.districtName}</p>
          </li>
        ))}
      </ul>
    )
  }

  whenUserClickActiveCases = () => {
    this.setState({activeStatus: 'activeValue'})
  }

  renderActiveCases = () => {
    const {districtsObj} = this.state
    districtsObj.sort((a, b) => b.active - a.active)
    return (
      <ul className="districts_unlist_con">
        {districtsObj.map(eachDistrict => (
          <li className="districts_list_card" key={eachDistrict.districtName}>
            <p className="district_stats_style">{eachDistrict.active}</p>
            <p className="district_name_style">{eachDistrict.districtName}</p>
          </li>
        ))}
      </ul>
    )
  }

  whenUserClickRecoveredCases = () => {
    this.setState({activeStatus: 'recoveredValue'})
  }

  renderRecoveredCases = () => {
    const {districtsObj} = this.state
    districtsObj.sort((a, b) => b.recovered - a.recovered)
    return (
      <ul className="districts_unlist_con">
        {districtsObj.map(eachDistrict => (
          <li className="districts_list_card" key={eachDistrict.districtName}>
            <p className="district_stats_style">{eachDistrict.recovered}</p>
            <p className="district_name_style">{eachDistrict.districtName}</p>
          </li>
        ))}
      </ul>
    )
  }

  whenUserClickDeceasedCases = () => {
    this.setState({activeStatus: 'deceasedValue'})
  }

  renderDeceasedCases = () => {
    const {districtsObj} = this.state
    districtsObj.sort((a, b) => b.deceased - a.deceased)
    return (
      <ul className="districts_unlist_con">
        {districtsObj.map(eachDistrict => (
          <li className="districts_list_card" key={eachDistrict.districtName}>
            <p className="district_stats_style">{eachDistrict.deceased}</p>
            <p className="district_name_style">{eachDistrict.districtName}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderDistrictCasesOnSelectionBasis = () => {
    const {activeStatus} = this.state
    switch (activeStatus) {
      case 'confirmed':
        return this.renderConfirmedCases()
      case 'activeValue':
        return this.renderActiveCases()
      case 'recoveredValue':
        return this.renderRecoveredCases()
      case 'deceasedValue':
        return this.renderDeceasedCases()
      default:
        return null
    }
  }

  renderStatesCovidInformation = () => {
    const {
      deltaObj,
      delta7,
      delta21Obj,
      districtsObj,
      stateName,
      metaObj,
      totalCasesObj,
      activeStatus,
      stateNameCode,
    } = this.state
    console.log(activeStatus)

    const stateMap = changeStateKeysData.find(
      eachImage => eachImage.stateCode === stateNameCode,
    )
    const stateMapUrl = stateMap.stateImageUrl
    const {tested, confirmed, deceased, recovered} = totalCasesObj
    const activeStats = confirmed - (deceased + recovered)
    const {lastUpdated, population, testedDate} = metaObj

    const fullDate = new Date(testedDate)
    const testedLastDate = fullDate.getDate()
    const testedLastMonth = fullDate.getMonth()

    console.log(testedLastMonth)
    return (
      <>
        <div
          className="covidCases_individual_states_page"
          testId="lineChartsContainer"
        >
          <div className="covidTested_head_card">
            <h1 className="covid_state_name_head">{stateName}</h1>
            <ul className="covid_tested_card">
              <li className="covid_tested_para">Tested</li>
              <li className="covid_tested_stats_para">{tested}</li>
            </ul>
          </div>
          <p className="covid_last_update_para">{`Last update on ${lastUpdated}`}</p>
          <CasesStatus
            confirmedStats={confirmed}
            recoveredStats={recovered}
            deceasedStats={deceased}
            activeStats={activeStats}
            whenUserClickConfirmedCases={this.whenUserClickConfirmedCases}
            whenUserClickActiveCases={this.whenUserClickActiveCases}
            whenUserClickDeceasedCases={this.whenUserClickDeceasedCases}
            whenUserClickRecoveredCases={this.whenUserClickRecoveredCases}
            activeStatus={activeStatus}
          />

          <div className="map_image_container">
            <img
              src={stateMapUrl}
              className="map_image_style"
              alt="stateMapImage"
            />
            <div className="ncp_report_card">
              <div>
                <h1 className="ncp_report_head">NCP Report</h1>
                <div className="population_card">
                  <p className="population_label">Population</p>
                  <p className="population_value">{population}</p>
                </div>
              </div>
              <div className="tested_card">
                <p className="tested_label">Tested</p>
                <p className="tested_value">{tested}</p>
                <p className="tested_date">{`(As of ${testedLastDate} ${testedLastMonth} per source)`}</p>
              </div>
            </div>
          </div>

          <h1 className="districts_head_style">Top Districts</h1>

          {this.renderDistrictCasesOnSelectionBasis()}
          <TimeLineData stateNameCode={stateNameCode} />
        </div>
        <Footer />
      </>
    )
  }

  renderLoaderView = () => (
    <div className="covid-loader-container" testId="stateDetailsLoader">
      <Loader type="Tailspin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureCase = () => <NotFound />

  render() {
    const {apiStatus, timeLineData} = this.state
    console.log(timeLineData)

    switch (apiStatus) {
      case apiStatusKeys.inprogress:
        return this.renderLoaderView()
      case apiStatusKeys.success:
        return this.renderStatesCovidInformation()
      case apiStatusKeys.failure:
        return this.renderFailureCase()
      default:
        return null
    }
  }
}

export default SearchCovidCasesByIndividualStates
