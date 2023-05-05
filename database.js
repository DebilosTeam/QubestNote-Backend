const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()
console.log(`[LOG] Connection to database established.`)

module.exports = prisma;