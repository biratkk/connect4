import axios from "axios";

export default async function(connectionID){
    let formdata = new FormData();
    formdata.append("connectionID", connectionID)
    await axios.post("http://localhost:3001/resetGame", formdata);
}