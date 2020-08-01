// require("@babel/register");
require("@babel/polyfill");

require("@babel/register")({
	"presets": [
		"@babel/preset-env",
	],
	"plugins": [
		[
			"@babel/plugin-proposal-class-properties",
			{
				"loose": true
			}
		]
	]
});


var express = require('express');
var app = express();
var cors = require('cors')
app.use(cors());
app.options('*', cors()) 

const path = '../Complete-React-Developer-Course-master/';

require(path + '../Complete-React-Developer-Course-master/appBackEnd/makeSubscriptions');
const DISCOUNT_ON_PRODUCT = require('./appBackEnd/subject');

var common = require('./appBackEnd/emmiter/emit');
var commonEmitter = common.commonEmitter;
// commonEmitter.emit(DISCOUNT_ON_PRODUCT);

var Products = require('./appBackEnd/Products/Products');
var Customer = require('./appBackEnd/Customer/customerFactory');
var Billing = require('../Complete-React-Developer-Course-master/billing');


app.use(express.static('./Complete-React-Developer-Course-master'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + "/public/" + "index.html");
});

const firestore = require('./appBackEnd/firestore');
var db = firestore.db;
var { COLLECTION_NAME_DISCOUNT } = require('./appBackEnd/utils');



app.get('/showproducts', function (req, res, next) {
	var prod = new Products(0);

	prod.getProduct(0, function (products) {
		res.json(products);
	}).then(()=> {
	}).catch((reason) => {
			res.end(
				'Handle rejected promise (' + JSON.stringify(reason, 1) + ') here.'
			);
	});
})


app.get('/addproduct', function (req, res, next) {
	var param = req.query;

	var prod = new Products(
			0, 
			param.label,
			param.price,
			param.section,
			param.count, 
		);

		prod.save(function(data) {
			// res.end(data);
		}).then((a) => {}).catch((e)=> {
			// res.end(e);
		})

		res.end('')
})



app.get('/addsubscriber', function (req, res, next) {
	var param = req.query;

	if (['normal', 'premium'].indexOf(param.type)!== -1) {
		var customerFactory = new Customer();

		var customer = customerFactory.getCustomer(param.type)

		customer.setType(param.type);
		customer.setMail(param.Email);
		customer.setAction(param.action);
		customer.setSegment(param.subscription_segment);

		customer.addSubscriber(function (data) {
			// res.end(data);
		}).then((a) => { }).catch((e) => {
			// res.end(e);
		})
	}

		res.end('')
})


app.get('/publishdiscount', function (req, res, next) {
	var param = req.query;

	commonEmitter.emit(DISCOUNT_ON_PRODUCT, [param.percent, param.segment]);

	res.end('')
})


app.get('/generateBill', function (req, res, next) {
	var param = req.query;

	var fileData = {
		title: "CRWN CLOTHING",
		date: new Date().getTime(),
		name: "BhagawatDongre",
		age: 28,
		birthdate: "12/07/1990",
		course: "Computer Science",
	}

	fileData['price'] = param.price;
	
	let items = JSON.parse(param.item)

	fileData['items'] = items;

	let billing = new Billing()
	billing.generate(fileData, function(path) {
		// let rep = { url: path }
		res.download(path)

	});

})


app.get('/addDiscount', function (req, res, next) {
	var param = req.query;

	var saveObj = { expirydate: param.expirydate, forusertype: param.forusertype, percent: param.percent, segment: param.segment }

	console.log(saveObj);

	var ref = db.collection(COLLECTION_NAME_DISCOUNT).add(saveObj);

	ref.then(function (value) {
		console.log('add success discount');
		res.json(value);
		
	}).catch((reason) => {
		console.log('Handle rejected promise (' + reason + ') here.');
	});


	res.end('')
})

app.get('/getDiscounts', function (req, res, next) {
	var ref = db.collection(COLLECTION_NAME_DISCOUNT).get();


	ref.then(function (value) {
		var products = [];

		value.forEach((doc) => {
			products.push({
				id: doc.id,
				data: doc.data()
			});
		});

		console.log(products)
		res.send(products)

	}).catch(
		// Log the rejection reason
		(reason) => {
			console.log(
				'Handle rejected promise (' + JSON.stringify(reason) + ') here.'
			);
		});
})


var server = app.listen(2121, function () {
	debugger;
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at http://%s:%s", host, port)
})	