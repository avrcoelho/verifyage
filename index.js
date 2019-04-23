const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  // manipular nome dos arquivos, fazer auto escape dinamicamente
  autoescape: true,
  express: app,
  // faz como se fosse o nodemon
  watch: true
})

// saber lidar com as informações de um form html
app.use(
  express.urlencoded({
    extended: false
  })
)

// set seta configurações globais
app.set('view engine', 'njk')

const verifyQUeryMiddleware = (req, res, next) => {
  const { age } = req.query

  if (!age) {
    return res.redirect('/')
  }

  // next não bloqueia o fluxo padrão do node
  return next()
}

app.get('/', (req, res) => {
  return res.render('initial')
})

app.post('/check', (req, res) => {
  const { age } = req.body

  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  } else {
    return res.redirect(`/minor?age=${age}`)
  }
})

app.get('/major', verifyQUeryMiddleware, (req, res) => {
  const { age } = req.query

  return res.render('major', {
    age
  })
})

app.get('/minor', verifyQUeryMiddleware, (req, res) => {
  const { age } = req.query

  return res.render('minor', {
    age
  })
})

app.listen(3000)
