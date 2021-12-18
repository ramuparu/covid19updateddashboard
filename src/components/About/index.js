import {Component} from 'react'
import Loader from 'react-loader-spinner'
import NotFound from '../NotFound'
import FaqItems from '../FaqItems'
import Footer from '../Footer'
import './index.css'

const faqApiStatusKeys = {
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class About extends Component {
  state = {faqList: [], faqApiStatus: faqApiStatusKeys.initial}

  componentDidMount() {
    this.renderAboutApiCall()
  }

  renderAboutApiCall = async () => {
    this.setState({faqApiStatus: faqApiStatusKeys.inprogress})
    const response = await fetch('https://apis.ccbp.in/covid19-faqs')
    const data = await response.json()

    if (response.ok) {
      this.setState({faqApiStatus: faqApiStatusKeys.success, faqList: data.faq})
    } else {
      this.setState({faqApiStatus: faqApiStatusKeys.failure})
    }
  }

  renderFaqLoaderView = () => (
    <div className="covid-loader-container" testid="aboutRouteLoader">
      <Loader type="Tailspin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFaqFailureCase = () => <NotFound />

  renderFaqSuccessView = () => {
    const {faqList} = this.state
    console.log(faqList)
    return (
      <>
        <div className="about_page">
          <h1 className="about_head">About</h1>
          <p className="updated_para">Last update on march 28th 2021.</p>
          <h1 className="covid19_distribution_head">
            COVID-19 vaccines be ready for distribution
          </h1>
          <ul className="about_faqs_unlist_con" testid="faqsUnorderedList">
            {faqList.map(eachFaq => (
              <FaqItems key={eachFaq.qno} eachFaq={eachFaq} />
            ))}
          </ul>
        </div>
        <Footer />
      </>
    )
  }

  render() {
    const {faqApiStatus} = this.state

    switch (faqApiStatus) {
      case faqApiStatusKeys.inprogress:
        return this.renderFaqLoaderView()
      case faqApiStatusKeys.success:
        return this.renderFaqSuccessView()
      case faqApiStatusKeys.failure:
        return this.renderFaqFailureCase()
      default:
        return null
    }
  }
}

export default About
