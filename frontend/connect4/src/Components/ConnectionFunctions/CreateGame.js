//click -> ask backend for random game key -> join

import axios from 'axios'

//returns the connectionID
export async function createLocalGame(connectionID){
    let formdata = new FormData();
    formdata.append("local",true);
    formdata.append("connectionID",connectionID);
    let data = await axios.post("http://localhost:3001/createNewGame", formdata)
                    .then(res => {
                        console.log(res.data);
                        return res.data;
                    });
    return data;
}

export async function createMinimaxGame(connectionID, difficulty){
    let formdata = new FormData();
    formdata.append("local",false);
    formdata.append("connectionID",connectionID);
    formdata.append("difficulty", difficulty);
    let data = await axios.post("http://localhost:3001/createNewGame", formdata)
                    .then(res => res.data);
    return data;
}