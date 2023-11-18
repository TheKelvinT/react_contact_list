import apiUrl from "../Config/apiUrl";

interface ApiCallParameters{
    url: string;
    method?: "POST" | "GET" | "PUT" | "DELETE";
    data?:any;
    isFile?: boolean;
    useBaseUrl?: boolean; // Optional parameter to use the base URL

}

const apiCall = async({
    url,
    method="GET",
    data=null,
    isFile=false,
    useBaseUrl = true

}:ApiCallParameters)=>{

    const formData = new FormData();
    
    if(isFile && data instanceof File){
        formData.append("file", data);
    }

    const headers = new Headers();

    if(!isFile)
        headers.append("Content-Type", "application/json");

    if(localStorage.getItem("token"))
        headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
        const baseUrl = useBaseUrl ? apiUrl : ''; // Use the base URL conditionally

    const response = await fetch(
        `${baseUrl}${url}`,
        {
        method,
        headers,
        body: isFile? formData : data ? JSON.stringify(data) : undefined,
        }
    );
    if(response.status === 404)return {status:false,data:response.statusText}
    return response.json();
}

export default apiCall;

