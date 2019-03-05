import React from 'react'

export default class SampleBoardChar extends React.Component {
  constructor() {
    super()
  }

  render() {
    // classes
    const done = (this.props.cursorAt > this.props.index) ? 'done ' : ''
    const active = (this.props.cursorAt === this.props.index) ? 'toWrite ' : ''
    const error = (done && this.props.char !== this.props.userText.substring(this.props.index, this.props.index + 1)) ? 'error ' : ''

    const letterToDisplay = (error) ? this.props.userText.substring(this.props.index, this.props.index + 1) : this.props.char

    return (
      <i className={`char ${done}${active}${error}`}>
        {letterToDisplay}
      </i>
    )
  }
}
