var
	HomeWindow;
	
function HomeWindow() {
		
	var self = Ti.UI.createWindow({
		backgroundColor : "#3b5998",
		exitOnClose : true
	});

	return self;
}

module.exports = HomeWindow;