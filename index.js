require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var http = require('http');
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
const helmet = require('helmet');
var urlencodedParser = require('urlencoded-parser')




// parse application/x-www-form-urlencoded
app.use( bodyParser.urlencoded( { extended: false } ) )
// parse application/json
app.use( bodyParser.json() )

const usuariosServiceProxy = httpProxy('172.26.80.1:5001');
// const boisServiceProxy = httpProxy('http://localhost:5001');
const authServiceProxy = httpProxy('172.26.80.1:5000', {
  proxyReqBodyDecorator: function(bodyContent, srcReq) {
    try {
    retBody = {};
    retBody.login = bodyContent.user;
    retBody.senha = bodyContent.password;
    bodyContent = retBody;
    }
    catch(e) {
    console.log('- ERRO: ' + e);
    }
    return bodyContent;
    },
  proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
    proxyReqOpts.headers['Content-Type'] = 'application/json';
    proxyReqOpts.method = 'POST';
    return proxyReqOpts;
    },
  userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
    if (proxyRes.statusCode == 200) {
    var str = Buffer.from(proxyResData).toString('utf-8');
    var objBody = JSON.parse(str)
    const id = objBody.id
    const token = jwt.sign({ id }, process.env.SECRET, {
    expiresIn: 300 // expira em 5min
    });
    userRes.status(200);
    return { auth: true, token: token, data: objBody };
    }
    else {
    userRes.status(401);
    return {message: 'Login inválido!'};
    }
    }
});


function verifyJWT(req, res, next){
  const token = req.headers['x-access-token'];
  if (!token)
  return res.status(401).json({ auth: false, message: 'Token nao fornecido.' });
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
  if (err)
  return res.status(500).json({ auth: false, message: 'Falha ao autenticar o token.' });
  // se tudo estiver ok, salva no request para uso posterior
  req.userId = decoded.id;
  next();
  });
  }


app.post('/login', (req, res, next) => {
authServiceProxy(req, res, next);
})
app.get('/login', (req, res, next) => {
authServiceProxy(req, res, next);
})



app.post('/logout', function(req, res) {
res.json({ auth: false, token: null });
})
// Requisições aos servicos, já autenticados
app.get('/usuarios', (req, res, next) => {
  usuariosServiceProxy(req, res, next);
  })

app.get('/bois', verifyJWT, (req, res, next) => {
  boisServiceProxy(req, res, next);
  })

// Configurações do app
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Cria o servidor na porta 3000
var server = http.createServer(app);
server.listen(3000);


