import { useLayoutEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../actions/user_action'
import { lookContent, deleteContent } from '../../actions/board_action'
import Container from '../common/container';
import { Tr_b } from './table_tool/table_tool'


function ContentBoard () {
    const [userInfo,setUserInfo] = useState('');
    const [boardInfo,setBoardInfo] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const path = window.location.pathname.split('/');

    const moveList = (event) => {
        event.preventDefault();
        navigate(`/board/${path[2]}/1`);
    }
    const moveModify = (event) => {
        event.preventDefault();
        navigate(`/board/${path[2]}/modify/${boardInfo.no}`)
    }

    const deleteList = (event) => {
        event.preventDefault();
        // 지울때 마다 초기화 시켜주는 sql
        // ALTER TABLE `board` AUTO_INCREMENT=1;
        // SET @COUNT = 0;
        // UPDATE `board` SET `no` = @COUNT:=@COUNT+1;
        let body = {}
        deleteContent(body,{
            name:path[2],
            no:path[4]
        }).payload.then(res=>{
            alert('삭제되었습니다.')
            navigate(`/board/${path[2]}/1`)
        })
    }
    console.log(path[2],path[4])
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
            setBoardInfo(res.payload);
        })
    },[])


    return(
        <Container>
            <div className="board">
                <div className="b">
                    <div className="b-ct">
                        <div className="flex-box subjectLine">
                            <div className="b-ct-sbj">
                                { boardInfo.subject }
                            </div>
                            <div className="b-ct-user">
                                { boardInfo.id }
                            </div>
                        </div>
                        <div className="b-ct-time">
                            {boardInfo.time}
                        </div>
                        <div className="b-ct-txt">
                            {boardInfo.content}
                        </div>
                    </div>
                    <div className="btnArea">
                        <button className='button' onClick={ moveList }>목록</button>
                        {
                            userInfo.id === boardInfo.id 
                            ? <button className='button' onClick={ moveModify }>수정</button>
                            : null
                        }
                        {
                            userInfo.id === boardInfo.id 
                            ? <button className='button' onClick={ deleteList }>삭제</button>
                            : null
                        }
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ContentBoard ;