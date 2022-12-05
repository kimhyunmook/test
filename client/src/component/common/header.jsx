import {useState,useLayoutEffect} from "react";
import {auth} from "../../actions/user_action";
import List from './list'
import LoginList from "./loginList";
import configJson from '../../json/site_config.json'
import { loginToken } from "../../actions/type";

function Header() {
    const cookie = document.cookie;
    const loginCookieName = loginToken;
    let x_token = '';
    if(cookie !== '') {
        x_token = cookie.split(`${loginCookieName}=`);
    }
    x_token = x_token[1];
    const [userInfo,setUserInfo] = useState({
        id:''
    });
    //user
    useLayoutEffect(()=>{
        if(x_token != undefined)
        auth({
            id: x_token,
            login_token: cookie
        }).payload
        .then(user => {
            setUserInfo(user)
        })
    },[])
    return (
        <header>
            <div className="content">
                <nav>
                    <ul>
                        {
                            configJson.header.map((el,index) => {
                                return(
                                    <List key={index} text={ el.name } href={el.href} />
                                )
                            })
                        }
                    </ul>
                    <LoginList loginCookieName={ loginCookieName } token={ x_token } userInfo={ userInfo } />
                </nav>
            </div>
        </header>
    )
}

export default Header