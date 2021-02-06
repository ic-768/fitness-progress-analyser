const reducer = (accumulator, currentBlog) => {
  return accumulator + currentBlog.likes}

const totalLikes = (blogs) => {
  return blogs.reduce(reducer,0) }

const dummy = (blogs) => {
  return 1
}

module.exports = { totalLikes, dummy }
