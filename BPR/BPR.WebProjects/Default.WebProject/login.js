function showUserid(dlgObj) { 

	var obj = dlgObj.getControl('blLoginOptions');
	
	var val = obj.value;
	val = val.toString()
	
	dlgObj.setControlDisplay('Userid',false);
	dlgObj.setControlDisplay('Password',false);
	
	if(val != '') {
		if(val != 'userid') { 
		
			dlgObj.setControlDisplay('HYPERLINK_FORGOTPASSWORD',false);
			dlgObj.setControlDisplay('HYPERLINK_CREATEACCOUNT',false);
			
			
		} 
		
		if(val == 'userid') { 
			if(dlgObj.____haspasswordReset) { 
				dlgObj.setControlDisplay('HYPERLINK_FORGOTPASSWORD',true);
			}
			if(dlgObj.____hascreateAccount) { 
				dlgObj.setControlDisplay('HYPERLINK_CREATEACCOUNT',true);
			}

		
		}
	}
	
	if(val == 'userid' || val == 'firebase') {
		dlgObj.setControlDisplay('Userid',true);
		dlgObj.setControlDisplay('Password',true);
		
	}
}

cognitoLogout = function(dlgObj) { 
	var obj = dlgObj.__cognitoSettings;
	var ele = dlgObj.getPointer('container_login'); if(ele) ele.style.display = 'none';
	var ele = dlgObj.getPointer('CONTAINER_LOGGINGIN'); if(ele) ele.style.display = 'none';
	var ele = dlgObj.getPointer('CONTAINER_LOGGINGOUT'); if(ele) ele.style.display = '';
	var url = location.href
	var txt = url 
	txt = txt.replace('//','dblslash')
	txt = txt.split('/')
	txt.pop()
	txt = txt.join('/');
	txt = txt.replace('dblslash','//')
	txt = txt + '/__a5CognitoLogin.a5w';
	txt = url 
	txt = txt.split('?')[0]
	var obj = dlgObj.__cognitoSettings 
	var url = obj.cognito_domain + '/logout?client_id='+obj.cognito_client_id+'&response_type=code&state=logoutComplete&scope=email+openid+phone&logout_uri=' + txt + '&redirect_uri=' + txt;
	location.href = url ;
	var ele = dlgObj.getPointer('container_login'); if(ele) ele.style.display = ''
	var ele = dlgObj.getPointer('CONTAINER_LOGGINGIN'); if(ele) ele.style.display = 'none';
	var ele = dlgObj.getPointer('CONTAINER_LOGGINGOUT'); if(ele) ele.style.display = 'none';
}

logout = function(dlgObj) { 
	//dlgObj.__firebaseLogin
	
	var flagLoggedinUsingCognito = dlgObj._loggedInUsingCognito;
	delete dlgObj._loggedInUsingCognito;
	if(typeof flagLoggedinUsingCognito == 'undefined') flagLoggedinUsingCognito = false;
	var loginpanel = dlgObj._afterLogin.loginPanel
	if(dlgObj.__firebaseLogin) { 
		//delete dlgObj.__firebaseLogin
		var fs = dlgObj.__firestoreClient;
		if(typeof fs != 'undefined') { 
			
			dlgObj.firestoreLogout({silent:false})
			dlgObj.panelSetActive(loginpanel)
		};
		return;
	}
	if(!flagLoggedinUsingCognito && !dlgObj.__firebaseLogin) {
		dlgObj.logout(false); 
		;
		
	}
	var obj = dlgObj.__cognitoSettings;
	if(!obj || typeof obj == 'undefined') return;
	var title = 'Confirm Logout';
	var msgBody = 'Do you also want to log out of Cognito?';
	var width = '400px';
	var loc = 'top';
	var oKButtonLabel = 'Yes';
	var cancelButtonLabel = 'No';
	var onOK = function() { 
		dlgObj._functions.cognitoLogout()
		dlgObj.logout(false);
		dlgObj.panelSetActive(logoutpanel)
	}
	var onCancel = function() { 
		dlgObj.logout(false);
	};
	if(flagLoggedinUsingCognito) { 
		dlgObj.dropDownMessage('confirm',title,msgBody,width,oKButtonLabel,cancelButtonLabel,onOK,onCancel,loc,'','&nbsp;');
		var ele = dlgObj.getPointer('container_login'); if(ele) ele.style.display = 'none';
		var ele = dlgObj.getPointer('CONTAINER_LOGGINGIN'); if(ele) ele.style.display = 'none';
		var ele = dlgObj.getPointer('CONTAINER_LOGGINGOUT'); if(ele) ele.style.display = '';
	}
}




//////////////////these function are used in a Cordova app to support the Login with Google feature
function cordovaWeblientId(dlgObj,id) {
	dlgObj.__webClientId  = id //'Insert the Web Client Id here';
}

cordovaLogoutGoogle = function() { 
	window.plugins.googleplus.disconnect(
	    function (msg) {},
	    function(msg) {}
	)
}



cordovaLoginWithGoogle = function() { 
	
	var webClientId = dlgObj.__webClientId;
	window.plugins.googleplus.login(
		{
			 'webClientId': webClientId
		},
		function (obj) {
			var eventName = 'afterCordovaLoginWithGoogle'
			dlgObj._executeEvent(eventName, {email:obj.email, googleObject: obj})

			var arr = [];
			arr.push( A5.ajax.buildURLParam('_email',obj.email) );
			arr.push( A5.ajax.buildURLParam('_googleobj',JSON.stringify(obj)) );
			var data = arr.join('&');
			dlgObj.ajaxCallback('','','system:logUserInAfterGoogleAuth','',data)
			
			
		},
		function (msg) {
			alert('Login error: '+msg);
		}
	)
	
	
	
}


function loginButton(dlgObj) { 

//Reminder: You must check the 'Has integrated login functionality' property on the Properties pane.
delete dlgObj._loggedInUsingCognito;
delete dlgObj._loggedInUsingGoogle;
delete dlgObj.__firebaseLogin
var obj = dlgObj.getControl('login');
if(obj) { 
	var uid = obj.data.user;
	var pw = obj.data.password;
	var val = obj.data.blLoginOptions
} else { 
	var uid = dlgObj.getValue('userid')
	var pw = dlgObj.getValue('password')
	var obj = dlgObj.getControl('blLoginOptions');
	var val = obj.value
}



if(val == 'userid') { 
	dlgObj.login(1)
}
if(val == 'firebase') { 
	dlgObj.__firebaseLogin = true;
	
	
	
	if(uid == '' || pw == '') { 
		var ele = dlgObj.getPointer(dlgObj._loginSettings.loginErrorMessagePlaceholder)
		var msg = '<span style="color:red;">Invalid userid or password</span>';
		ele.innerHTML = msg;
	} else { 
		dlgObj.firestoreLogout({silent:true});
		dlgObj.firestoreLogin(uid,pw);
	}
}

if(val == 'google') { 
	var loc = location.href;
	
	dlgObj._loggedInUsingGoogle = true;
	if(loc.indexOf('?nologin') > -1 || loc.indexOf('?mode=logout') > -1 ) {
		alert('You must first reload the page without the \'?nologin or ?mode=logout\' query string before you can login with Google.');
	} else {  
		if(typeof cordova == 'object' ) { 
			var flagGooglePlusLoaded = true;
			try{ 
				var __type = typeof window.plugins.googleplus
			}
			catch(e) { flagGooglePlusLoaded = false; }
			if(flagGooglePlusLoaded) { 
				var webClientId =  dlgObj.__webClientId;
				
				if(typeof webClientId == 'undefined' || webClientId == '' || (typeof webClientId != 'undefined' &&  webClientId.indexOf('Insert') == 0) ) { 
					alert('Could not login as the Web Client Id is not defined') 
				} else { 
					
					if(dlgObj.__afterLogin && dlgObj.__afterLogin.toLowerCase() == 'redirecttotargetpage') { 
						alert('Cordova apps do not support \'RedirectToTargetPage\' in the after login behavior action');
					} else { 
						//alert('do cordova google login here');
						cordovaLoginWithGoogle(dlgObj);
						//cordovaLogin();
					}
				}
			} else { 

				alert('Cordova app but the googleplus plugin was not loaded');
			}
				//alert('login with Google not available in a Cordova application') 
		} else { 
			var txt = location.href;
			txt = txt.split('/');
			txt[txt.length-1] = '';
			var machine = txt.join('/');
			if(dlgObj._embeddedMode) { 
				alert('login with Google not available in Working Preview');
			} else { 
				if(location.href.indexOf('/LivePreview/') > -1) { 
					alert('login with Google not available in LivePreview');
				} else { 
					var href = 'https://accounts.google.com/o/oauth2/v2/auth?scope=email&prompt=consent&include_granted_scopes=true&response_type=code&state=MyOriginalSessionId1&redirect_uri='+machine+'mycallbackpage.a5w&client_id=' + dlgObj.__clientid;
					var href = 'https://accounts.google.com/o/oauth2/v2/auth?scope=email&prompt=consent&include_granted_scopes=true&response_type=code&state=MyOriginalSessionId1&redirect_uri='+machine+'__a5LoginWithGoogle.a5w&client_id=' + dlgObj.__clientid;
					//window.googlewin = window.open(href,'googlelogin','popup=yes')
					//do not open login page in a window - otherwise have problem with session variables on alpha cloud
					
					
					window.location = href
				}
			}
		}
	}

}

if(val == 'cognito') { 
	var url = location.href
	//{dialog.object}.ajaxCallback('','','xbsetSessionvar','','__url=' + url)
	var txt = url 
	txt = txt.replace('//','dblslash')
	txt = txt.split('/')
	txt.pop()
	txt = txt.join('/');
	txt = txt.replace('dblslash','//')
	txt = txt + '/__a5CognitoLogin.a5w';
	var obj = dlgObj.__cognitoSettings 
	//txt = "https://www.google.com"
	dlgObj._loggedInUsingCognito = true;
	var url = obj.cognito_domain + '/login?client_id='+obj.cognito_client_id+'&response_type=code&scope=email+openid+phone&redirect_uri=' + txt + '&state=' + location.href
	console.log(url)
	location.href = url ;
}
}

function onFirebaseLogin(e,dlgObj) { 
var ele = dlgObj.getPointer('LOGIN_ERRORS_FIREBASE');

//alert('on firestor login 333 dlgObj.__firebaseLogin;' +dlgObj.__firebaseLogin)
//if(e.isLoggedIn == false) { 
//alert('stay on login panel');
//return;
//}
var forceLogout = dlgObj.__forceLogout
if(typeof forceLogout == 'undefined') forceLogout = false;

//alert('1111111 e.isLoggedIn:' + e.isLoggedIn + '  dlgObj.__firebaseLogin;' +dlgObj.__firebaseLogin)
//if(forceLogout) e.isLoggedIn = false;
if(e.isLoggedIn && dlgObj.__firebaseLogin ) { 
	var msg = 'logged in';
	dlgObj.__firebaseLogin = false;
	dlgObj._securityForgotPasswordCancel()
	var arr= [];
	
	arr.push( A5.ajax.buildURLParam('__email',e.email) );
	arr.push( A5.ajax.buildURLParam('__uid',e.uid) );
	arr.push( A5.ajax.buildURLParam('__refreshToken',e.refreshToken) );
	
	arr.push( A5.ajax.buildURLParam('__token',e.accessToken) )
	arr.push( A5.ajax.buildURLParam('__refreshToken',e.refreshToken) )
	arr.push( A5.ajax.buildURLParam('__alias',dlgObj.dialogId) )
	
	var queryString = arr.join('&');
	
	//alert('complete login with firebase: ' + queryString);
	//dlgObj.ajaxCallback('','','a5dialogHelper_completeLoginwithFirebase','',queryString)
	dlgObj.ajaxCallback('','','system:completeLoginwithFirebase','',queryString)
} else { 
//alert('not logged in')
	var _error = e.error 
	try{ 
		_error = JSON.parse(_error).error.message;
		_error = _error.split('_').join(' ');
	}catch(e) { }
	var msg = '<span style="color:red;">'+_error+'</span>';
	}if(typeof _error == 'undefined') msg = '';

	ele.innerHTML = msg; 

}