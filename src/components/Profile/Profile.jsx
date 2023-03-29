import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserbyID } from '../../utilities/apiClientGet';
import UserProfileCard from './UserProfileCard/UserProfileCard';
import UserProfileSetting from './UserProfileSetting/UserProfileSetting';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../Redux/features/setUser';
import "./profile.css"

export default function Profile() {

  const dispatch = useDispatch()
  const { id } = useParams()
  const token = localStorage.getItem("accessToken")
  const currentUserId = localStorage.getItem("userId")
  const user = useSelector((state) => state.user.data)

  const handleGetUserbyID = async () => {
    const {data: res} = await getUserbyID(id, token)
    dispatch(userData(res))
  }

  useEffect(() => {
    handleGetUserbyID()
  }, [id])

  return (
    <div className='profile-container'>
      <UserProfileCard />
      {
        currentUserId !== user._id ? <></> : <UserProfileSetting />
      }
    </div>
  );
}