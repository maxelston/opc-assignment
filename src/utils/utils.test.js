import {timeConverter, findTopTenWords} from './utils'

describe('timeConverter', () => {
	it('returns a YYYY-MM-DD date', () => {
		const daysInThePast = 2
		const date = new Date(1629148910079)
		const desiredDate = timeConverter(date, daysInThePast)
		expect(desiredDate).toBe('2021-08-14')
	})
})

describe('findTopTenWords', () => {
	it('returns the top 10 occuring words', () => {
		const stories = ['Now then now then what do we have here then!?', 'Is it lots of $ or is it lots and lots and lots of words']
		expect(findTopTenWords(stories)[0].word).toBe('lots')
		expect(findTopTenWords(stories)[0].count).toBe(4)
	})
})
