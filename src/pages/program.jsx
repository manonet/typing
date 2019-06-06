import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Program from '../components/Program'

export default class ProgramPage extends React.Component {
  constructor() {
    super()
    this.state = {
      isModalOpen: false,
    }

    this.handleModalOpen = this.handleModalOpen.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
  }

  handleModalOpen() {
    this.setState({
      isModalOpen: true,
    })
  }

  handleModalClose() {
    this.setState({ isModalOpen: false })
  }

  render() {
    const { isModalOpen } = this.state

    return (
      <Layout isBlurred={isModalOpen}>
        <SEO title="Typewriting program" />
        <Program
          isModalOpen={isModalOpen}
          handleModalOpen={this.handleModalOpen}
          handleModalClose={this.handleModalClose}
        />
      </Layout>
    )
  }
}
