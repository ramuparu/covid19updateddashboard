import {Component} from 'react'

import {AiFillHome} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
} from 'recharts'
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
    activeValue: true,
  }

  componentDidMount() {
    this.getVaccinationStateWiseNamesApiCall()
    this.getVaccinationDistrictWiseNamesApiCall()
    this.getVaccinationAllDetailsApiCall()
  }

  userSearchBasedDoses = () => {
    this.setState({activeValue: true})
  }

  userSearchBasedAge = () => {
    this.setState({activeValue: false})
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

      const vaccinationDosesAsPerAgeBasedObj = data.timeWiseTodayRegReport.map(
        eachDose => ({
          age18: eachDose.age18,
          age45: eachDose.age45,
          age60: eachDose.age60,
          label: eachDose.label.substring(6),
          total: eachDose.total,
        }),
      )

      const vaccinationKeysInfo = data.topBlock.sites
      const vaccinationGenderObject = {
        male: data.topBlock.vaccination.male,
        female: data.topBlock.vaccination.female,
        others: data.topBlock.vaccination.others,
      }

      const vaccinationVaccineObject = {
        covaxin: data.topBlock.vaccination.covaxin,
        covishield: data.topBlock.vaccination.covishield,
        sputnik: data.topBlock.vaccination.sputnik,
      }

      const totalDosesObj = {
        dose1: data.topBlock.vaccination.tot_dose_1,
        dose2: data.topBlock.vaccination.tot_dose_2,
        totalDoses: data.topBlock.vaccination.total_doses,
      }

      const vaccinationDoneByAge = {
        'Above 60': data.vaccinationByAge.above_60,

        '18-44': data.vaccinationByAge.vac_18_45,
        '45-60': data.vaccinationByAge.vac_45_60,
      }

      const vaccinationDoneByTime = data.vaccinationDoneByTime.map(
        eachTime => ({
          count: eachTime.count,
          timeDose1: eachTime.dose_one,
          timeDose2: eachTime.dose_two,
          label: eachTime.label,
        }),
      )

      this.setState(prevState => ({
        apiStatus: apiStatusKeys.success,
        vaccinationDetailsList: [
          ...prevState.vaccinationDetailsList,
          vaccinationKeysInfo,
          vaccinationVaccineObject,
          vaccinationGenderObject,
          vaccinationDoneByAge,
          vaccinationDoneByTime,
          totalDosesObj,
          vaccinationDosesAsPerAgeBasedObj,
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
      activeValue,
    } = this.state

    const activeDosesButtonClass = activeValue
      ? 'vaccination_line_chart_byDoses_active_Button'
      : 'vaccination_line_chart_byDoses_deActive_Button'

    const activeAgedButtonClass = activeValue
      ? 'vaccination_line_chart_byAge_deActive_Button'
      : 'vaccination_line_chart_byAge_active_Button'
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

    const vaccinationDetailsAsPerAge =
      vaccinationDetailsList.length === 0
        ? vaccinationDetailsList
        : vaccinationDetailsList[3]

    const VaccinationLineData =
      vaccinationDetailsList.length === 0
        ? vaccinationDetailsList
        : vaccinationDetailsList[4]

    const VaccinationDosesData =
      vaccinationDetailsList.length === 0
        ? vaccinationDetailsList
        : vaccinationDetailsList[5]

    const vaccinationAgeDosesData =
      vaccinationDetailsList.length === 0
        ? vaccinationDetailsList
        : vaccinationDetailsList[6]

    const dataFormatter = number => {
      if (number > 1000) {
        return `${(number / 1000).toString()}k`
      }
      return number.toString()
    }

    const {totalDoses, dose1, dose2} = VaccinationDosesData

    const keyNames = Object.keys(vaccinationDosesAsPerAge)

    let genderChartList = []

    keyNames.forEach(keyName => {
      if (vaccinationDosesAsPerAge[keyName]) {
        genderChartList = [
          ...genderChartList,
          {
            count: vaccinationDosesAsPerAge[keyName],
            gender: keyName,
          },
        ]
      }
    })

    const keyNamesVaccineType = Object.keys(vaccinationDosesDetailsNotEmpty)

    let vaccineTypeChartList = []

    keyNamesVaccineType.forEach(keyName => {
      if (vaccinationDosesDetailsNotEmpty[keyName]) {
        vaccineTypeChartList = [
          ...vaccineTypeChartList,
          {
            count: vaccinationDosesDetailsNotEmpty[keyName],
            vaccineType: keyName,
          },
        ]
      }
    })

    const keyNamesAgedBased = Object.keys(vaccinationDetailsAsPerAge)

    let vaccineAgedBasedChartList = []

    keyNamesAgedBased.forEach(keyName => {
      if (vaccinationDetailsAsPerAge[keyName]) {
        vaccineAgedBasedChartList = [
          ...vaccineAgedBasedChartList,
          {
            count: vaccinationDetailsAsPerAge[keyName],
            vaccineAgeCategory: keyName,
          },
        ]
      }
    })

    const {total, govt, pvt} = vaccinationSitesDetailsNotEmpty

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
        </div>
        <div className="vaccination_line_con">
          <h1 className="vaccination_line_chart_head">Vaccination Trends</h1>
          <div className="vaccination_line_chart_button_card">
            <button
              className={activeDosesButtonClass}
              type="button"
              onClick={this.userSearchBasedDoses}
            >
              By Doses
            </button>
            <button
              className={activeAgedButtonClass}
              type="button"
              onClick={this.userSearchBasedAge}
            >
              By Age
            </button>
          </div>
          {activeValue ? (
            <AreaChart
              width={1200}
              height={700}
              data={VaccinationLineData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="label" />
              <YAxis tickFormatter={dataFormatter} />

              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#A226DC"
                activeDot={{r: 8}}
                fill="#A226DC"
              />
              <Area
                type="monotone"
                dataKey="timeDose1"
                stroke="#FCEA4E"
                fill="#3E4226"
              />
              <Area
                type="monotone"
                dataKey="timeDose2"
                stroke="#37C62B"
                fill="#233323"
              />
            </AreaChart>
          ) : (
            <AreaChart
              width={1200}
              height={500}
              data={vaccinationAgeDosesData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="label" />
              <YAxis tickFormatter={dataFormatter} />

              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="age18"
                stroke="#A226DC"
                activeDot={{r: 8}}
                fill="#A226DC"
              />
              <Area
                type="monotone"
                dataKey="age45"
                stroke="#FCEA4E"
                fill="#3E4226"
              />
              <Area
                type="monotone"
                dataKey="age60"
                stroke="#37C62B"
                fill="#233323"
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#37C62B"
                fill="#233323"
              />
            </AreaChart>
          )}
        </div>
        <div className="vaccination_pie_radius_con">
          <div className="vaccination_pie_half_radius_con">
            <h1 className="vaccination_pie_radius_chart_head">
              Vaccination Category
            </h1>

            <ResponsiveContainer height={300} width={450}>
              <PieChart>
                <Pie
                  data={genderChartList}
                  startAngle={0}
                  endAngle={180}
                  innerRadius="40%"
                  outerRadius="70%"
                  dataKey="count"
                >
                  <Cell name="male" fill="#fecba6" />
                  <Cell name="female" fill="#b3d23f" />
                  <Cell name="others" fill="#a44c9e" />
                </Pie>
                <Legend
                  iconType="circle"
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                />
              </PieChart>
            </ResponsiveContainer>

            <ResponsiveContainer height={300} width={450}>
              <PieChart>
                <Pie
                  data={vaccineTypeChartList}
                  startAngle={0}
                  endAngle={180}
                  innerRadius="40%"
                  outerRadius="70%"
                  dataKey="count"
                >
                  <Cell name="sputnik" fill="#fecba6" />
                  <Cell name="covaxin" fill="#b3d23f" />
                  <Cell name="covishield" fill="#a44c9e" />
                </Pie>
                <Legend
                  iconType="circle"
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="vaccination_pie_full_radius_circle_con">
            <h1 className="vaccination_pie_full_radius_chart_head">
              Vaccination by Age
            </h1>
            <ResponsiveContainer height={300} width={450}>
              <PieChart>
                <Pie
                  data={vaccineAgedBasedChartList}
                  startAngle={0}
                  endAngle={360}
                  outerRadius={80}
                  dataKey="count"
                >
                  <Cell name="18-44" fill="#b3d23f" />
                  <Cell name="45-60" fill="#a44c9e" />
                  <Cell name="Above 60" fill="#fecba6" />
                </Pie>
                <Legend
                  iconType="circle"
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
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
