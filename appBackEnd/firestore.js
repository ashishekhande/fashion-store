var admin = require("firebase-admin");
var serviceAccount = require("../js/cred/august-craft-248718-firebase-adminsdk-dr3s9-f86f4402ed.json");

var fb = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://august-craft-248718.firebaseio.com"
});

const db = admin.firestore();

module.exports.db = db;
