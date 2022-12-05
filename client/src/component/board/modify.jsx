import Container from "../common/container";
import { useLayoutEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Tr_b } from "./table_tool/table_tool"
import { auth } from "../../actions/user_action";
import { lookContent, modify } from "../../actions/board_action";

function ModifyBoard () {
    const path = window.location.pathname.split('/');
    const [userInfo,setUserInfo] = useState('');
    const [subject,setSubject] = useState('');
    const [textArea,setTextArea] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useLayoutEffect(()=>{
        auth({}).payload
        .then(res=>{
            setUserInfo(res)
        })

        dispatch(lookContent({},{
            name:path[2],
            no:path[4]
        })) 
        .then(res=>{
            setSubject(res.payload.subject)
            setTextArea(res.payload.content)
        })
    },[]);

    const onSubjectHandler = (event) => {
        let value = event.currentTarget.value
        setSubject(value)
    }
    const onTextareaHandler = (event) => {
        let value = event.currentTarget.value
        setTextArea(value)
    }

    const onModify = (event) => {
        event.preventDefault();

        let body = {
            subject:subject,
            content:textArea
        }
        
        dispatch(modify(body,{
            name:path[2],
            no:path[4]
        }))
        .then(res=> {
            alert('수정되었습니다.');
            navigate(`/board/${path[2]}/contents/${path[4]}`);
        })
    }
    return(
        <Container>
            <form className="board board-modify" method="POST" onSubmit={ onModify }>
                <table>
                    <tbody>
                        <Tr_b className="tag-subject" tr="제목" td={ <input type="text" name="subject" value={ subject } onChange={ onSubjectHandler }/> } />
                        <Tr_b className="tag-id" tr="작성자" td={ userInfo.id}/>
                        <Tr_b className="tag-content" tr="내용" td={ <textarea name="content" cols="30" rows="10" value={ textArea } onChange={ onTextareaHandler }></textarea> }/>
                    </tbody>
                </table>
                <div className="btnArea">
                    <button className="button">수정</button>
                </div>
            </form>
        </Container>
    )
}

export default ModifyBoard;