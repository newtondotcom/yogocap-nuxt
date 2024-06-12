import constants from "~/lib/constants"
let urlStater = ''
let urlPro = ''
let urlBusiness = ''

export default defineEventHandler(async (event) => {
  const user_id = event.context.user_id
  const myHeaders = new Headers()
  myHeaders.append('Accept', 'application/vnd.api+json')
  myHeaders.append('Content-Type', 'application/vnd.api+json')
  const config = useRuntimeConfig()
  const key = config.LEMON_SQUEEZY_PROD ;
  myHeaders.append('Authorization', key)
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  }
  const call = await fetch(`https://api.lemonsqueezy.com/v1/products`, requestOptions)
  const resp = await call.json()

  const product = resp.data
  const productLink = `?checkout[custom][user_id]=${user_id}`

  for (let i = 0; i < product.length; i++) {
    if (product[i].attributes.name.includes(constants.NAME_PLAN_SLOW)) {
      urlStater = product[i].attributes.buy_now_url + productLink
    } else if (product[i].attributes.name.includes(constants.NAME_PLAN_MEDIUM)) {
      urlPro = product[i].attributes.buy_now_url + productLink
    } else if (product[i].attributes.name.includes(constants.NAME_PLAN_FAST)) {
      urlBusiness = product[i].attributes.buy_now_url + productLink
    }
  }
  return {
    starter: urlStater,
    pro: urlPro,
    business: urlBusiness
  }
})