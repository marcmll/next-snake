// Dependencies
const firebase = require('firebase-admin')

// Initialise Firestore
const serviceAccount = require('../service-account-key.json')
if (!firebase.apps.length) {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
  })
}

// Export db
exports.db = firebase.firestore()
