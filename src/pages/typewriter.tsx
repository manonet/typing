import { injectIntl } from 'gatsby-plugin-intl';
import React from 'react';
// @ts-ignore
import { IntlShape } from 'react-intl';

import Layout from '../components/Layout';
import Typewriter from '../components/Typewriter';
import SEO from '../components/seo';

type Props = {
  intl: IntlShape;
};

type State = {
  isModalOpen: boolean;
};

class TypewriterPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
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
          title={intl.formatMessage({ id: 'typewriter.page.title' })}
        />
        <Typewriter
          isModalOpen={isModalOpen}
          handleModalOpen={this.handleModalOpen}
          handleModalClose={this.handleModalClose}
        />
      </Layout>
    );
  }
}

export default injectIntl(TypewriterPage);
