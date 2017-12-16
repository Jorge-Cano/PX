var path = require('path')
var funcs = require('./funcs')
var encodeName = funcs.encodeName

var session = {
  username: process.argv[2],
  lastMessageHash: process.argv[3]
}

if (!session.username || !session.lastMessageHash) {
  console.log('node index.js <username> <hash>')
  process.exit(0)
}
// 2cd6ee2c70b0bde53fbe6cac3c8b8bb1

//currently executing the following message in cli
// from: @theRealElmo
// ---
// �w^~)�

//try a combination from the db files & pay attention to their end character
// 60b725f10c9c85c70d97880dfe8191b3 first
// file #1 aGVyZSdzIHRoZSBtZXNzYWdl
// file #2 aGVsbG8sIEkgd291bGQgbGlrZSB5b3UgdG8gam9pbiBteSBwcm9mZXNzaW9uYWwgbmV0d29yayBvbiBsaW5rZWRpbg==
// file #3 bmV3IHBob25lIHdobyBkaXM/
// file #4 c2VjcmV0IG1lc3NhZ2UgZnJvbSBtZSB0byB5b3U=

// 1. load the database
var dbFile = path.join(__dirname, 'db', 'index.json')
funcs.loadDb(dbFile, function (err, db) {

  // 2. encode the name
  var encoded = encodeName(session.username)

  // 3. find the user's inbox
  var inbox = funcs.findInbox(db, encoded)

  // 4. find the next message
  var nextMessage = funcs.findNextMessage(inbox, session.lastMessageHash)

  // 5. print out the message.
  // Paste the console output into the "Solution" field and you're done!
  console.log(nextMessage)
})
