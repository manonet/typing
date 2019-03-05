import React from 'react'
import SampleBoardChar from './SampleBoardChar'

export default class SampleBoard extends React.Component {
  constructor() {
    super()
    this.renderHint = this.renderHint.bind(this)
  }

  renderHint({ signToWrite, writtenSign }) {
    return (
      <p className="sampleBoardHint">
        Requested: {signToWrite}, written: {writtenSign}
      </p>
    )
  }

  render() {
    const {
      cursorAt,
      sampleText,
      signToWrite,
      writtenSign,
      userText,
      writing,
      onChange,
      onFocus,
      onBlur,
    } = this.props

    const sampleArray = sampleText.split('')
    const focus = writing ? 'focus' : ''

    return (
      <div className="sample">
        {this.renderHint({
          signToWrite,
          writtenSign,
        })}

        <div className="sample__wrapper">
          <kbd className={`sampleBoard ${focus}`}>
            {sampleArray.map((char, index) => (
              <SampleBoardChar
                key={index}
                index={index}
                cursorAt={cursorAt}
                writtenSign={writtenSign}
                userText={userText}
                char={char}
              />
            ))}
          </kbd>

          <textarea
            className="userText"
            value={userText}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
      </div>
    )
  }
}
