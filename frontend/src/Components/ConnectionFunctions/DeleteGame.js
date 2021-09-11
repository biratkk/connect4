import axios from "axios";

export default async function deleteGame(connectionID){
    let formdata = new FormData();
    formdata.append("connectionID",connectionID);
    await axios.post("/deleteGame", formdata);
}