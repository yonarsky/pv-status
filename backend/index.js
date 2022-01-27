require('dotenv').config({path: './.env.local'});
const express = require('express')
const app = express()
const port = 3000
const qs = require('qs');
const axios = require('axios')

const apiUrl = process.env.API_URL
const apiKey = process.env.API_KEY

app.get('/', (request, response) => {
    response.set('Access-Control-Allow-Origin', '*')
    let query = request.query
    let queryString = qs.stringify(query)
    axios(`${apiUrl}?tokenId=${apiKey}&${queryString}`).then(res => {
        response.send(res.data)
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})