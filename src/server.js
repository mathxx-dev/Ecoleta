const express = require("express")
const server = express()

//pegar o bd
const db = require("./database/db")

// configurar pasta pública
server.use(express.static("public"))

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


// configurar caminhos da aplicação
//página inicial
// req = requisição
// res = resposta 
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {

    console.log(req.query)


    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    // inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city[0],
        req.body.items
    ]

    console.log(values)

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro")
        }
        console.log("Cadastrado com sucesso!")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)

})

server.get("/search-result", (req, res) => {

    const search = req.query.search

    if(search == "") {
        //pesquisa vazia
        return res.render("search-result.html", { total: 0})
    }



    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        console.log("Aqui estão seus registros")

        //quantidade de pontos cadastrados
        const total = rows.length

        //mostrar a página html com os dados do banco de dados
        return res.render("search-result.html", { places: rows, total })
    })
})

//ligar o servidor
server.listen(3000)