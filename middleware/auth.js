export default function ({ store, error }) {
  if (!store.state.user) {
    error({
      statusCode: 403,
      message: 'Please login'
    })
  }
}
