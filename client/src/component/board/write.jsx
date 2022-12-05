import { useState,useLayoutEffect } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { writeBoard } from "../../actions/board_action";
import { auth } from "../../actions/user_action";
import Container from "../common/container";
import { getDate } from "../../actions/tool_action";


function WriteBoard() {
    const [subject,setSubject] = useState('');
    const [textArea,setTextArea] = useState('');
    const [userInfo,setUserInfo] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const path = window.location.pathname.split('/');

    useLayoutEffect(() => {
        dispatch(auth())
        .then(res=>{
            setUserInfo(res.payload)
        })
    },[path[2]])

    const onSubjectHandler = (event) => {
        setSubject(event.currentTarget.value)
    }
    const onTextareaHandler = (event) => {
        setTextArea(event.currentTarget.value)
    }
    const moveList = (event) => {
        event.preventDefault();
        navigate(`/board/${ path[2] }/1`)
    }
 
    const onWrite = () => {
        let type = writeBoard({
            subject:subject,
            content:textArea,
            time:getDate(),
            id:userInfo.id,
            board_type:'normal'
        },{name:path[2]})
        dispatch(type)
        .then(res => {
            console.log(res)
            navigate(`/board/${ path[2] }/1`);
        })
    }
    return(
        <Container>
            <div className="board board-write">
                <form id="wrtie" onSubmit={ onWrite } method="post" encType="multipart/form-data">
                    <h2>글작성 하기</h2>
                    <ul>
                        <Cover name="subject" text="제목"> 
                            <input type="text" name="subject" value={subject} onChange={ onSubjectHandler }/>
                        </Cover>
                        <Cover name="content" text="내용">
                            <textarea name="content" value={textArea} id="" cols="30" rows="10" onChange={ onTextareaHandler }></textarea>
                        </Cover>
                    </ul>
                    <div className="btnArea">
                        <button className="button">작성 완료</button>
                        <input className="button" type="reset" />
                        <button className='button' onClick={moveList}>
                            목록
                        </button>
                    </div>
                </form>
            </div>
        </Container>
    )
}

const Cover = (props) => {
    const style = {
    }
    return(
        <li style={ style }>
            <label htmlFor={ props.name }>
                { props.text }
            </label>
            { props.children }
        </li>
    )
}
 
export default WriteBoard