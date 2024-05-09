import { getTransactions } from '~/server/data/account'
import { getVideos } from '~/server/data/videos'

export default defineEventHandler(async (event) => {
  const user_id = event.context.user_id

  /*
  const videos = [
    {
        name : "squeezie.mp4",
        date : "14/11/2023",
        lenght : "187",
        silent : "yes"
    },
    {
        name : "squeezie2.mp4",
        date : "14/11/2023",
        lenght : "187",
        silent : "yes"
    }
]
*/
const videos = getVideos(user_id)
/*
const transactions = [
  {
    date : "14/11/2023",
    plan : "Premium",
    value : "187",
  },
  {
    date : "14/11/2023",
    plan : "Premium",
    value : "187",
  },
]
*/
const transactions = getTransactions(user_id)

  return {
      videos,
      transactions
  }
})