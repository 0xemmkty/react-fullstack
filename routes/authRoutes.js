// passport: This is a popular middleware for authentication in Node.js applications. It provides various strategies for authenticating with different services 
// (like Google, Facebook, Twitter, etc.).
const passport = require('passport');

module.exports = app => {
  // '/auth/google': Defines the route for initiating Google authentication.
  // passport.authenticate('google', { scope: ['profile', 'email'] }): Uses the Google strategy in Passport to authenticate the user. 
  // The scope option specifies the information we want to retrieve from the user's Google account (profile information and email).
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
// '/auth/google/callback': This route is called by Google after the user has authenticated. It's the callback URL configured in the Google Developer Console.
// passport.authenticate('google'): This middleware handles the authentication response from Google.
// (req, res) => { res.redirect('/surveys'); }: If authentication is successful, the user is redirected to the /surveys page.
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
 // '/api/current_user': Defines a route to get the current authenticated user's information.
// res.send(req.user): Sends the current user information (if authenticated) back to the client. 
// req.user is populated by Passport with the authenticated user details.
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
