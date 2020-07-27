import { db } from 'lib/db'

export default async (req, res) => {
  // Response will be JSON in all cases
  res.setHeader('Content-Type', 'application/json')

  // Fetch All Content Types from Firestore
  const highscores = []
  try {
    const highscoreData = await db.collection('highscores').orderBy('score').limit(5).get()
    highscoreData.forEach(highscore => {
      highscores.push(highscore.data())
    })
  } catch (error) {
    res.statusCode = 500
    return res.end(JSON.stringify({ message: 'Error occured whilst getting highscores from Firestore', error, code: 500 }))
  }

  res.statusCode = 200
  return res.end(JSON.stringify(highscores))
}