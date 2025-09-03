import styled from 'styled-components'

export const BaseButton = styled.button`
  font-size: 15px;
  margin: 1px;
  padding: 2px 8px;
  border-radius: 3px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
`

export const CreateBlogButton = styled(BaseButton)`
  border: 2px solid darkorange;
  color: white;
  background-color: darkorange;
  &:hover {
    background-color: white;
    color: darkorange;
  }
`

export const CancelButton = styled(BaseButton)`
  border: 2px solid darkred;
  color: white;
  background-color: darkred;
  &:hover {
    background-color: white;
    color: darkred;
  }
`

export const LogoutButton = styled(BaseButton)`
  border: 2px solid crimson;
  color: white;
  background: crimson;
  &:hover {
    background-color: white;
    color: crimson;
  }
`

export const NewBlogButton = styled(BaseButton)`
  border: 2px solid green;
  color: white;
  background-color: green;
  &:hover {
    background-color: white;
    color: green;
  }
`

export const LikeButton = styled(BaseButton)`
  border: 2px solid darkcyan;
  color: white;
  background-color: darkcyan;
  &:hover {
    background-color: white;
    color: darkcyan;
  }
`
