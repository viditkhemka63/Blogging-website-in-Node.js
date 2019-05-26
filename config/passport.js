var passport = require('passport');
var LocalStrategy = require('passport-local');

var User = require('../models/user');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    //passReqToCallback : true // allows us to pass back the entire request to the callback
},(email, password, done) => {

            console.log('sign up passport execute');
            console.log(done);
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ email :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);
    
                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false);
                } else {
    
                    // if there is no user with that email
                    // create the user
                    var newUser = new User();
                    newUser.email =  email;
                    newUser.setPassword(password);
    
                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
    
            });    
    
            
}));

passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    //passReqToCallback: true
}, (email, password , done) => {
    User.findOne({email: email})
        .then(user => {
            //console.log(user);
            if(!user || !user.validatePassword(password)) {
                return done(null, false, { errors: { 'email or password': 'is invalid' } });
              }
            //console.log('before returning user');  
            return done(null, user);
        }).catch(done);
}));




