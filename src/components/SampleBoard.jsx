import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import SampleBoardChar from './SampleBoardChar'

export const SAMPLE_BOARD_ID = 'userText'

const styles = theme => ({
  sample: {
    position: 'relative',
    backgroundColor: theme.palette.grey[700],
  },
  wrapper: {
    position: 'relative',
  },
  sampleBoard: {
    display: 'block',
    background: theme.palette.grey[500],
    border: `2px solid ${theme.palette.grey[600]}`,
    padding: 10,
    color: theme.palette.grey[500],
    fontFamily: 'Inconsolata',
    fontSize: 18,
  },
  sampleBoardFocus: {
    background: theme.palette.common.white,
    border: `2px solid ${theme.palette.primary.main}`,
  },
  sampleBoardHint: {
    margin: 0,
  },
  userText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    maxWidth: 'none',
    opacity: 0.01,
  },
})

function SampleBoard(props) {
  const {
    classes,
    className,
    cursorAt,
    sampleText,
    signToWrite,
    writtenSign,
    userText,
    isUserInputFocused,
    onChange,
    onFocus,
    onBlur,
  } = props

  const sampleArray = sampleText.split('')

  return (
    <div className={
      classNames(
        classes.sample,
        className,
      )
    }
    >
      <p className={classes.sampleBoardHint}>
        Requested: {signToWrite}, written: {writtenSign}
      </p>

      <div className={classes.wrapper}>
        <kbd className={
          classNames(
            classes.sampleBoard,
            {
              [classes.sampleBoardFocus]: isUserInputFocused,
            },
          )
        }
        >
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
          className={classes.userText}
          id={SAMPLE_BOARD_ID}
          value={userText}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    </div>
  )
}

export default withStyles(styles)(SampleBoard)
