import { getVideos } from '~/server/data/videos'

export default defineEventHandler(async (event) => {
  const user_id = event.context.user_id
  const videos = await getVideos(user_id)
  return {
      pvideos: videos
  }
})