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
    }
  }
})

export const { setBlogs, createBlog } = blogsSlice.actions
export default blogsSlice.reducer