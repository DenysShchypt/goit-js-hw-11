import axios from "axios";
const URL = 'https://pixabay.com/api/';

const fetchCategory = async (inputValue,page) => {
    const params = new URLSearchParams({
        key:'39051306-773603199c2079818735f84a4',
        page: page,
        q:inputValue,
        image_type:'photo',
        orientation:'horizontal',
        safesearch:true,
        per_page:40,
        
    })
  const response = await axios.get(`${URL}?${params}`)
    return response;
} 

export { fetchCategory};





