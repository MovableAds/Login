var
	LoginWindow;
	
function LoginWindow() {

	Facebook = require("facebook"),
	Facebook.permissions = [ "email", "public_profile", "user_friends" ];

	var self = Ti.UI.createWindow({
		backgroundColor : "#fff",
		exitOnClose : true
	});
	
	// self.add(Facebook.createLoginButton({
	    // top : 100,
        // style: Ti.Platform.name === "iphone"
            // ? Facebook.BUTTON_STYLE_WIDE
            // : 'wide'
	// }));

	var fbButton = Ti.UI.createButton({
	   title: 'Facebook Login',
	   top: 50,
	   width: 300,
	   height: 50
	});
 	self.add(fbButton);
 	
 	fbButton.addEventListener("click", function(){
 		Facebook.forceDialogAuth = true;
 		Facebook.authorize();
 	});

	if (Ti.Platform.name === 'android') {
	    self.fbProxy = Facebook.createActivityWorker({lifecycleContainer: self});
	}

	return self;
}

module.exports = LoginWindow;