import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Nav from '../Utill/Nav';
import Api from '../api/plannetApi'
import { Link } from "react-router-dom";
import { AppRunner } from 'aws-sdk';

const Wrap = styled.div`
    width: 1130px;
    height: 100vh;
    background-color: white;
    margin: 0 auto;
    .copy{
        width: 830px;
        text-align: center;
        color: #dfdfdf;
        line-height: 40px;
        float: left;
    }
`;

const Section = styled.div`
    width: 850px;
    height: calc(100vh - 40px);
    float: left;
    position: relative;
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        width: 20px;
        padding: 15px;
    }
    &::-webkit-scrollbar-thumb {
        height: 30%; /* 스크롤바의 길이 */
        background: #ddd; /* 스크롤바의 색상 */
        border-radius: 10px;
        border: 7px solid transparent;
        background-clip: padding-box;
    }
    &::-webkit-scrollbar-track {
        background: none;
        /*스크롤바 뒷 배경 색상*/
    }
    div{
        width: 100%;
        padding: 10px 30px;
    }
    .sub_box{
        h2{
            font-size: 28px;
            margin-top: 35px;
            font-weight: 900;
        }
        span{
            float: left;
            margin-top: 10px;
            margin-bottom: 15px;
        }
        button{
            float:right;
            font-weight: 600;
            display: block;
            font-size: 16px;
            padding: 8px 35px;
            border-radius: 25px;
            background-color: #4555AE;
            color: white;
            border: none;
            &:hover{background-color: #666;}
        }
    }
    button{
        border: none;
        padding-right: 20px; 
        background: none;
        font-size: 16px; 
        color: #bbb;
        font-weight: 700;
        transition: all .1s ease-in;
        &:hover, &:hover i{color: #888;}
        i{
            font-size: 16px; 
            line-height: 48px; 
            color: #bbb;
            transition: all .1s ease-in;
        }
    }
    .postInfo{
        border-collapse: collapse; 
        width:100%;
        background-color: #4555AE;
        border-bottom: solid 1px #bbb;
        text-align: center;
        tr:first-child td{border-top: solid 1px #4555AE; background-color: #f9f9f9;}
        th{padding: 10px; color: white;}
        td{padding: 10px; background-color: white; border-left: solid 1px #bbb; border-top: solid 1px #ddd;}
        td:first-child{border-left: none};
        td:nth-child(2){width: 400px; text-align: left; padding-left: 20px;}  
        .title-input{font-size:20px; font-weight: 500;}
        .bi{padding-right:5px;}
        .bi-heart-fill{margin-left:13px;}
    }
    .detail{
        width: 100%;
        min-height: 500px;
        padding: 30px;
        border-bottom: 1px solid #4555AE;
        table{width: 100%; margin: 10px 0;}
        table, tr, td{
            border-collapse: collapse;
            padding: 5px;
            border: 1px solid #ddd;
            background: none;
        }
    }
    .button-area {
        text-align: right;
        button{
            display :inline-block;
            font-weight: 600;
            right: 30px;
            font-size: 16px;
            padding: 8px 35px;
            border-radius: 25px;
            background-color: #4555AE;
            color: white;
            border: none;
            transition: all .1s ease-in;
            &:hover{background-color: #4555AE;}
        }
        button:nth-child(-n+3){
            margin-left: 10px;
        }
    }
    .util_box{
        .page_list {
            width: 500px; float:left;
            li{list-style-type: none; display: inline; padding: 0px 5px;
                a{
                    display: inline-block; text-decoration: none; padding: 5px 10px; color:#000;
                    border-radius: 5px;
                    -webkit-transition: background-color 0.3s;
                    transition: background-color 0.3s;
                    &:active {background-color: #4caf50; color: #fff;}
                    &:hover{color:#0d3c01; font-weight: bold;}
                    &:hover:not(.active) {background-color: #4555AE; color:white;}
                }
            } 
        }
        .search{
            float: right;
            width: 200px; height: 35px; padding: 0 10px; border: solid 2px #ddd; 
            background-color: white;
            input{width: 150px; height: 31px; border: 0px; outline: none; margin-right: 10px;}
        }
    }
`;

const PostView = () => {
    const getId = window.localStorage.getItem("userId");
    const [boardLoad, setBoardLoad] = useState();
    const [boardViews,setBoardViews] = useState(0);
    const getNum = window.localStorage.getItem("boardNo");
    console.log(getNum);

        //날짜 클릭시 해당 번호의 edit로 이동
        const onClickEdit = (boardNo) => {
            console.log(boardNo);
            const link = "/edit/" + boardNo;
            window.location.assign(link);
            window.localStorage.setItem("boardNo", boardNo);
        }

    const deleteData = async() => {
        await Api.boardDelete(getNum);
        window.location.replace("/board");
    }
    

    
    useEffect(() => {
        const increaseViews = async () => {
            try {
                const response = await Api.boardViews(getNum);
                setBoardViews(response.data);
                console.log(response.data);
            }catch (e) {
                console.log(e);
            }
        };
        const boardData = async () => {
            try {
                const response = await Api.boardLoad(getNum);
                setBoardLoad(response.data);
                console.log(response.data);
            } catch (e) {
                console.log(e);
            }
        };
        
        boardData();
        increaseViews();
    }, [getNum]);
    return(
        <Wrap>
            <Nav />
            <Section>
                {boardLoad&&boardLoad.map( e => (
                    <>
                        <div className="board_list sub_box"> 
                            <h2>자유게시판</h2>
                            <p><span>유저들이 작성한 글에 댓글과 좋아요를 남기며 소통해보세요! <br />커뮤니티 규칙에 맞지 않는 글과 댓글은 무통보 삭제됩니다.</span></p>  
                            <table className='postInfo'>
                                <tr>
                                    <td className="title-input" key={e.num} colSpan={4}>{e.title}</td>
                                </tr>
                                <tr>
                                    <td>No.{e.num}</td>
                                    <td>Writer.{e.nickname}</td>
                                    <td><i class="bi bi-eye"></i>{e.views+1}<i class="bi bi-heart-fill"></i>좋아요</td>
                                    <td>{(e.date).substring(0,10)}</td>
                                </tr>
                            </table>
                            <div className='detail' dangerouslySetInnerHTML={{__html: e.detail}}></div>
                        </div>
                        <div className="button-area">
                            <Link to='/board'><button>BACK</button></Link>
                            {getId === e.id ? <><button onClick={()=> onClickEdit(e.num)}>EDIT</button><button onClick={deleteData}>DELETE</button></> : null}
                        </div>
                    </>))}
            </Section>
        </Wrap>
    )
};

export default PostView;