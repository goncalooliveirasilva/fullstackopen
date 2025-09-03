import { CancelButton, NewBlogButton } from './StyledButtons.styles'
import { useState, useImperativeHandle } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(props.ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <NewBlogButton onClick={toggleVisibility}>
          {props.buttonLabel}
        </NewBlogButton>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <CancelButton onClick={toggleVisibility}>Cancel</CancelButton>
      </div>
    </div>
  )
}

export default Togglable
