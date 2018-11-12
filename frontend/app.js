const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const Auth0Strategy = require('passport-auth0')

const credsAuth0 = {
    domain: 'amadealz.auth0.com',
    clientID: 'ghu2kM5kF5wb1qssWiltiUKZFv6Mvp3P',
    clientSecret: 'ZiLTKooiRnh07SyE2LqLA8TM657RuyEXP-Tlbjalcg2ZGIa4I59QeIyQaAu0jNNf',
    callbackURL: process.env.AUTH0_CALLBACK_URL ||'http://localhost:3000/callback'
}

const strategy = new Auth0Strategy(
    credsAuth0,
    function (accessToken, refreshToken, extraParams, profile, done) {
        return done(null, profile)
    }
)

passport.use(strategy)

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(
    session({
        secret: 'my_secret_key',
        resave: true,
        saveUninitialized: true
    })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
    res.locals.loggedIn = false;

    if (req.session.passport && typeof req.session.passport.user != 'undefined') {
        res.locals.loggedIn = true
    }

    next()
})

app.get('/', function (req, res, next) {
    res.render('index')
})

app.get('/login', passport.authenticate({
    clientID: credsAuth0.clientID,
    domain: credsAuth0.domain,
    redirectUri: credsAuth0.callbackURL,
    responseType: 'code',
    audience: 'https://amadealz.auth0.com/userinfo/',
    scope: 'openid profile'}),

    function (req, res) {
        res.redirect('/')
    }
)

app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
})

app.get('/callback', passport.authenticate({
    failureRedirect: '/failure'
}),
    function (req, res) {
        res.redirect('/user')
    }
)

app.get('/user', function (req, res, next) {
    res.render('user', {
        user: req.user
    })
})

app.get('/failure', function (req, res, next) {
    res.render('failure')
})

app.listen(3000, function () {
    console.log('Your server is running on Port 3000');
})