export const arrayChunks = (array, chunkSize) =>
  Array(Math.ceil(array.length / chunkSize)).fill().map((_, index) =>
    index * chunkSize).map(begin =>
      array.slice(begin, begin + chunkSize))

export const dynamicSort = property => {
   return function(a, b) {
       return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
   }
}

export const findTopTenWords = stories => {
  const words = stories.join(' ').split(/\b/)
  let wordCount = {}
  for(const word of words) {
    wordCount['_' + word.toLowerCase()] = (wordCount['_' + word.toLowerCase()] || 0) + 1
  }

  let orderedWordCount = []
  for(const word in wordCount) {
    const isWord = /^[a-zA-Z]+$/.test(word.replace(/_/g, ''))
    isWord && orderedWordCount.push({word: word.replace(/_/g, ''), count: wordCount[word]})
  }
  const sortedWordCount = orderedWordCount.sort(dynamicSort('word')).sort(dynamicSort('count'))
  const topTenWords = sortedWordCount.reverse().slice(0, 10)
  return topTenWords
}

export const timeConverter = (timestamp, daysToSubtract) => {
	var d = new Date(timestamp - daysToSubtract * 24 * 60 * 60 * 1000),
		yyyy = d.getFullYear(),
		mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
		dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
		time
	// ie: 2013-02-18, 8:35 AM
	time = yyyy + '-' + mm + '-' + dd
	return time
}
