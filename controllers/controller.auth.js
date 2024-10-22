const getUserDetails = (req, res) => {
    // Logic to fetch and return user details
    res.send('User details response');
  };
  
  const logIn = (req, res) => {
    // Logic to handle login
    res.send('Login response');
  };
  
  const signIn = (req, res) => {
    // Logic to handle sign-up
    res.send('SignIn response');
  };

module.exports = {getUserDetails,logIn,signIn};