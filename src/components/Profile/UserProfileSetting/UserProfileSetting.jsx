import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import "./userProfileSetting.css"
import BasicDatePicker from '../../../utilities/component/datepicker/datepicker';
import { updateUserbyID } from '../../../utilities/apiClientPut';
import { toast } from "react-toastify";

export default function UserProfileSetting({user}){

    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("accessToken")
    const [newData, setNewData] = useState({
        username: user.username,
        bio: user.bio,
        birthDay: user.birthDay
    })
    
    const [date, setDate] = useState(user.birthDay)
    const birthDay = user.birthDay.split("-")

    const handleUpdateUser = async () => {
        try{
            const res = await updateUserbyID(userId, newData, token)
            if(res.status === 200){
                toast.success("User profile updated", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                setTimeout(() => {
                    window.location.reload()
                }, 1000); 
            }
        }catch(err){
            console.log(err)
        }
    } 

    const handleChange = (e) => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeDate = (e) => {
        setDate(`${(e.$D <= 9) ? `0${e.$D}` : `${e.$D}`}-${(e.$M < 9) ? `0${e.$M+1}` : `${e.$M+1}`}-${e.$y}`)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleUpdateUser()
    }

    useEffect(() => {
        setNewData({
            ...newData,
            birthDay: date
        })
    }, [date])

    return(
        <div className="profile-setting-container">
            <div className='title-describe'><p>Edit your profile here:</p></div>
            <form className='profile-setting-form' onSubmit={handleSubmit}>
                <TextField 
                    label="Username" 
                    id="username" 
                    name='username'
                    defaultValue={user.username}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField 
                    label="Bio" 
                    id="bio" 
                    name='bio'
                    defaultValue={user.bio}
                    onChange= {handleChange}
                    fullWidth
                    margin="normal"
                />
                <BasicDatePicker 
                    description={"Date of birth"}
                    onChange= {handleChangeDate}
                    defaultValue={`${birthDay[2]}-${birthDay[1]}-${birthDay[0]}`}
                />
                <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                    width:100,
                    margin: 1
                }}
                >
                    Submit 
                </Button>
            </form>
        </div>
    )
}