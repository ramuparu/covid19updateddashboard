import './index.css'

const CasesStatus = props => {
  const {
    confirmedStats,
    recoveredStats,
    activeStats,
    deceasedStats,
    whenUserClickConfirmedCases,
    whenUserClickActiveCases,
    whenUserClickRecoveredCases,
    whenUserClickDeceasedCases,
    activeStatus,
  } = props

  const confirmedClass = activeStatus === 'confirmed' ? 'confirmed_bg_card' : ''

  const activeClass = activeStatus === 'activeValue' ? 'active_bg_card' : ''

  const recoveredClass =
    activeStatus === 'recoveredValue' ? 'recovered_bg_card' : ''

  const deceasedClass =
    activeStatus === 'deceasedValue' ? 'deceased_bg_card' : ''

  const onClickConfirmedBtn = () => {
    whenUserClickConfirmedCases()
  }

  const onClickActiveBtn = () => {
    whenUserClickActiveCases()
  }

  const onClickRecoveredBtn = () => {
    whenUserClickRecoveredCases()
  }

  const onClickDeceasedBtn = () => {
    whenUserClickDeceasedCases()
  }
  return (
    <div className="countrywide_page">
      <div className="countrywide_covid_stats_con">
        <button
          type="button"
          onClick={onClickConfirmedBtn}
          className="confirmed_card_btn"
        >
          <div
            className={`confirmed_card ${confirmedClass}`}
            testId="stateSpecificConfirmedCasesContainer"
          >
            <p className="confirmed_para">Confirmed</p>
            <img
              src="https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638163795/Groupconfirmed_r0ng1r.png"
              alt="state specific confirmed cases pic"
              className="confirmed_image"
            />
            <p className="confirmed_cases_para">{confirmedStats}</p>
          </div>
        </button>
        <button
          type="button"
          onClick={onClickActiveBtn}
          className="active_card_btn"
        >
          <div
            className={`active_card ${activeClass}`}
            testId="stateSpecificActiveCasesContainer"
          >
            <p className="active_para">Active</p>
            <img
              src="https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638163837/protection_1active_lz4jqs.png"
              alt="state specific active cases pic"
              className="active_image"
            />
            <p className="active_cases_para">{activeStats}</p>
          </div>
        </button>
        <button
          type="button"
          onClick={onClickRecoveredBtn}
          className="recovered_card_btn"
        >
          <div
            className={`recovered_card ${recoveredClass}`}
            testId="stateSpecificRecoveredCasesContainer"
          >
            <p className="recover_para">Recovered</p>
            <img
              src="https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638163886/recovered_1recovered_rslph4.png"
              alt="state specific recovered cases pic"
              className="recover_image"
            />
            <p className="recover_cases_para">{recoveredStats}</p>
          </div>
        </button>
        <button
          type="button"
          onClick={onClickDeceasedBtn}
          className="deceased_card_btn"
        >
          <div
            className={`deceased_card ${deceasedClass}`}
            testId="stateSpecificDeceasedCasesContainer"
          >
            <p className="decease_para">Deceased</p>
            <img
              src="https://res.cloudinary.com/dkz4qzdsw/image/upload/v1638163603/breathing_1deceased_i1q80r.png"
              alt="state specific deceased cases pic"
              className="decease_image"
            />
            <p className="decease_cases_para">{deceasedStats}</p>
          </div>
        </button>
      </div>
    </div>
  )
}

export default CasesStatus
