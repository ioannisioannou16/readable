
const toLocalTime = (timestamp) => (
  new Date(timestamp).toLocaleString('en-GB', { minute: '2-digit', hour: '2-digit', day: 'numeric', month: 'long', year: 'numeric' })
)

export default toLocalTime