import { Button, Form, Input, Select, Space, message } from 'antd';
import Bowser from 'bowser';
import { useStaticQuery, graphql } from 'gatsby';
import { useIntl, FormattedMessage } from 'gatsby-plugin-intl';
import React, { useState, useEffect } from 'react';

import Layout from '../components/Layout';
import SEO from '../components/seo';
import { languageName } from '../intl/languages';
import { firstNameIsTheLastLanguages, getLangCode } from '../intl/languages';
import useFirebase from '../utils/useFirebase';

const contacts = [
  {
    firstName: 'Balázs',
    lastName: 'Szilágyi',
    email: 'info@manonet.org',
    imgUrl: require('../images/contact/balazs.jpg'),
    linkedinUrl:
      'https://www.linkedin.com/in/bal%C3%A1zs-szil%C3%A1gyi-112987121/',
    position: 'Developer, Hungarian support',
    location: 'Mosonmagyaróvár, Hungary',
  },
  {
    firstName: 'Dominik',
    lastName: 'Soczewka',
    email: 'dominik.soczewka@manonet.org',
    imgUrl: require('../images/contact/dominik.jpg'),
    linkedinUrl: 'https://www.linkedin.com/in/dominiksoczewka',
    position: 'Developer, Polish support',
    location: 'Lublin, Poland',
  },
];

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const { Option } = Select;

const ContactPage = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const firebase = useFirebase();

  const [isSending, setIsSending] = useState(false);
  const [form] = Form.useForm();
  const intl = useIntl();
  const lang = intl.locale as keyof typeof languageName;
  const langCode = getLangCode(lang);
  const browser =
    typeof window !== 'undefined' && Bowser.parse(window.navigator.userAgent);
  const queryData = useStaticQuery(graphql`
    query ContactQuery {
      site {
        siteMetadata {
          version
        }
      }
    }
  `);

  const validateMessages = {
    required: intl.formatMessage(
      {
        id: 'form.field.required',
        defaultMessage: '{label} is required!',
      },
      { label: '${label}' }
    ),
    types: {
      email: intl.formatMessage(
        {
          id: 'form.field.invalid.email',
          defaultMessage: '{label} is not validate email!',
        },
        { label: '${label}' }
      ),
    },
  };

  const debugInfo = {
    'Manonet version': queryData.site.siteMetadata.version,
    'Selected language': `${languageName[lang]} (${lang})`,
    'Browser language':
      typeof window !== 'undefined' && window.navigator.language,
    'Browser languages':
      typeof window !== 'undefined' && window.navigator.languages.join(', '),
    'Browser name': browser && browser.browser && browser.browser.name,
    'Browser version': browser && browser.browser && browser.browser.version,
    'Operation system': browser && browser.os && browser.os.name,
    Platform: browser && browser.platform && browser.platform.type,
  };

  useEffect(() => {
    if (!firebase) return;
    // @ts-ignore
    return firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
      if (!!user) {
        // If the user is logged in, prefill form with existing data
        form.setFieldsValue({
          name: user.displayName,
          email: user.email,
        });
      }
    });
  }, [firebase]);

  function sendMail(values: any) {
    const data = values;
    if (!!(firebase && isSignedIn)) {
      // @ts-ignore
      debugInfo.userUID = firebase.auth().currentUser.uid;
    }
    data.debug = debugInfo;
    setIsSending(true);

    // TODO replace it with axios or similar
    fetch('/api/v1/contact.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsSending(false);
        if (data.response === 'success') {
          // Actually sent based on BE response
          form.resetFields();
          message.success(
            intl.formatMessage({
              id: 'contact.form.success',
              defaultMessage: 'Email was sent successfully',
            })
          );
        } else {
          // some error happened
          message.error(
            intl.formatMessage({
              id: 'contact.form.error',
              defaultMessage:
                'There was an error trying to send your message. Please try again later.',
            })
          );
        }
      })
      .catch((error) => {
        console.error(error);
        setIsSending(false);
        message.error(
          intl.formatMessage({
            id: 'contact.form.error',
            defaultMessage:
              'There was an error trying to send your message. Please try again later.',
          })
        );
      });
  }

  function onReset() {
    form.resetFields();
  }

  return (
    <Layout className="contact">
      <SEO title="" />
      <section className="contactForm__section">
        <div className="container">
          <h2 className="contact__title">
            <FormattedMessage id="contact.title" defaultMessage="Contact us" />
          </h2>
          <Form
            {...layout}
            form={form}
            name="contact"
            onFinish={sendMail}
            validateMessages={validateMessages}
            initialValues={{
              ['to']: 'manonet',
            }}
          >
            <Form.Item
              name="name"
              rules={[{ required: true }]}
              label={intl.formatMessage({
                id: 'contact.form.name',
                defaultMessage: 'Name',
              })}
            >
              {/* If the user is logged in, force using existing data, and disable input changes. */}
              <Input disabled={!!(firebase && isSignedIn)} />
            </Form.Item>
            <Form.Item
              name="email"
              label={intl.formatMessage({
                id: 'contact.form.email',
                defaultMessage: 'Email',
              })}
              rules={[{ required: true, type: 'email' }]}
            >
              {/* If the user is logged in, force using existing data, and disable input changes. */}
              <Input disabled={!!(firebase && isSignedIn)} />
            </Form.Item>
            <Form.Item
              name="to"
              label={intl.formatMessage({
                id: 'contact.form.mailingAddress',
                defaultMessage: 'To',
              })}
            >
              <Select>
                <Option value="manonet">Manonet</Option>
                <Option value="dominik">Dominik</Option>
                <Option value="balazs">Balázs</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="subject"
              label={intl.formatMessage({
                id: 'contact.form.subject',
                defaultMessage: 'Subject',
              })}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="message"
              label={intl.formatMessage({
                id: 'contact.form.message',
                defaultMessage: 'Message',
              })}
              rules={[{ required: true }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
              <Space>
                <Button type="primary" htmlType="submit" loading={isSending}>
                  <FormattedMessage
                    id="contact.form.submit"
                    defaultMessage="Submit"
                  />
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  <FormattedMessage
                    id="contact.form.reset"
                    defaultMessage="Reset"
                  />
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </section>

      <section className="contact__section">
        <div className="container contact">
          <div className="contact__list">
            {contacts.map((contact) => {
              const fullName = firstNameIsTheLastLanguages.includes(langCode)
                ? `${contact.lastName} ${contact.firstName}`
                : `${contact.firstName} ${contact.lastName}`;
              return (
                <div className="contact__item" key={fullName}>
                  <div className="contact__image">
                    <img src={contact.imgUrl} alt={fullName} />
                  </div>
                  <h3 className="contact__name">
                    {firstNameIsTheLastLanguages.includes(langCode) ? (
                      <>
                        <span className="contact__lastName">
                          {contact.lastName}
                        </span>{' '}
                        <span className="contact__firstName">
                          {contact.firstName}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="contact__firstName">
                          {contact.firstName}
                        </span>{' '}
                        <span className="contact__lastName">
                          {contact.lastName}
                        </span>
                      </>
                    )}
                  </h3>

                  <div className="contact__position">{contact.position}</div>
                  <div className="contact__location">{contact.location}</div>
                  <div className="contact__email">
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </div>
                  <a href={contact.linkedinUrl} target="_blank">
                    Linkedin
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
