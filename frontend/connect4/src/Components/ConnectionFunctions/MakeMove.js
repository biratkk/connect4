import axios from 'axios'

export async function dropPieceOn(column, connectionID, user){
    let formdata = new FormData();
    formdata.append("column",column);
    formdata.append("connectionID",connectionID);
    formdata.append("user",user);
    let data = await axios.post("http://localhost:3001/makeMove", formdata).then(res => res.data);
    return data;
}