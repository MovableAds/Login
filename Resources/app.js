Ti.UI.setBackgroundColor("#fff");

var 
	RootWindow = require("/ui/RootWindow"),
	Cloud = require('ti.cloud'),
	Facebook = require("facebook");

Facebook.initialize(1000);
Facebook.permissions = [ "email", "public_profile", "user_friends" ];

Facebook.addEventListener('login', function(e) {
    appStart();
});
Facebook.addEventListener('logout', function(e) {
	appStart();
});

function appStart() {
	
	if (Facebook.getLoggedIn()) {
		
		console.log("fbLoggedIn");

		Cloud.SocialIntegrations.externalAccountLogin({
		    type: 'facebook',
		    token: Facebook.accessToken
		}, function (arrow) {
		    if (arrow.success) {
		        
		        //var user = e.users[0]; //User object via ArrowDB
		        
				Facebook.requestWithGraphPath("/me", { fields: "id, name, first_name, middle_name, last_name, email, picture" }, "GET", function(e) {
				    if (e.success) {
				        
				        var result = JSON.parse(e.result);
				        
				        console.log("User Login Success");
				        alert(result.name + "(" + result.id + ")" + "\n" + result.email + "\n" + result.picture.data.url);
				    	
				    	var data = {
						    email: result.email,
						    first_name: result.first_name,
						    last_name: result.last_name,
						    custom_fields: {
						        facebook_id: result.id,
						        facebook_pic: result.picture.data.url
						    }
				    	};
				        Cloud.Users.update(data, function (e) {
				            if (e.success) {
				                console.log('User Info Updated');
				            }
				        });
				        
				    } else if (e.error) {
				        console.log("Error: \n" + e.error);
				    } else {
				        console.log('Unknown response');
				    }
				});
		    } else {
		        alert('Error:\n' +
		            ((arrow.error && arrow.message) || JSON.stringify(arrow)));
		    }
		});
		
		var HomeWindow = require("/ui/HomeWindow");
		appRoot = new RootWindow(new HomeWindow());
		appRoot.open();
	
	} else {
		
		console.log("fbNotLoggedIn");
		
		var LoginWindow = require("/ui/LoginWindow");		
		appRoot = new RootWindow(new LoginWindow());
		appRoot.open();
	}
}

appStart();