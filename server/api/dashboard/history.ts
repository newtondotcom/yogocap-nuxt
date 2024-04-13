import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)


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

  return {
      videos,
      transactions
  }
})