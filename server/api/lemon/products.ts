const slugStarter = 'plan-starter'
const slugPro = 'plan-premium'
const slugBusiness = 'plan-business'
let urlStater = ''
let urlPro = ''
let urlBusiness = ''

export default defineEventHandler(async (event) => {
  const user_id = event.context.user_id
  var myHeaders = new Headers()
  myHeaders.append('Accept', 'application/vnd.api+json')
  myHeaders.append('Content-Type', 'application/vnd.api+json')
  const config = useRuntimeConfig()
  myHeaders.append('Authorization', config.AUTH_HEADER)
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  }
  const call = await fetch(`https://api.lemonsqueezy.com/v1/products`, requestOptions)
  const resp = await call.json()

  const product = resp.data
  const productLink = `?checkout[custom][user_id]=${user_id}`

  for (let i = 0; i < product.length; i++) {
    if (product[i].attributes.slug === slugStarter) {
      urlStater = product[i].attributes.buy_now_url + productLink
    } else if (product[i].attributes.slug === slugPro) {
      urlPro = product[i].attributes.buy_now_url + productLink
    } else if (product[i].attributes.slug === slugBusiness) {
      urlBusiness = product[i].attributes.buy_now_url + productLink
    }
  }
  return {
    starter: urlStater,
    pro: urlPro,
    business: urlBusiness
  }
})