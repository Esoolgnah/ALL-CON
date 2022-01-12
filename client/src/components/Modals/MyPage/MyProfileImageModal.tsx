/* Config import */
import { REACT_APP_API_URL } from '../../../config'
/* CSS import */
import profileImage from '../../../images/taeyang.png';
import camera from '../../../images/camera.png';
/* Store import */
import { logout } from '../../../store/AuthSlice';
/* Library import */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

/* 타입 스크립트 */
type MyProfileImageModalProps = {
  handleProfileEditBackground: () => void;
}

function MyProfileImageModal({ handleProfileEditBackground }: MyProfileImageModalProps) {

  /* dispatch / navigate */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* useSelector */
  /* 지역상태 - useState */

  const [content, setContent] = useState<string>('')

  /* useEffect */
  // 회원탈퇴 모달 상태

  /* handler 함수 (기능별 정렬) */

  // 이미지 파일 선택 버튼
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    console.log('파일 선택 버튼을 클릭했습니다!')
  }

  // /* 인풋 입력 핸들러 */
  // const inputValueHandler = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const info = { ...signupInfo, [key]: e.target.value };
  //   setSignupInfo(info);
  //   isAllValid(info);
  // };

  // 변경 버튼을 클릭하면, 현재 preview 이미자가 유저의 프로필 이미지로 변경된다 (Users DB에 해당 이미지 url를 저장한다)
  const handleProfileImgSave = async () => {
    console.log('변경 버튼을 클릭했습니다!')
    alert('ALL-CON\n프로필 사진이 변경되었습니다! 😖') 
    // 유저 프로필 상태 변경 & mypage 페이지로 이동 
    // dispatch(logout());
      navigate('/mypage')
  }

  return (
    <div id='myProfileImageModal'>
      <div id='bg' onClick={() => {handleProfileEditBackground()}}/>
      <div id='modalBox'>
        <div id='modal'>
          <div id='titleWrapper'>
            <p id='title'>프로필 사진 변경</p>
          </div>
          <div id='imgBox'>
            <div id='imgWrapper'>
              <img className='img' src={profileImage} alt='profileImage' />
            </div>
            <div id='cameraWrapper'>
              <img className='camera' src={camera} alt='camera' />
            </div>
            <div id='imgSelectionWrapper'>
              <input type='file' id='imgSelection' onChange={onChange} />
            </div>
          </div>
          <div id='modifyBtnWrapper'>
            <button className='modifyBtn' onClick={() => {handleProfileImgSave()}}>변경</button>
            <button className='cancleBtn' onClick={() => {handleProfileEditBackground()}}>변경 안함</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyProfileImageModal;
