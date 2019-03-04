import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import vars from '../variables'
import KeyboardKey from '../components/keyboard/KeyboardKey'

function StyleguideKey(props) {
  // Backspace
  const state = props.state || 'def'
  return (
    <svg className="key__svg" version="1.1" viewBox={`0 0 ${vars.keyWidth} ${vars.keyHeight}`}>
      <KeyboardKey
        key="D12"
        keyObj={{
          iso: 'D12',
          labels: {
            to: 'a',
            shift: '%',
            altGr: '°',
          },
          state,
        }}
        keyEvent={{}}
      />
    </svg>
  )
}

const ProgramPage = () => (
  <Layout>
    <SEO title="Typewriting program" />
    <h1>Typewriting program</h1>
    <p>test</p>
    <section className="section section--key">
      <h2>Key</h2>

      <h3>States</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>class</th>
            <th />
            <th>secondary</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">def</th>
            <td>
              <StyleguideKey />
            </td>
            <td>
              <StyleguideKey state="def secondary" />
            </td>
          </tr>
          <tr>
            <th scope="row">toWrite</th>
            <td>
              <StyleguideKey state="toWrite" />
            </td>
            <td>
              <StyleguideKey state="toWrite secondary" />
            </td>
          </tr>
          <tr>
            <th scope="row">correct</th>
            <td>
              <StyleguideKey state="correct" />
            </td>
            <td>
              <StyleguideKey state="correct secondary" />
            </td>
          </tr>
          <tr>
            <th scope="row">error</th>
            <td>
              <StyleguideKey state="error" />
            </td>
            <td>
              <StyleguideKey state="error secondary" />
            </td>
          </tr>
          <tr>
            <th scope="row" />
            <td>
              <StyleguideKey state="missed" />
            </td>
            <td>
              <StyleguideKey state="missed secondary" />
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Hotmap</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>class</th>
            <th>0%</th>
            <th>50%</th>
            <th>100%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">def</th>
            <td>
              <StyleguideKey />
            </td>
            <td>
              <StyleguideKey />
            </td>
            <td>
              <StyleguideKey />
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default ProgramPage
