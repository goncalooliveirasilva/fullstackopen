import { createSlice } from "@reduxjs/toolkit";

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    createBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      return state.filter(b => b.id !== action.payload)
    },
    updateBlog(state, action) {
      return state.map(b => b.id === action.payload.id ? action.payload : b)
    }
  }
})

export const { setBlogs, createBlog, removeBlog, updateBlog } = blogsSlice.actions
export default blogsSlice.reducer