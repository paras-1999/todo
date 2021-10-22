import { AppBar, Toolbar} from '@mui/material'
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import React from 'react'
import ButtonGroup from '@mui/material/ButtonGroup';
import {BrowserRouter as Router , Switch, Route ,Link} from 'react-router-dom'
import Login from './Login';
import Signin from './Signin';


export default function Page1() {
    return (
        <Router>
        <AppBar sx={{backgroundImage: `linear-gradient(to right, #f2709c, #ff9472)`}}>
            <Toolbar sx={{display:"flex",justifyContent:"center"}}>
            <ButtonGroup variant="text" >
            <Button sx={{color:"white"}} startIcon={<LoginIcon />}>
            <Link to={`/`} >Log In</Link>
            </Button>
            <Button sx={{color:"white"}} endIcon={<BorderColorTwoToneIcon />}>
            <Link to={`/sign`}>Sign In</Link>
            </Button>
            </ButtonGroup>
            </Toolbar>
        </AppBar>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/sign" exact component={Signin} />
        </Switch>
        </Router>
    )
}
