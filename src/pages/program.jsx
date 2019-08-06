import React from 'react';
import { injectIntl } from 'gatsby-plugin-intl';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Program from '../components/Program';

class ProgramPage extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
    };

    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalOpen() {
    this.setState({
      isModalOpen: true,
    });
  }

  handleModalClose() {
    this.setState({ isModalOpen: false });
  }

  render() {
    const { isModalOpen } = this.state;
    const { intl } = this.props;

    return (
      <Layout isBlurred={isModalOpen}>
        <SEO
          lang={intl.locale}
          title={intl.formatMessage({ id: 'program.page.title' })}
          keywords={intl.formatMessage({ id: 'site.keywords' })}
        />
        <Program
          isModalOpen={isModalOpen}
          handleModalOpen={this.handleModalOpen}
          handleModalClose={this.handleModalClose}
        />
      </Layout>
    );
  }
}

export default injectIntl(ProgramPage);
