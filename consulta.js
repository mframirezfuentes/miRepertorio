const {
    Pool
} = require('pg')

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "1234",
    port: 5432,
    database: 'repertorio'
})

const insertar = async (datos) => {
    const consulta = {
        text: "INSERT INTO repertorio values((select max(id)+1 from repertorio),$1,$2,$3)",
        values: datos,
    }
    try {
        const result = await pool.query(consulta)
        return result
    } catch (error) {
        console.log(error.code)
        return error
    }

}
const consultar = async () => {
    try {
        const result = await pool.query("select * from repertorio order by id asc");
        return result;
    } catch (error) {
        console.log(error.code)
        return error
    }
}

const editar = async (datos) => {
    const consulta = {
        text: `UPDATE repertorio SET cancion=$2, artista=$3, tono=$4 where id=$1 RETURNING *;`,
        values: datos,
    }
    try {      
        const result = await pool.query(consulta)
        return result

    } catch (error) {
        console.log(error.code)
        return error
    }
}
const eliminar = async (id) => {
  
    try {
        const result = await pool.query(`DELETE FROM repertorio where id=${id}`)
        return result
    } catch (error) {
        console.log(error.code)
        return error
    }
}
module.exports = {
    insertar,
    consultar,
    editar,
    eliminar
}