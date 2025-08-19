
export default async function CheckToken(){
    let token = localStorage.getItem('token')
    const apiUrl = process.env.REACT_APP_API_URL;
    try{
        const response = await fetch(`${apiUrl}users/jwt-ex/`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
               
              },
              
            
        });
        const data = await response.json();

        console.log(data.code)
        if(data.code === "token_not_valid"){
            alert(data.code)
            localStorage.removeItem('token')
            window.location.href = '/login';
        }
       
    }
    catch{
        return
    }


}