var
	RootWindow, Window;

RootWindow = function(aWindow) {

	if(Ti.Platform.name === "iphone"){
		Window = Ti.UI.iOS.createNavigationWindow({
			navBarHidden : true,
			window : aWindow
		});
	}
	else{
		Window = aWindow;
	}

	return Window;
};

module.exports = RootWindow;