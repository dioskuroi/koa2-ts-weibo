import seq from './seq'

// import './model'
// * test link
seq.authenticate().then(() => {
  // eslint-disable-next-line no-console
  console.log('auth ok')
}).catch(() => {
  // eslint-disable-next-line no-console
  console.log('auth error')
})

// * sync database
seq.sync({ force: true }).then(() => {
  // eslint-disable-next-line no-console
  console.log('sync ok')
  process.exit()
})
