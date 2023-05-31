import axios from 'axios';
import {environment} from '../environment/environment'


const api = axios.create({
    baseURL: environment.scheme + environment.baseUrl
})

export default api;