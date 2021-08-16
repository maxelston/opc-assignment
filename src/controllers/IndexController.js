import {Router} from 'express'
import fetch from 'node-fetch'
import {timeConverter, arrayChunks, findTopTenWords} from '../utils/utils'
export const IndexController = Router()

const daysInThePast = 2
const desiredDate = timeConverter(Date.now(), daysInThePast)

const getStoryIds = async () => {
  const url = 'https://hacker-news.firebaseio.com/v0/topstories.json'
	const response = await fetch(url)
	const arr = await response.json()
	return arr
}

const fetchStories = async (storyIds) => {
  let stories = []
  for (const storyId of storyIds) {
    const url = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
    await fetch(url).then(async response => {
      if (response.ok) {
        const story = await response.json()
        const storyDatePublished = timeConverter(story.time * 1000, 0)
        const chosenStory = storyDatePublished === desiredDate && story
        chosenStory && stories.push(story.title)
      } else {
        console.error('Something went wrong')
      }
    })
  }
  return stories
}

const findStories = async () => {
  console.log('Fetching story IDs')
	const storyIds = await getStoryIds()
  console.log('Story IDs fetched!')

  const chunkSize = 25
  const storyIdChunks = arrayChunks(storyIds, chunkSize)

  console.log(`Fetching stories from ${desiredDate}`)
  let combinedStoryChunks = []
  await Promise.allSettled(storyIdChunks.map(storyIdChunk =>
    fetchStories(storyIdChunk))).then(result =>
      combinedStoryChunks = result
  )

  const flattenCombinedStoryChunks = combinedStoryChunks.map(c => c.value)
  const stories = [].concat.apply([], flattenCombinedStoryChunks)
  return stories
}

IndexController.get('/', async (req, res, next) => {
	try {
		const stories = await findStories()
		console.log(`Fetched ${stories.length} stories`)
    // Regex removes whitespace
    const topTenWords = findTopTenWords(stories)

		res.status(200).send({ data: topTenWords})
	} catch (e) {
		next(e)
	}
})
