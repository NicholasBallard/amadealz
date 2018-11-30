// Handle user authentication with Auth0

window.addEventListener('load', function () {
  var theWebAuth = new auth0.WebAuth({
    domain: '',
    clientID: '',
    redirectUri: '',
    responseType: 'token id_token',
    scope: 'openid',
    leeway: 60
  })

  // DOM element variables for buttons
  // and event listeners on click
  
  function setSession() {
    
  }
  
  function logOut() {
    
  }
  
  function isAuthenticated() {
    
  }

  function handleTheAuthentication() {
    
  }

  function displayTheButtons() {

  }

  handleAuthentication()
})