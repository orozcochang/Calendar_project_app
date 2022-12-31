import React from "react";
import axios from "axios";

function personnel(){
    let pers = async () => {
        const response = await axios.get('api/personnel/')
        console.log(response.data)
        return response.data
    }
    return pers

}

export default personnel