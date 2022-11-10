import axios from "axios";
const axiosSearch = (inputValue, hashTags=[]) =>{
    console.log("검색어 : "+inputValue);
    console.log("해쉬태그들 : "+hashTags);
    if(inputValue.length<2 && hashTags.length<1){
        return false;
    }/*else{
        let data ={
            inputValue : inputValue,
            hashTags : hashTags
        }
        const request = axios.post('/search',data)
        .then(response => 
            response)
        
        return request
    }*/
}
    

export default axiosSearch;