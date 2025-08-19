import { useState } from 'react';
import bor from '../img/thabor_logo.png'

export default function Login() {
    
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;
   async function postData(ev){
    ev.preventDefault()
    try {
        const response = await fetch(`${apiUrl}users/token/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
               
              },
              body: JSON.stringify({username,password})
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.access);
            
            alert('Login successful');
            console.log(data.access)
            window.location.href = '/Admin';
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        alert('An error occurred');
    }
    }

    return <>
        <div className="w-screen h-screen bg-white">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-20 w-auto"
                        src={bor}
                        alt="Your Company"
                    />
                    <h2 className=" mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-500">
                        Login Admin
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action='ad' method="POST" onSubmit={postData}>
                        <div>
                            <label htmlFor="user" className="block text-sm font-medium leading-6 text-gray-900">
                                User
                            </label>
                            <div className="mt-2">
                                <input
                                  id="user"
                                  name="user"
                                  type="user"
                                  autoComplete="user"
                                  required
                                    className="block w-full pl-2 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(ev)=>setUsername(ev.target.value)}
                                    value={username}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900"> 
                                    Password
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    value={password}
                                    id="password"
                                    name="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset pl-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(ev)=>setPassword(ev.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>


                </div>
            </div>
        </div>


    </>

}