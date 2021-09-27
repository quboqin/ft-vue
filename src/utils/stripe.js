// eslint-disable-next-line no-undef
export const stripe = Stripe(
  process.env.VUE_APP_ONLINE_PAYMENT === '1'
    ? 'pk_live_51HZCSNLZTTlHwkSOdYTRnFdh0AxF7JNwXShbMrKfEPzxnXLPzGz0hXJJzKxybnWngvF89FKJRXxnr2fo8zpNlZ5700Nm864NNM'
    : 'pk_test_GrY8g9brTmOaRZ6XKks0woG0',
)

export const elements = stripe.elements()

const elementStyles = {
  base: {
    color: '#32325D',
    fontWeight: 500,
    fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
    fontSize: '16px',
    fontSmoothing: 'antialiased',

    '::placeholder': {
      color: '#CFD7DF',
    },
    ':-webkit-autofill': {
      color: '#e39f48',
    },
  },
  invalid: {
    color: '#E25950',

    '::placeholder': {
      color: '#FFCCA5',
    },
  },
}

const elementClasses = {
  focus: 'focused',
  empty: 'empty',
  invalid: 'invalid',
}

// export const cardIBan = elements.create('iban', {
//   ...{
//     style: elementStyles,
//     classes: elementClasses,
//   },
//   ...{
//     supportedCountries: ['SEPA'],
//     placeholderCountry: 'US',
//     hideIcon: true,
//   },
// })

export const cardNumber = elements.create('cardNumber', {
  style: elementStyles,
  classes: elementClasses,
})

export const cardExpiry = elements.create('cardExpiry', {
  style: elementStyles,
  classes: elementClasses,
})

export const cardCvc = elements.create('cardCvc', {
  style: elementStyles,
  classes: elementClasses,
})
