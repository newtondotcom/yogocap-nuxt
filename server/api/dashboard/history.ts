import { getTransactions } from '~/server/data/account'
import { getVideosHistory } from '~/server/data/videos'

export default defineEventHandler(async (event) => {
  const user_id = event.context.user_id
  const videos = await getVideosHistory(user_id)
  const transactions = await getTransactions(user_id)

  return {
      videos,
      transactions
  }
})