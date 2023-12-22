import axios from 'axios';

const axiospublic  = axios.create({
    baseURL:'https://hostel-mangement-server-site.vercel.app'
})
const UseAxiospublic = () => {

    return axiospublic
};

export default UseAxiospublic;