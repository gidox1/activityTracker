# activityTracker

To Start:
Run npm start to start server

The app uses Json as a datastore so we start json-server 
Run json-server --watch src/db.json 

Endpoints: 
host: localhost:9000/track/register POST
body {
	"name": "Eden Hazard",
	"phone": "+32334556664",
	"country": "India",
	"city": "Delhi",
	"password": "yeyyeye",
	"email": "ed10@gmail.com",
	"type": "register"
}

localhost:9000/track/login POST
body: {
	"email": "lm@gmail.com",
	"password": "yeyyeye",
	"type": "login"
}

localhost:9000/track/product/like-product
body {
	"product": [{
      "sku": "R35749923055",
      "category": "home and appliance",
      "price": 15000,
      "weight": 2,
      "quantity": 10,
      "name": "cooking gas"
    }],
    "access_token": "" 
}

localhost:9000/track/product/add-to-cart
body: {
	"product": [{
      "sku": "R35749923055",
      "category": "home and appliance",
      "price": 15000,
      "weight": 2,
      "quantity": 10,
      "name": "cooking gas"
    },
    {
      "sku": "R222990023055",
      "category": "home and appliance",
      "price": 1000,
      "weight": 0.3,
      "quantity": 1,
      "name": "cooking pot"
    }],
    "type": "add_to_cart",
    "cart": {
    	"id": 245678,
    	"items": 2
    },
    "access_token": "" 
}