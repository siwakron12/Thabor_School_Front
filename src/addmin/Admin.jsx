import React, { useEffect, useState } from 'react';
import AdminSlide from "./AdminSlide";
import { BrowserRouter as Routes, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Asid from './Asid';
import CheckToken from '../service/CheakToken.jsx';

function Admin() {
    // const [username, setUsername] = useState('');

    useEffect(() => {
       CheckToken()
    }, []);
   
    return (<>
    
        
        <div className="flex w-full h-full p-2">
            <Asid/>
            <main>
                <p>
                    ยินดีตอนรับadmin
                </p>

            </main>
        </div>
        </>
    );
}

export default Admin;