import {Component} from 'react'

import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'

import Loader from 'react-loader-spinner'

import NotFound from '../NotFound'
import './index.css'

const apiStatusKeys = {
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class TimeLineData extends Component {
  state = {
    apiStatus: apiStatusKeys.initial,
    lineChartBtn: '',
    timeLineData: [],
  }

  componentDidMount() {
    this.spreadTimeLinesApiCall()
  }

  spreadTimeLinesApiCall = async () => {
    this.setState({apiStatus: apiStatusKeys.inprogress})
    const {stateNameCode} = this.props

    const timelineResponse = await fetch(
      `https://apis.ccbp.in/covid19-timelines-data/${stateNameCode}`,
    )
    const timelineData = await timelineResponse.json()

    if (timelineResponse.ok) {
      this.convertAllDatesDataINtoArray(timelineData[stateNameCode].dates)

      this.setState({
        apiStatus: apiStatusKeys.success,
      })
    } else {
      this.setState({apiStatus: apiStatusKeys.failure})
    }
  }

  convertAllDatesDataINtoArray = data => {
    const resultList = []
    const confirmedSpreadList = []
    const deceasedSpreadList = []
    const recoveredSpreadList = []
    const testedSpreadList = []
    const activeSpreadList = []
    const totalPositiveList = []
    const keyNames = Object.keys(data)
    keyNames.forEach(keyName => {
      if (data[keyName]) {
        const {total} = data[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const totalActive = confirmed - (deceased + recovered)
        const totalPositive = tested / recovered
        const mainDate = keyName
        confirmedSpreadList.push({
          confirmedDate: mainDate,
          Confirmed: confirmed,
        })

        deceasedSpreadList.push({
          deceasedDate: mainDate,
          Deceased: deceased,
        })

        recoveredSpreadList.push({
          recoveredDate: mainDate,
          Recovered: recovered,
        })

        testedSpreadList.push({
          testedDate: mainDate,
          Tested: tested,
        })

        activeSpreadList.push({
          activeDate: mainDate,
          TotalActive: totalActive,
        })
        totalPositiveList.push({
          positiveDate: mainDate,
          'Test Positivity Ratio': totalPositive,
        })
      }
    })
    resultList.push(
      confirmedSpreadList,
      activeSpreadList,
      recoveredSpreadList,
      deceasedSpreadList,

      testedSpreadList,
      totalPositiveList,
    )
    this.setState({timeLineData: resultList})
  }

  renderSpreadTrends = () => {}

  renderConfirmedLineChart = () => {
    const {timeLineData} = this.state

    return (
      <div className="confirmed_line_chart_card">
        <LineChart
          width={1200}
          height={250}
          data={timeLineData[0]}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis dataKey="confirmedDate" stroke="#FF073A" />
          <YAxis stroke="#FF073A" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Confirmed" stroke="#FF073A" />
        </LineChart>
      </div>
    )
  }

  renderActiveLineChart = () => {
    const {timeLineData} = this.state

    return (
      <div className="active_line_chart_card">
        <LineChart
          width={1200}
          height={250}
          data={timeLineData[1]}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis dataKey="activeDate" stroke="#007BFF" />
          <YAxis stroke="#007BFF" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="TotalActive" stroke="#007BFF" />
        </LineChart>
      </div>
    )
  }

  renderRecoveredLineChart = () => {
    const {timeLineData} = this.state

    return (
      <div className="recovered_line_chart_card">
        <LineChart
          width={1200}
          height={250}
          data={timeLineData[2]}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis dataKey="recoveredDate" stroke="#27A243" />
          <YAxis stroke="#27A243" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Recovered" stroke="#27A243" />
        </LineChart>
      </div>
    )
  }

  renderDeceasedLineChart = () => {
    const {timeLineData} = this.state

    return (
      <div className="deceased_line_chart_card">
        <LineChart
          width={1200}
          height={250}
          data={timeLineData[3]}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis dataKey="deceasedDate" stroke="#6C757D" />
          <YAxis stroke="#6C757D" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Deceased" stroke="#6C757D" />
        </LineChart>
      </div>
    )
  }

  renderTestedLineChart = () => {
    const {timeLineData} = this.state

    return (
      <div className="tested_line_chart_card">
        <LineChart
          width={1200}
          height={250}
          data={timeLineData[4]}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis dataKey="testedDate" stroke="#9673B9" />
          <YAxis stroke="#9673B9" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Tested" stroke="#9673B9" />
        </LineChart>
      </div>
    )
  }

  slicingItemsFunction = indexItem => {
    const {timeLineData} = this.state
    const firstTimeSlice = timeLineData[indexItem].length - 10
    const secondEndSlice = timeLineData[indexItem].length
    const timeBarGraphList = timeLineData[indexItem].slice(
      firstTimeSlice,
      secondEndSlice,
    )
    return timeBarGraphList
  }

  renderConfirmedBarChart = () => {
    const data = this.slicingItemsFunction(0)

    return (
      <div className="confirmed_bar_chart_card">
        <BarChart width={1200} height={450} data={data}>
          <XAxis dataKey="confirmedDate" fill="#9A0E31" />

          <Legend />
          <Bar
            dataKey="Confirmed"
            fill="#9A0E31"
            className="bar"
            label={{position: 'top', color: '#9A0E31'}}
          />
        </BarChart>
      </div>
    )
  }

  renderActiveBarChart = () => {
    const data = this.slicingItemsFunction(1)

    return (
      <div className="active_bar_chart_card">
        <BarChart width={1200} height={450} data={data}>
          <XAxis dataKey="activeDate" fill="#0A4FA0" />

          <Legend />
          <Bar
            dataKey="TotalActive"
            fill="#0A4FA0"
            className="bar"
            label={{position: 'top', color: '#0A4FA0'}}
          />
        </BarChart>
      </div>
    )
  }

  renderRecoveredBarChart = () => {
    const data = this.slicingItemsFunction(2)

    return (
      <div className="recovered_bar_chart_card">
        <BarChart width={1200} height={450} data={data}>
          <XAxis dataKey="recoveredDate" fill="#216837" />

          <Legend />
          <Bar
            dataKey="Recovered"
            fill="#216837"
            className="bar"
            label={{position: 'top', color: '#216837'}}
          />
        </BarChart>
      </div>
    )
  }

  renderDeceasedBarChart = () => {
    const data = this.slicingItemsFunction(3)

    return (
      <div className="deceased_bar_chart_card">
        <BarChart width={1200} height={450} data={data}>
          <XAxis dataKey="deceasedDate" fill="#474C57" />

          <Legend />
          <Bar
            dataKey="Deceased"
            fill="#474C57"
            className="bar"
            label={{position: 'top', color: '#474C57'}}
          />
        </BarChart>
      </div>
    )
  }

  renderPositiveRatioLineChart = () => {
    const {timeLineData} = this.state

    return (
      <div className="positiveRatio_line_chart_card">
        <LineChart
          width={1200}
          height={250}
          data={timeLineData[5]}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis dataKey="positiveDate" stroke="#FD7E14" />
          <YAxis stroke="#FD7E14" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Test Positivity Ratio"
            stroke="#FD7E14"
          />
        </LineChart>
      </div>
    )
  }

  renderTimeLineBarAndLineCharts = () => (
    <>
      <div>
        {this.renderConfirmedBarChart()}
        {this.renderActiveBarChart()}
        {this.renderRecoveredBarChart()}
        {this.renderDeceasedBarChart()}
      </div>
      <h1 className="spread_heading">Spread Trends</h1>
      <div className="cumulative_daily_card">
        <button type="button" className="cumulative_btn">
          Cumulative
        </button>
        <button
          type="button"
          className="daily_btn"
          onClick={this.whenUserPressDailyButton}
        >
          Daily
        </button>
      </div>
      <div testId="lineChartsContainer">
        {this.renderConfirmedLineChart()}
        {this.renderActiveLineChart()}
        {this.renderRecoveredLineChart()}
        {this.renderDeceasedLineChart()}
        {this.renderTestedLineChart()}
        {this.renderPositiveRatioLineChart()}
      </div>
    </>
  )

  renderLoaderView = () => (
    <div className="covid-loader-container" testId="timelinesDataLoader">
      <Loader type="Tailspin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureCase = () => <NotFound />

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusKeys.inprogress:
        return this.renderLoaderView()
      case apiStatusKeys.success:
        return this.renderTimeLineBarAndLineCharts()
      case apiStatusKeys.failure:
        return this.renderFailureCase()
      default:
        return null
    }
  }
}

export default TimeLineData
