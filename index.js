// Stock Market Portfolio App By Edward Velasco
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');

const PORT = process.env.PORT || 5000;



// API Key pk_8e5fb969df5b484da5e2fc52a592841a
// Secret sk_454a8faa419d4684b40dc070f6648a9c
// Create call_api function
function call_api(finishedAPI) {
	request('https://cloud.iexapis.com/v1/stock/aapl/quote/latestPrice?token=pk_8e5fb969df5b484da5e2fc52a592841a', { json: true }, (err, res, body) => {
	if (err) {return console.log(err);}
	if (res.statusCode === 200){
		console.log(body);
		finishedAPI(body);
		};
});
};

// request('https://cloud.iexapis.com/v1/stock/aapl/quote/latestPrice?token=pk_8e5fb969df5b484da5e2fc52a592841a', { json: true }, (err, res, body) => {
// 	if (err) {return console.log(err);}
// 	if (res.statusCode === 200){
// 		 console.log(body);
// 		//finishedAPI(body);
// 	};
// });



// Set Handlebars Middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff!";

// Set handlebar routes
app.get('/', function (req, res) {
	call_api(function(doneAPI) {
		res.render('home', {
		stock: doneAPI
		});
	});
	
});

// Set about page routes
app.get('/about.html', function (req, res) {
	res.render('about');
});



//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server Listening on port ' + PORT));
