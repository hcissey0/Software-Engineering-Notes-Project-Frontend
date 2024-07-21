import { DOMAIN } from "./global";
import { getAccessToken } from "./loaders";
// ! Run json server first on port 3000 (This is the default port anyway)
// * All sample data in api.json is an actual representation of how data looks like from the actual server

export const fetchData = async(url, {method='GET', body, auth=false, headers={}, returnResponse=false})=>{
  let options = {
      method:method,
      headers: headers
  }; 

  if(auth){
    options.headers['Authorization'] = 'Bearer ' + getAccessToken();
  }

  if(method == 'POST' || method == 'PATCH'){
     options.body = JSON.stringify(body); 
     options.headers['Content-Type'] = 'application/json';
  }

  try {
        const response = await fetch(url, options);
        if(returnResponse)return response; 
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
      console.log(error);
  }
  return null; // couldn't get the resource
};
  export const fromServers = async (urls, {method='GET', body, auth=false, headers})=>{
    const options = {method: method, body:body, auth: auth, headers:headers};
    console.log(options);
    for(const url of urls){  // attempt to get resource from all listed urls
        const data = await fetchData(url, options);
        if(data != null)return data;
     }
  // could not fetch the resource from any of the domains
  return null;
  };