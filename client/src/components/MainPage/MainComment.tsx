/* CSS import */
import shield from '../../images/shield.png';
import tripleDot from '../../images/tripleDot.png';
/* Store import */
import { RootState } from '../../index';
import { showAlertModal, insertAlertText } from '../../store/ModalSlice';
import {
  setPageAllComments,
  setTotalNum,
} from '../../store/ConcertCommentSlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function MainComment() {
  const dispatch = useDispatch();
  const { isLogin, userInfo } = useSelector((state: RootState) => state.auth);
  const { target, targetIdx } = useSelector((state: RootState) => state.main);
  const { pageNum, pageAllComments } = useSelector(
    (state: RootState) => state.concertComments,
  );
  /* 댓글 인풋 && 버튼 클릭 상태 */
  const [inputComment, setInputComment] = useState<string>('');
  const [isClick, setIsClick] = useState<boolean>(false);

  // console.log('렌더링 횟수 체크')

  useEffect(() => {
    getAllComments();
  }, [isClick, targetIdx, pageNum]);

  /* 인풋 체인지 핸들러 */
  const inputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputComment(e.target.value);
  };

  /* 버튼 클릭 핸들러 */
  const commentBtnHandler = async () => {
    try {
      /* response 변수에 서버 응답결과를 담는다 */
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/comment`,
        { content: inputComment },
        { withCredentials: true },
      );
      /* 서버의 응답결과에 유효한 값이 있다면 댓글 작성 성공 */
      if (response.data) {
        /* 클릭 상태 변경 후 알람창 생성 */
        setIsClick(true);
        dispatch(insertAlertText('댓글이 작성되었습니다! 🙂'));
        dispatch(showAlertModal(true));
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 400)
        dispatch(insertAlertText('빈칸을 모두 입력해주세요! 😖'));
      else if (error.response?.status === 401)
        dispatch(insertAlertText('댓글 작성 권한이 없습니다! 😖'));
      else dispatch(insertAlertText('Server Error! 😖'));
      dispatch(showAlertModal(true));
    }
  };

  /* 모든 댓글 가져오기 함수 */
  const getAllComments = async () => {
    try {
      /* response 변수에 서버 응답결과를 담는다 */
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/comment?pageNum=${pageNum}`,
        { withCredentials: true },
      );
      /* 서버의 응답결과에 유효한 값이 담겨있다면 댓글 조회 성공*/
      if (response.data) {
        /* 모든 페이지수 & 모든 댓글목록을 전역 상태에 담는다 */
        dispatch(setTotalNum(response.data.data.totalPage));
        dispatch(setPageAllComments(response.data.data.concertCommentInfo));
      }
    } catch (err) {}
  };

  return (
    <div id='commentBox'>
      {/* 로그인시 보일 댓글 작성 영역 */}
      {isLogin && (
        <div className='writeBox'>
          <div className='nicknameBox'>
            <p className='nickName'>
              {isLogin ? userInfo.username + ' 님' : '로그인이 필요합니다.'}
            </p>
          </div>
          <div className='commentBodyBox'>
            <div className='imgWrapper'>
              {isLogin && (
                <img className='img' src={userInfo.image} alt='프로필 사진' />
              )}
              {isLogin && userInfo.role !== 3 && (
                <img className='shield' src={shield} alt='인증 뱃지' />
              )}
            </div>
            <div className='bodyWrapper'>
              <textarea
                id='input'
                placeholder='댓글을 입력해주세요.'
                onChange={inputChangeHandler}
              ></textarea>
              <div id='inputBtn' onClick={commentBtnHandler}>
                작성하기
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 댓글 목록 map */}
      {pageAllComments.map(comment => (
        <div className='box'>
          <div className='dateBox'>
            <p className='nickNameAndDate'>
              {comment.User.username} | {comment.createdAt.substring(0, 10)}
            </p>
            <div className='dotWrapper'>
              {userInfo.id === comment.user_id && (
                <img className='dot' src={tripleDot} alt='메뉴 아이콘' />
              )}
            </div>
          </div>
          <div id='imgAndText'>
            <div className='imgWrapper'>
              <img className='img' src={comment.User.image} alt='프로필 사진' />
              {comment.User.role !== 3 && (
                <img className='shield' src={shield} alt='인증 뱃지' />
              )}
            </div>
            <p id='text'>{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MainComment;
