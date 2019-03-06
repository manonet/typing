
import React from 'react'
import classNames from 'classnames'
import { withPrefix } from 'gatsby-link'
import { withStyles } from '@material-ui/core/styles'

import SampleBoard, { SAMPLE_BOARD_ID } from './SampleBoard'
import Keyboard from './keyboard/Keyboard'

const styles = theme => ({
  root: {
    position: 'relative',
    backgroundColor: theme.palette.grey[700],
  },
})

class Program extends React.Component {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  componentDidMount() {
    // set focus on input
    const userText = document.querySelector(`#${SAMPLE_BOARD_ID}`)
    console.log(userText)
    userText.focus()
  }

  onFocus(e) {
    const { onWriting } = this.props
    onWriting(true)
  }

  onBlur(e) {
    const { onWriting } = this.props
    onWriting(false)
  }

  handleChange(e) {
    const { userWrite } = this.props
    const userText = e.target.value
    userWrite(userText)
  }

  render() {
    const {
      classes,
      className,
      sampleText,
      userText,
      cursorAt,
      signToWrite,
      writtenSign,
      writing,
      onKeyboardLoaded,
      displayedLevel,
      keyEvent,
    } = this.props
    return (
      <div className={
        classNames(
          classes.root,
          className,
        )
      }
      >
        <SampleBoard
          sampleText={sampleText}
          userText={userText}
          cursorAt={cursorAt}
          signToWrite={signToWrite}
          writtenSign={writtenSign}
          writing={writing}
          onChange={this.handleChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          className={SAMPLE_BOARD_ID}
        />
        <Keyboard
          keyboardUrl={withPrefix('/keyboards/windows/hu-t-k0-windows.xml')}
          onKeyboardLoaded={onKeyboardLoaded}
          displayedLevel={displayedLevel}
          keyEvent={keyEvent}
        />
      </div>
    )
  }
}

export default withStyles(styles)(Program)
