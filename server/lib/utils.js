import R from 'ramda'

export const resolvePath = R.unless(
  R.startsWith('/'),
  R.concat('/')
)

export const changeToArr = R.unless(
  R.is(Array),
  R.of
)
