import { getVideos } from '~/server/data/videos'
import type { Video } from "~/types/types"

/*
const videos: Video[] = [
  {
          minia : "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
          name : "squeezie.mp4",
          date : "10th Oct 2022",
          cost : 200,
          duration : 187,
          type : "success"
        },
        {
            minia : "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            name : "squeezie.mp4",
            date : "10th Oct 2022",
            cost : 200,
            duration : 187,
            type : "success"
          },
          {
            minia : "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            name : "squeezie.mp4",
            date : "10th Oct 2022",
            cost : 200,
            duration : 187,
            type : "success"
          },
          {
            minia : "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            name : "squeezie.mp4",
            date : "10th Oct 2022",
            cost : 200,
            duration : 187,
            type : "success"
          },        {
            minia : "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            name : "squeezie.mp4",
            date : "10th Oct 2022",
            cost : 200,
            duration : 187,
            type : "success"
          },
          {
            minia : "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            name : "squeezie.mp4",
            date : "10th Oct 2022",
            cost : 200,
            duration : 187,
            type : "success"
          },
          {
            minia : "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            name : "squeezie.mp4",
            date : "10th Oct 2022",
            cost : 200,
            duration : 187,
            type : "success"
          },
          {
              minia : "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
              name : "squeezie.mp4",
              date : "10th Oct 2022",
              cost : 200,
              duration : 187,
              type : "success"
            },
            {
              minia : "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
              name : "squeezie.mp4",
              date : "10th Oct 2022",
              cost : 200,
              duration : 187,
              type : "success"
            },
            {
              minia : "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
              name : "squeezie.mp4",
              date : "10th Oct 2022",
              cost : 200,
              duration : 187,
              type : "success"
            },        {
              minia : "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
              name : "squeezie.mp4",
              date : "10th Oct 2022",
              cost : 200,
              duration : 187,
              type : "success"
            },
            {
              minia : "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
              name : "squeezie.mp4",
              date : "10th Oct 2022",
              cost : 200,
              duration : 187,
              type : "success"
            },
      ]
      */

export default defineEventHandler(async (event) => {
  const user_id = event.context.user_id
  const videos = await getVideos(user_id)
  return {
      pvideos: videos
  }
})