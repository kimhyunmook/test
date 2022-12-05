import axios from 'axios'
import List from './list'
import { useState } from 'react';
import { deleteCookie } from '../../actions/tool_action';

function LoginList({loginCookieName,token,userInfo}) {
    const [regiClass,setRegiClass] = useState('register')
    
    const logoutHandle = (event) => {
        event.preventDefault();
        axios.post('/api/users/logout')
            .then(res => {
                deleteCookie(loginCookieName);
            })        
    }
    if(token !== undefined)
    return(
        <ul className={ regiClass }>
            <List text={ `${ userInfo.id }님` } href={'/myPage'} class_name={`login-id`} />
            <li className='logout'>
                <button onClick={ logoutHandle }> logout </button>
            </li>
        </ul>
    )

    else
    return(
        <ul className={regiClass}>
            <List text={'Register'} href={'/register'} />
            <List text={`login`} href={`/login`} class_name={`login`} />
        </ul>
    )
}

export default LoginList