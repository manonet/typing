import React from 'react'
import SampleBoardChar from './SampleBoardChar'
import SampleBoardHint from './SampleBoardHint'

export default class SampleBoard extends React.Component {
  constructor() {
    super()
  }

  render() {
    const sampleArray = this.props.sampleText.split('')
    const { cursorAt } = this.props
    const { writtenSign } = this.props
    const { userText } = this.props
    const focus = this.props.writing ? 'focus' : ''

    return (
      <div className="sample">
        <SampleBoardHint signToWrite={this.props.signToWrite} writtenSign={this.props.writtenSign} />

        <div className="sample__wrapper">
          <kbd className={`sampleBoard ${focus}`}>
            {sampleArray.map((char, id) => (
              <SampleBoardChar
                key={id}
                index={id}
                cursorAt={cursorAt}
                writtenSign={writtenSign}
                userText={userText}
                char={char}
              />
            ))}
          </kbd>

          <textarea
            className="userText"
            value={this.props.userText}
            onChange={this.props.onChange}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            ref="userText"
          />
        </div>
      </div>
    )
  }
}
