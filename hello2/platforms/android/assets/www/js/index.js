var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

};
    
    //GEOLOCATION


    var options = {
        enableHighAccuracy: true,
        timeout: 50000,
        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;

        console.log('Your current position is:');
        console.log('Latitude : ' + crd.latitude);
        console.log('Longitude: ' + crd.longitude);
        console.log('More or less ' + crd.accuracy + ' meters.');
        $('#gpsPos').text("latitude=" + crd.latitude + "longitude=" + crd.longitude);
    };

    function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    };

    $('#getGpsPos').click(function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error, options);
        }
        else{
            $('#gpsPos').text("Geolocation is not supported by this browser.");
        }
    });

    //FACEBOOK LOGIN para paginas web
/*
    window.fbAsyncInit = function() {
          FB.init({
            appId      : 501908143218766,
            status     : true, // check login status
            cookie     : true, // enable cookies to allow the server to access the session
            xfbml      : true  // parse XFBML
          });

          // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
          // for any authentication related change, such as login, logout or session refresh. This means that
          // whenever someone who was previously logged out tries to log in again, the correct case below 
          // will be handled. 
          FB.Event.subscribe('auth.authResponseChange', function(response) {
            // Here we specify what we do with the response anytime this event occurs. 
            if (response.status === 'connected') {
              // The response object is returned with a status field that lets the app know the current
              // login status of the person. In this case, we're handling the situation where they 
              // have logged in to the app.
              testAPI();
            } else if (response.status === 'not_authorized') {
              // In this case, the person is logged into Facebook, but not into the app, so we call
              // FB.login() to prompt them to do so. 
              // In real-life usage, you wouldn't want to immediately prompt someone to login 
              // like this, for two reasons:
              // (1) JavaScript created popup windows are blocked by most browsers unless they 
              // result from direct interaction from people using the app (such as a mouse click)
              // (2) it is a bad experience to be continually prompted to login upon page load.
              FB.login();
            } else {
              // In this case, the person is not logged into Facebook, so we call the login() 
              // function to prompt them to do so. Note that at this stage there is no indication
              // of whether they are logged into the app. If they aren't then they'll see the Login
              // dialog right after they log in to Facebook. 
              // The same caveats as above apply to the FB.login() call here.
              FB.login();
            }
          });
          };

          // Load the SDK asynchronously
          (function(d){
           var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
           if (d.getElementById(id)) {return;}
           js = d.createElement('script'); js.id = id; js.async = true;
           js.src = "http://connect.facebook.net/en_US/all.js";
           ref.parentNode.insertBefore(js, ref);
          }(document));

          // Here we run a very simple test of the Graph API after login is successful. 
          // This testAPI() function is only called in those cases. 
          function testAPI() {
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function(response) {
              console.log('Good to see you, ' + response.name + '.');
            });
          }

    //FACEBOOK LOGOUT
    $('#logoutFacebook').click(function() {
        var a = FB.logout();
        //setTimeout("location.reload()",2000);
    });*/

    //FACEBOOK LOGIN APPS

    // Settings
    FacebookInAppBrowser.settings.appId = '501908143218766';
    FacebookInAppBrowser.settings.redirectUrl = 'http://localhost/www/index.html';
    FacebookInAppBrowser.settings.permissions = 'email';

    // callbacks already defined
    $('#signInFacebook').click(function() {
        FacebookInAppBrowser.login(
            {
              send: function() {
                  console.log('login opened');
              },
              success: function(access_token) {
                  console.log('done, access token: ' + access_token);
              },
              denied: function() {
                  console.log('user denied');
              },
              complete: function(access_token) {
                  console.log('window closed');
                  if(access_token) {
                      console.log(access_token);
                  } else {
                      console.log('no access token');
                  }
              },
              userId: function(userId) {
                  if(userId) {
                      console.log(JSON.stringify(userId));
                  } else {
                      console.log('no user id');
                  }
            }
        });
    });

    $('#invite').click(function() {
        FacebookInAppBrowser.invite(inviteText, callback);
    });

    $('#logoutFacebook').click(function() {
        FacebookInAppBrowser.logout(callback);
    });

    