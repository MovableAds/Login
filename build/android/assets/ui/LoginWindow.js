function LoginWindow(){Facebook=require("facebook"),Facebook.permissions=["email","public_profile","user_friends"];var o=Ti.UI.createWindow({backgroundColor:"#fff",exitOnClose:!0}),e=Ti.UI.createButton({title:"Facebook Login",top:50,width:300,height:50});return o.add(e),e.addEventListener("click",function(){Facebook.forceDialogAuth=!0,Facebook.authorize()}),"android"===Ti.Platform.name&&(o.fbProxy=Facebook.createActivityWorker({lifecycleContainer:o})),o}var LoginWindow;module.exports=LoginWindow;