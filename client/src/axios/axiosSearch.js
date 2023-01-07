import axios from "axios";
const axiosSearch = (inputValue, hashTags=[]) =>{
    if(inputValue.length<2 && hashTags.length<1){
        alert("검색어 길이는 최소 2글자 이상이어야 합니다.");
        return;
    }else{
        let data ={
            inputValue : inputValue,
            hashTags : hashTags
        }
        const request = axios.post('/post/searchquery',data)
        .then(response =>{
            return response.data;
        })
        .catch(err =>{
            alert(err);
        })
        return request
    }
}
    

export default axiosSearch;