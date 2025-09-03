import styled from 'styled-components'

export const Input = styled.input`
  padding: 5px 10px;
  margin-right: 5px;
  margin-left: 5px;
  border: 2px solid burlywood;
  border-radius: 20px;
  outline: none;
  font-size: 15px;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3 ease;
  &:hover {
    border-color: dark;
  }
  &:focus {
    border-color: dark;
    box-shadow: 0 0 5px rgba(0, 119, 204, 0.5);
  }
`
