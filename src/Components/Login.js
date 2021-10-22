import React, { Component } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import { Button, Stack } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import FormHelperText from '@mui/material/FormHelperText';
import axios from 'axios';
const client=axios.create({
    baseURL:"http://localhost:3001/EmpData"
})
export class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            showPassword:false,
            empList:[],
            email:'',
            pass:'',
            errors:{
                email:'',
                pass:'',
                check:false
            }
        }
    }
    async componentDidMount(){
        let res= await client.get();
        this.setState({
            empList:res.data
        })
        sessionStorage.removeItem('user')

    }
    handle(event){
        const {name,value}=event.target;
        this.setState({
            [name]:value
        })
    }
    async validate(){
        let{empList,email,pass}=this.state;
        let e= await empList.find(x=>x.email===email)
        let eindex =  empList.indexOf(e);
        if(eindex+1){
            if(empList[eindex].password===pass){
                sessionStorage.setItem('user',JSON.stringify(empList[eindex]));
                this.props.history.push('/page2');
                window.location.reload(false);    
            }
            else{
                let{errors}=this.state;
                errors.pass="Password Not Matched";
                errors.check=true;
                this.setState({
                    errors

                })
            }
        }
        else{
            let{errors}=this.state;
            errors.email="Enter A Valid Mail";
            errors.check=true;
            this.setState({
                errors

            })
        }

    }
    handleClickShowPassword(){
        this.setState({
            showPassword:!this.state.showPassword
        })
    }
    render() {
        return (
            <Box 
                sx={{
                    width:"100%",height: "100vh",backgroundImage: `radial-gradient( circle farthest-corner at 10% 20%,  rgba(97,186,255,1) 0%, rgba(166,239,253,1) 90.1% )`,display:'flex',alignItems:'center',justifyContent:'space-around'
                    
                }}
            >
                <Box sx={{ '&>:not(styled)':{color:'white',my:0} }}>
                    <h4 style={{fontSize:'1.6em',fontFamily:"'Playball', cursive"}}>Welcome to</h4>
                    <h1 style={{fontSize:'6em',fontWeight:'lighter',fontFamily:"'Bevan', cursive"}}>NeoSOFT</h1>
                    <h6 style={{fontSize:'0.8em',fontFamily:"'Aldrich', sans-serif",letterSpacing:'10px'}}>TECHNOLOGIES</h6>
                </Box>
                <Paper  component="form" elevation={3} sx={{width:"29%", height: "65vh",display:'flex', alignItems:'center'}}> 
                
                <Stack spacing={3} sx={{mx:'auto',width:'80%'}}>
                <AccountCircle  sx={{height:70 ,width:70,mx:'auto'}} color="info"/>
                <TextField
                    error={this.state.errors.check}
                    helperText={this.state.errors.email}
                    id="email"
                    name="email"
                    label="Email Id"
                    onChange={this.handle.bind(this)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" >
                                <AccountCircle color="info"/>
                            </InputAdornment>
                        )
                    }}
                variant="outlined"
                focused
                color="info"
                />
                <FormControl variant="outlined" error={this.state.errors.check} focused color="info"  >
                <InputLabel htmlFor="pass" >Password</InputLabel>
                <OutlinedInput
                    id="pass"
                    name="pass"
                    onChange={this.handle.bind(this)}
                    type={this.state.showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        color="info"
                        aria-label="toggle password visibility"
                        onClick={()=>this.handleClickShowPassword()}
                        edge="end"
                        >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                    
                    
                />
                <FormHelperText>{this.state.errors.pass}</FormHelperText>
                </FormControl>
                <Button variant="contained" color="info" size='large' onClick={this.validate.bind(this)} sx={{width:'40%',alignSelf:'center'}}  endIcon={<LoginIcon />}>
                Login
                </Button>
                </Stack>
                </Paper>
            </Box>

        )
    }
}

export default Login
