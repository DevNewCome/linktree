import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:3000'
})

//json-server --watch db.json