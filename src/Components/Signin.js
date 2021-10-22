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
import FormHelperText from '@mui/material/FormHelperText';
import EmailIcon from '@mui/icons-material/Email';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import axios from 'axios';
const client=axios.create({
    baseURL:"http://localhost:3001/EmpData"
})
const regForName=RegExp(/^[A-Z a-z]{4,29}$/);
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass =RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
export class Signin extends Component {
    constructor(props){
        super(props);
        this.state={
            showPassword:false,
            user:'',
            email:'',
            fname:'',
            lname:'',
            pass1:'',
            pass2:'',
            errors:{
                user:'',
                email:'',
                fname:'',
                lname:'',
                pass1:'',
                pass2:'',
                check:false
            }
        }
    }
    handle(event){
        const {name,value}=event.target;
            let errors=this.state.errors;
            switch(name){
                case 'user':
                    errors.user=regForName.test(value)?'':'Enter a vaild user';
                    break;
                case 'email':
                    errors.email=regForEmail.test(value)?'':'Enter A Valid Email Address';
                    break;
                case 'fname':
                    errors.fname=regForName.test(value)?'':'Enter A Valid First name';
                    break;
                case 'lname':
                    errors.lname=regForName.test(value)?'':'Enter A Valid First name';
                    break;
                case 'pass1':
                    errors.pass1=regForPass.test(value)?'':'6-16 Digit Password Atleast One Uppercase Lowercase & Special Character ';
                    break;
                case 'pass2':
                    errors.pass2=this.state.pass1!=value?"Password Didn't Match!!!":'';
                    break;   
                default:    
                    break;
            }
            this.setState({errors,[name]:value
            })
    }
    async validate(event){
        event.preventDefault();
        let{user,email,lname,pass1,pass2,fname,errors}=this.state;
        if(user==''||email==''||lname==''||pass1==''||pass2==''||fname=='')
        {
            alert("Fill The Complete Form");
        }
        else if(this.valid(this.state.errors))
        {
           let newUser={user:user,email:email,fname:fname,lname:lname,password:pass1};
           client.post('',newUser);
           alert("You Registered SuccesFully");
           this.props.history.push('/');

        }
        else {
            errors.check=true;
            this.setState({
                errors

            })
        }
     }
      valid(errors){
         let valid=true;
         Object.values(errors).forEach((val)=> val.length>0 && (valid=false));
         return valid;
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
                    width:"100%",height: "100vh",backgroundImage:`radial-gradient( circle farthest-corner at 10% 20%,  rgba(97,186,255,1) 0%, rgba(166,239,253,1) 90.1% )`,display:'flex',alignItems:'center',justifyContent:'space-around'
                    
                }}
            >
                <Box sx={{ '&>:not(styled)':{color:'white',my:0} }}>
                    <h4 style={{fontSize:'1.6em',fontWeight:'lighter',fontFamily:"'Playball', cursive"}}>Become A Part Of..</h4>
                    <h1 style={{fontSize:'6em',fontWeight:'lighter',fontFamily:"'Bevan', cursive"}}>NeoSOFT</h1>
                    <h6 style={{fontSize:'0.8em',fontFamily:"'Aldrich', sans-serif",letterSpacing:'10px'}}>TECHNOLOGIES</h6>
                </Box>
                <Paper  component="form" elevation={3} sx={{width:"29%",display:'flex', alignItems:'center',marginTop:"60px"}}> 
                
                <Stack spacing={2} sx={{mx:'auto',width:'80%',my:2}}>
                <TextField
                    error={this.state.errors.check}
                    helperText={this.state.errors.fname}
                    id="fname"
                    name="fname"
                    label="fname No."
                    size="small"
                    onChange={this.handle.bind(this)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" >
                                <BorderColorTwoToneIcon color="info"/>
                            </InputAdornment>
                        )
                    }}
                variant="outlined"
                focused
                color="info"
                />
                <TextField
                    error={this.state.errors.check}
                    helperText={this.state.errors.lname}
                    id="lname"
                    name="lname"
                    label="lname"
                    size="small"
                    onChange={this.handle.bind(this)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" >
                                <BorderColorTwoToneIcon color="info"/>
                            </InputAdornment>
                        )
                    }}
                variant="outlined"
                focused
                color="info"
                />
                <TextField
                    error={this.state.errors.check}
                    helperText={this.state.errors.user}
                    id="user"
                    name="user"
                    label="User Id"
                    size="small"
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
                <TextField
                    error={this.state.errors.check}
                    helperText={this.state.errors.email}
                    id="email"
                    name="email"
                    label="Email Id"
                    size="small"
                    onChange={this.handle.bind(this)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" >
                                <EmailIcon color="info"/>
                            </InputAdornment>
                        )
                    }}
                variant="outlined"
                focused
                color="info"
                />
                <FormControl variant="outlined" error={this.state.errors.check} focused color="info" size="small"  >
                <InputLabel htmlFor="pass1" >Create-Password</InputLabel>
                <OutlinedInput
                    id="pass1"
                    name="pass1"
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
                    label="Create-Password"    
                />
                <FormHelperText>{this.state.errors.pass1}</FormHelperText>
                </FormControl>
                <FormControl size="small" variant="outlined" error={this.state.errors.check} focused color="info"  >
                <InputLabel htmlFor="pass2" >R-Password</InputLabel>
                <OutlinedInput
                    id="pass2"
                    name="pass2"
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
                    label="R-Password"    
                />
                <FormHelperText>{this.state.errors.pass2}</FormHelperText>
                </FormControl>
                <Button variant="contained" color="info" size='large' onClick={this.validate.bind(this)} sx={{width:'50%',alignSelf:'center'}}  endIcon={<BorderColorTwoToneIcon />}>
                Sign In
                </Button>
                </Stack>
                </Paper>
            </Box>

        )
    }
}

export default Signin
