// importar a dependência do SQLite3
// Ver mensagens no console
const sqlite3 = require("sqlite3").verbose()

//criar o objeto que irá fazer interações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
//utilizar o objeto de banco de dados para operações
db.serialize(() => {
    //criar tabela com comandos sql
    db.run(`
         CREATE TABLE IF NOT EXISTS places (
             id  INTEGER PRIMARY KEY AUTOINCREMENT,
             image TEXT,
             name TEXT,
             address TEXT,
             address2 TEXT,
             state TEXT,
             city TEXT,
             items TEXT
         );
     `)

    //inserir dados na tabela
    // const query = `
    //      INSERT INTO places (
    //          image,
    //          name,
    //          address,
    //          address2,
    //          state,
    //          city,
    //          items
    //      ) VALUES (?,?,?,?,?,?,?);
    //  `

    // const values = [
    //     "https://images.unsplash.com/photo-1558583082-409143c794ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
    //     "Papersider",
    //     "Av. Marechal Floriano, Centro",
    //     "N° 360",
    //     "RJ",
    //     "Rio de Janeiro",
    //     "Resíduos Orgânicos"
    // ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso!")
        console.log(this)
    }

    //db.run(query, values, afterInsertData)

    //consultar dados na tabela
    db.all(`SELECT * FROM places`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        console.log("Aqui estão seus registros")
        console.log(rows)
    })

    // //deletar dado da tabela
    // //Para deletar apenas um ID colocar está linha de código abaixo >  DELETE FROM places WHERE id = ?`, [1]
    //  db.run(`DELETE FROM places`, [], function(err){
    //      if(err) {
    //          return console.log(err)
    //      }

    //      console.log("Registro deletado com sucesso!")
    //      })
})