import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from 'react-router-dom';
import { avatarURL } from '../../../utilities/avatarURL';

export default function UserCard({data, currentUser}) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {data.username}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {data.email}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        <Link to={`/profile/${data._id}`}>
          <IconButton aria-label="previous">
              <AccountBoxIcon />
          </IconButton>
          </Link>
          { 
            currentUser.isAdmin === true ? (
              <Link to={`/deleteAccount/user/${data._id}`}>
                <IconButton aria-label="next"> 
                  <DeleteForeverIcon />
                </IconButton> 
              </Link>)
              : (<></>)
          }

        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 100, }}
        image={`${avatarURL}/${data.avatar}`}
        alt="user avatar"
      />
    </Card>
  );
}