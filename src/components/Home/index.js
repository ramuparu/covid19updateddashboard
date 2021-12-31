import {Component} from 'react'

import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingDesc, FcGenericSortingAsc} from 'react-icons/fc'

import StatesData from '../StatesData/index'

import Footer from '../Footer'
import NotFound from '../NotFound'

import SearchStateResults from '../SearchStateResults/index'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638942497/Group_7362andaman_b4edxe.png',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638943186/Group_7354ap_uddgju.png',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638941120/Group_7340arunachal_czgqoh.png',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638941172/Group_7341assam_mjtxah.png',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638940604/Group_7335bihar_tzc2qf.png',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638942352/Group_7361chandigarh_bflc7t.png',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638941688/Group_7353chattisgarh_ji7sxt.png',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638942579/Group_7357daman_w7orsb.png',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638942803/Group_7358delhi_ppppzj.png',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638941254/Group_7349goa_lrrqj7.png',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638940737/Group_7337gujrat_e5owmt.png',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638940360/Group_7332haryana_prqwfx.png',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638877757/Group_7364himachal_e1h0ps.png',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638877646/Group_7328jammu_dhfdjr.png',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638940835/Group_7342jarkhand_movqha.png',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638941991/Group_7339karnataka_sbaj00.png',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638942069/Group_7355kerala_nvkijt.png',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638943063/Group_7363ladakh_upogsc.png',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638942659/Group_7359lakshadweep_g5jtqk.png',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638941836/Group_7350maharastra_ppa2qk.png',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638940667/Group_7336mp_n5ow4p.png',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638941477/Group_7346manipur_l4fcml.png',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638941347/Group_7344meghalaya_awtbh1.png',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638941545/Group_7347mizoram_wabwun.png',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638941414/Group_7345nagaland_vnjklu.png',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638941750/Group_7348orissa_sbnbxd.png',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638942740/Group_7360puducherry_kiaorv.png',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638877926/Group_7330punjab_koyhma.png',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638940440/Group_7333rajastan_evbcps.png',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638941014/Group_7338sikkim_zciwew.png',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638942166/Group_7356tamilanadu_rwh3kv.png',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638941903/Group_7351telangana_tgg3xt.png',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638941612/Group_7352tripura_jhmfpz.png',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638940526/Group_7334up_y1qewk.png',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638940270/Group_7331uttarakand_hdxxmu.png',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638940920/Group_7343wb_zfmknh.png',
  },
  {
    state_code: 'TT',
    state_name: 'West Bengal',
    state_image_url:
      'https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638940920/Group_7343wb_zfmknh.png',
  },
]

export const changeStateKeysData = statesList.map(eachState => ({
  stateCode: eachState.state_code,
  stateName: eachState.state_name,
  stateImageUrl: eachState.state_image_url,
}))

const apiStatusKeys = {
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {
    stateValue: '',
    totalStatusList: [],
    apiStatus: apiStatusKeys.initial,
  }

  componentDidMount() {
    this.searchStateWiseCovidCasesApiCall()
  }

  /* USER SEARCH STATS BASED ON STATES */

  whenUserSearchState = event => {
    this.setState({stateValue: event.target.value})
  }

  whenUserPressAscBtn = () => {
    const {totalStatusList} = this.state
    if (totalStatusList[0].stateCode === 'AN') {
      this.setState({totalStatusList})
    } else {
      this.setState({totalStatusList: totalStatusList.reverse()})
    }
  }

  whenUserPressDesBtn = () => {
    const {totalStatusList} = this.state
    if (totalStatusList[0].stateCode !== 'AN') {
      this.setState({totalStatusList})
    } else {
      this.setState({totalStatusList: totalStatusList.reverse()})
    }
  }

  /* COVID STATS API DATA CALL */

  searchStateWiseCovidCasesApiCall = async () => {
    this.setState({apiStatus: apiStatusKeys.inprogress})
    const response = await fetch('https://apis.ccbp.in/covid19-state-wise-data')

    if (response.ok === true) {
      const data = await response.json()
      this.convertObjectsDataIntoListItemsUsingForInMethod(data)
      this.setState({
        apiStatus: apiStatusKeys.success,
      })
    } else {
      this.setState({apiStatus: apiStatusKeys.failure})
    }
  }

  convertObjectsDataIntoListItemsUsingForInMethod = data => {
    const resultList = []
    const keyNames = Object.keys(data)
    keyNames.forEach(keyName => {
      if (data[keyName]) {
        const {total} = data[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0
        const stateFullName = statesList.find(
          states => states.state_code === keyName,
        )

        resultList.push({
          stateCode: keyName,
          stateName: stateFullName.state_name,
          confirmed,
          deceased,
          recovered,
          population,
          tested,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    this.setState({totalStatusList: resultList})
  }

  renderFailureView = () => <NotFound />

  renderHomeCovidPage = () => {
    const {stateValue, totalStatusList} = this.state

    const stateWiseCovidSortOptionBased = totalStatusList

    const searchSelectCon = changeStateKeysData.filter(eachList =>
      eachList.stateName.toUpperCase().includes(stateValue.toUpperCase()),
    )

    console.log(stateValue)
    let confirmedStatsAllIndia = 0
    let activeStatusInIndia = 0
    let recoveredStatusInIndia = 0
    let deceasedStatusInIndia = 0

    if (totalStatusList.length >= 1) {
      /* TO SUM THE TOTAL CONFIRMED CASES */
      const confirmedStatsArray = totalStatusList.map(
        everyDetail => everyDetail.confirmed,
      )
      confirmedStatsAllIndia = confirmedStatsArray.reduce(
        (each, currentValue) => each + currentValue,
      )
      /* TO SUM THE TOTAL ACTIVE CASES */
      const activeStatsArray = totalStatusList.map(
        everyDetail => everyDetail.active,
      )
      activeStatusInIndia = activeStatsArray.reduce(
        (each, currentValue) => each + currentValue,
      )
      /* TO SUM THE TOTAL RECOVERED CASES */

      const recoverStatsArray = totalStatusList.map(
        everyDetail => everyDetail.recovered,
      )
      recoveredStatusInIndia = recoverStatsArray.reduce(
        (each, currentValue) => each + currentValue,
      )
      /* TO SUM THE TOTAL DECEASED CASES */

      const deceaseStatsArray = totalStatusList.map(
        everyDetail => everyDetail.deceased,
      )
      deceasedStatusInIndia = deceaseStatsArray.reduce(
        (each, currentValue) => each + currentValue,
      )
      /* TO SUM THE TOTAL POPULATION */
    }

    return (
      <>
        <div className="covid_home_route_page">
          <div className="state_searching_con">
            <div className="state_search_card">
              <BsSearch className="search_icon_style" />
              <input
                value={stateValue}
                type="search"
                options={statesList}
                onChange={this.whenUserSearchState}
                placeholder="Enter the State"
                className="search_input_style"
              />
            </div>

            {stateValue.length >= 1 ? (
              <ul
                className="state_unlist_con"
                testId="searchResultsUnorderedList"
              >
                {searchSelectCon.map(eachSearch => (
                  <SearchStateResults
                    key={eachSearch.stateCode}
                    eachSearch={eachSearch}
                  />
                ))}
              </ul>
            ) : (
              ''
            )}
          </div>
          <div className="confirmed_active_bar_con">
            <div className="countrywide_covid_home_stats_con">
              <div
                className="confirmed_card"
                testId="countryWideConfirmedCases"
              >
                <p className="confirmed_para">Confirmed</p>
                <img
                  src="https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638163795/Groupconfirmed_r0ng1r.png"
                  alt="country wide confirmed cases pic"
                  className="confirmed_image"
                />
                <p className="confirmed_cases_para">{confirmedStatsAllIndia}</p>
              </div>
              <div className="active_card" testId="countryWideActiveCases">
                <p className="active_para">Active</p>
                <img
                  src="https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638163837/protection_1active_lz4jqs.png"
                  alt="country wide active cases pic"
                  className="active_image"
                />
                <p className="active_cases_para">{activeStatusInIndia}</p>
              </div>

              <div
                className="recovered_card"
                testId="countryWideRecoveredCases"
              >
                <p className="recover_para">Recovered</p>
                <img
                  src="https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638163886/recovered_1recovered_rslph4.png"
                  alt="country wide recovered cases pic"
                  className="recover_image"
                />
                <p className="recover_cases_para">{recoveredStatusInIndia}</p>
              </div>

              <div className="deceased_card" testId="countryWideDeceasedCases">
                <p className="decease_para">Deceased</p>
                <img
                  src="https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638163603/breathing_1deceased_i1q80r.png"
                  alt="country wide deceased cases pic"
                  className="decease_image"
                />
                <p className="decease_cases_para">{deceasedStatusInIndia}</p>
              </div>
            </div>
          </div>
          <div
            className="state_covid_information_con"
            testId="stateWiseCovidDataTable"
          >
            <div className="stateWiseTableColumns_con">
              <div className="stateWise_table_cols_list">
                <h1 className="stateWise_col_state_head">States/UT</h1>
                <div className="stateWise_col_icons_card">
                  <button
                    type="button"
                    testid="ascendingSort"
                    className="ascending_btn_style"
                    onClick={this.whenUserPressAscBtn}
                  >
                    <FcGenericSortingAsc className="icon_style" />
                  </button>
                  <button
                    type="button"
                    testid="descendingSort"
                    className="descending_btn_style"
                    onClick={this.whenUserPressDesBtn}
                  >
                    <FcGenericSortingDesc className="icon_style" />
                  </button>
                </div>
                <p className="stateWise_col_confirmed_head">Confirmed</p>
                <p className="stateWise_col_active_head">Active</p>
                <p className="stateWise_col_recovered_head">Recovered</p>
                <p className="stateWise_col_deceased_head">Deceased</p>
                <p className="stateWise_col_population_head">Population</p>
              </div>
            </div>
            <hr className="horizontal_line_style" />
            <ul className="stateWise_row_con">
              {stateWiseCovidSortOptionBased.map(eachState => (
                <StatesData key={eachState.stateCode} eachState={eachState} />
              ))}
            </ul>
          </div>
        </div>

        <Footer />
      </>
    )
  }

  renderLoaderView = () => (
    <div className="covid-loader-container" testId="homeRouteLoader">
      <Loader type="Tailspin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusKeys.inprogress:
        return this.renderLoaderView()
      case apiStatusKeys.success:
        return this.renderHomeCovidPage()
      case apiStatusKeys.failure:
        return this.renderFailureCase()
      default:
        return null
    }
  }
}

export default Home
