import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    display: 'inline',
    fontStyle: 'normal',
    color: theme.palette.grey[700],
  },
  done: {
    color: theme.palette.grey[400],
  },
  active: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  error: {
    color: theme.palette.error.main,
    backgroundColor: theme.palette.error.contrastText,
  },
})

function SampleBoardChar(props) {
  const {
    classes,
    className,
    cursorAt,
    index,
    char,
    userText,
  } = props

  // classes
  const done = (cursorAt > index)
  const active = (cursorAt === index)
  const error = (done && char !== userText.substring(index, index + 1))

  const letterToDisplay = (error) ? userText.substring(index, index + 1) : char

  return (
    <i className={
      classNames(
        classes.root,
        {
          [classes.done]: done,
          [classes.active]: active,
          [classes.error]: error,
        },
        className,
      )
    }
    >
      {letterToDisplay}
    </i>
  )
}

export default withStyles(styles)(SampleBoardChar)
