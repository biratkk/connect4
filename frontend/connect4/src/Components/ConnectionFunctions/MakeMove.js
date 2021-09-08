import axios from 'axios'

export async function dropPieceOn(column, connectionID, user){
    let formdata = new FormData();
    formdata.append("column",column);
    formdata.append("connectionID",connectionID);
    formdata.append("user",user);
    let data = await axios.post("/makeMove", formdata).then(res => res.data);
    return data;
}