const { Pool } = require('pg')

const dbConfig = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'pwd123',
    database: 'zombieplus'

}

const pool = new Pool(dbConfig)

async function executeSQL(query, params = []) {
    const client = await pool.connect()
    try {
        const result = await client.query(query, params)
        return result
    } catch (error) {
        console.error('Erro ao executar SQL:', error)
        throw error
    } finally {
        client.release()
    }
}

module.exports = { executeSQL }
