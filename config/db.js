const Sequelize = require('sequelize')
const db = new Sequelize('bike', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = db