import {Component} from 'react'

import {AiFillHome} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import {Pie} from 'react-chartjs-2'
import Footer from '../Footer'

import NotFound from '../NotFound'

import './index.css'

const apiStatusKeys = {
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class Vaccination extends Component {
  state = {
    apiStatus: apiStatusKeys.initial,
    stateNamesList: [],
    selectedState: null,
    districtNamesList: [],
    selectedDistrict: null,
    vaccinationDetailsList: [],
  }

  componentDidMount() {
    this.getVaccinationStateWiseNamesApiCall()
    this.getVaccinationDistrictWiseNamesApiCall()
    this.getVaccinationAllDetailsApiCall()
  }

  whenUserSelectState = event => {
    this.setState(
      {selectedState: event.target.value},
      this.getVaccinationDistrictWiseNamesApiCall,
    )
  }

  whenUserSelectDistrict = event => {
    this.setState({selectedDistrict: event.target.value})
  }

  getVaccinationStateWiseNamesApiCall = async () => {
    this.setState({apiStatus: apiStatusKeys.inprogress})
    const response = await fetch('https://apis.ccbp.in/covid19-state-ids')

    if (response.ok) {
      const data = await response.json()
      const stateNamesKeysChange = data.states.map(eachState => ({
        stateId: eachState.state_id,
        stateName: eachState.state_name,
      }))

      this.setState({
        apiStatus: apiStatusKeys.success,
        stateNamesList: stateNamesKeysChange,
      })
    } else {
      this.setState({apiStatus: apiStatusKeys.failure})
    }
  }

  getVaccinationDistrictWiseNamesApiCall = async () => {
    const {selectedState} = this.state

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

  getVaccinationAllDetailsApiCall = async () => {
    this.setState({apiStatus: apiStatusKeys.inprogress})
    const response = await fetch(
      'https://apis.ccbp.in/covid19-vaccination-data',
    )

    if (response.ok) {
      const data = await response.json()

      const vaccinationKeysInfo = data.topBlock.sites
      const vaccinationTotalDoses = {
        dose1: data.topBlock.vaccination.tot_dose_1,
        dose2: data.topBlock.vaccination.tot_dose_2,
        totalDoses: data.topBlock.vaccination.total_doses,
        covaxin: data.topBlock.vaccination.covaxin,
        covishield: data.topBlock.vaccination.covishield,
        sputnik: data.topBlock.vaccination.sputnik,
        male: data.topBlock.vaccination.male,
        female: data.topBlock.vaccination.female,
        others: data.topBlock.vaccination.others,
      }
      const vaccinationDoneByAge = {
        above60: data.vaccinationByAge.above_60,
        vaccinationAgeTotal: data.vaccinationByAge.total,
        vac18: data.vaccinationByAge.vac_18_45,
        vac45: data.vaccinationByAge.vac_45_60,
      }

      const vaccinationDoneByTime = data.vaccinationDoneByTime.map(
        eachTime => ({
          count: eachTime.count,
          timeDose1: eachTime.dose_one,
          timeDose2: eachTime.dose_two,
          label: eachTime.label,
          timeStamps: eachTime.timestamps,
          ts: eachTime.ts,
        }),
      )

      this.setState(prevState => ({
        apiStatus: apiStatusKeys.success,
        vaccinationDetailsList: [
          ...prevState.vaccinationDetailsList,
          vaccinationKeysInfo,
          vaccinationTotalDoses,
          vaccinationDoneByAge,
          vaccinationDoneByTime,
        ],
      }))
    } else {
      this.setState({apiStatus: apiStatusKeys.failure})
    }
  }

  renderVaccinationFailureView = () => <NotFound />

  renderVaccinationLoaderView = () => (
    <div className="covid-loader-container" testId="vaccinationDetailsLoader">
      <Loader type="Tailspin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderVaccinationDetails = () => {
    const {
      stateNamesList,
      selectedState,
      districtNamesList,
      selectedDistrict,
      vaccinationDetailsList,
    } = this.state
    console.log(vaccinationDetailsList)
    const vaccinationSitesDetailsNotEmpty =
      vaccinationDetailsList.length === 0
        ? vaccinationDetailsList
        : vaccinationDetailsList[0]
    const vaccinationDosesDetailsNotEmpty =
      vaccinationDetailsList.length === 0
        ? vaccinationDetailsList
        : vaccinationDetailsList[1]
    const vaccinationDosesAsPerAge =
      vaccinationDetailsList.length === 0
        ? vaccinationDetailsList
        : vaccinationDetailsList[2]
    const {total, govt, pvt} = vaccinationSitesDetailsNotEmpty
    const {dose1, dose2, totalDoses} = vaccinationDosesDetailsNotEmpty
    const {vac18, vac45, above60} = vaccinationDosesAsPerAge
    const vaccinationDosesPieData = {
      labels: ['18-44', '45-60', 'above 60'],
      datasets: [
        {
          data: [vac18, vac45, above60],
          backgroundColor: ['red', 'yellow', 'orange'],
        },
      ],
    }

    const stateHead =
      selectedState === null ? 'Andaman and Nicobar Islands' : selectedState

    return (
      <>
        <div className="vaccination_page">
          <div className="vaccination_state_name_head_card">
            <AiFillHome className="home_icon_style" />
            <p className="state_head_style">{`India/${stateHead}`}</p>
          </div>
          <div className="state_districts_dropdown_con">
            <select
              className="state_names_select_card"
              onChange={this.whenUserSelectState}
              value={selectedState}
            >
              <option
                hidden
                value="Select State"
                className="state_option_style"
              >
                Select State
              </option>
              {stateNamesList.map(eachState => (
                <option value={eachState.stateId} key={eachState.stateId}>
                  {eachState.stateName}
                </option>
              ))}
            </select>
            <select
              className="district_names_select_card"
              onChange={this.whenUserSelectDistrict}
              value={selectedDistrict}
            >
              <option
                hidden
                value="Select District"
                className="state_option_style"
              >
                Select District
              </option>
              {districtNamesList.map(eachDistrict => (
                <option
                  value={eachDistrict.districtName}
                  key={eachDistrict.districtId}
                >
                  {eachDistrict.districtName}
                </option>
              ))}
            </select>
          </div>
          <div className="vaccination_sites_doses_con">
            <div className="vaccination_sites_card">
              <img
                src="https://res.cloudinary.com/dkz4qzdsw/image/upload/v1639204644/Group_7476vaccinesym_pqy2st.png"
                className="vaccination_img"
                alt="vaccinationSiteSearch"
              />
              <div className="sites_stats_card">
                <div className="site_conducting_card">
                  <p className="site_conducting_style">
                    Site Conducting Vaccination
                  </p>
                  <p className="site_conducting_stats_style">{total}</p>
                </div>
                <div className="government_private_sites_card">
                  <div className="site_government_card">
                    <p className="site_government_style">Government</p>
                    <p className="site_government_stats_style">{govt}</p>
                  </div>
                  <div className="site_pvt_card">
                    <p className="site_pvt_style">Private</p>
                    <p className="site_pvt_stats_style">{pvt}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="vaccination_doses_card">
              <img
                src="https://res.cloudinary.com/dkz4qzdsw/image/upload/v1639207416/Group_7482admin_pa02dc.png"
                className="admin_img"
                alt="vaccinationAdmin"
              />
              <div className="doses_stats_card">
                <div className="total_doses_card">
                  <p className="total_doses_style">Total Vaccination Doses</p>
                  <p className="total_doses_stats_style">{totalDoses}</p>
                </div>
                <div className="dose1_dose2_card">
                  <div className="dose1_card">
                    <p className="dose1_style">Dose 1</p>
                    <p className="dose1_stats_style">{dose1}</p>
                  </div>
                  <div className="dose2_card">
                    <p className="dose2_style">Dose 2</p>
                    <p className="dose2_stats_style">{dose2}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Pie data={vaccinationDosesPieData}> </Pie>
        </div>

        <Footer />
      </>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusKeys.inprogress:
        return this.renderVaccinationLoaderView()
      case apiStatusKeys.failure:
        return this.renderVaccinationFailureView()
      case apiStatusKeys.success:
        return this.renderVaccinationDetails()
      default:
        return null
    }
  }
}

export default Vaccination
