// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'
import './index.css'

class CowinDashboard extends Component {
  state = {data: {}, failure: false, loading: true}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(covidVaccinationDataApiUrl)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({data, loading: false})
    } else {
      this.setState({failure: true, loading: false})
    }
  }

  renderSuccessView = () => {
    const {data, failure} = this.state

    if (failure === true) {
      return this.renderFailureView()
    }
    return (
      <>
        <VaccinationCoverage data={data.last_7_days_vaccination} />
        <VaccinationByGender data={data.vaccination_by_gender} />
        <VaccinationByAge data={data.vaccination_by_age} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="f-div">
      <img
        className="f-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  render() {
    const {loading} = this.state
    return (
      <div className="bg">
        <div>
          <div className="header">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="logo"
            />
            <h1 className="h">Co-WIN</h1>
          </div>
          <h2 className="h2">CoWIN Vaccination in India</h2>
        </div>

        {loading ? this.renderLoader() : this.renderSuccessView()}
      </div>
    )
  }
}

export default CowinDashboard
