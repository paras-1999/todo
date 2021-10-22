import React from 'react'
import AssignmentIcon from '@mui/icons-material/Assignment';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Paper } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useRef, useEffect} from 'react'
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { Typography } from '@mui/material';
export default function Page2() {
    const [todo,setTodo]=useState([])
    let t=useRef(null)
    let p=useRef(null);
    useEffect(() => {
        if(sessionStorage.getItem('taskList')!=undefined){
        var storgeData=JSON.parse(sessionStorage.getItem('taskList'));
        setTodo(storgeData)}
    }, [])
    const addingToStoragr=(todoList)=>{
        sessionStorage.setItem('taskList',JSON.stringify(todoList));
    }
    const addTask=()=>{
        let newTask={task:t.current.value,priority:p.current.value,done:false};
        setTodo([...todo,newTask]);
        addingToStoragr([...todo,newTask]);
    }
    const removeTask=(i)=>{
        const newTodo=todo.filter((_, index) => index !== i);
        setTodo(newTodo);
        addingToStoragr(newTodo)
    }
    const completeTask=(i)=>{
        let mapped = todo.map((task,index) => {
            if(i==index)
            {
                task.done=true
            }
            return task;
          });
          setTodo(mapped);
          addingToStoragr(mapped)

    }
    // console.log(todo);
    return (
        <div >
            <Typography variant="h2" sx={{fontWeight:'lighter',fontFamily:"'Bevan', cursive",letterSpacing:"10px" ,width:"60%",mx:'auto'}}>Todo List <BorderColorIcon sx={{fontSize:"50px"}}/></Typography>
            <Paper sx={{width:"60%",mx:'auto',my:4 ,display:'flex'}} >
            
            <TextField
                    sx={{width:"80%",mx:2}}
                    label="Task"
                    inputRef={t}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" >
                                <AssignmentIcon color="info"/>
                            </InputAdornment>
                        )
                    }}
                variant="outlined"
                focused
                color="info"
                />
               <FormControl focused  
                    sx={{width:"20%"}}
                    
               >
                    <InputLabel >Priority</InputLabel>
                    <Select
                    label="Priority"
                    inputRef={p}
                    >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    </Select>
                </FormControl>
                <IconButton sx={{marginTop:"-10px"}} onClick={addTask}>
                <AddCircleIcon color="info"sx={{height:"60px",width:"60px"}} />
                </IconButton>
            </Paper>
            <TableContainer component={Paper} sx={{width:"60%",mx:'auto',my:4 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Task Number</TableCell>
                    <TableCell align="center">Task Discription</TableCell>
                    <TableCell align="right">Priority</TableCell>
                    <TableCell align="right">Action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {todo.map((val,i) => (
                    <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {i+1}
                    </TableCell>
                    <TableCell className={val.done ? "strike" : ""}  align="center">{val.task}</TableCell>
                    <TableCell align="right">{val.priority}</TableCell>
                    <TableCell align="right">
                        <IconButton sx={{padding:0}} onClick={()=>completeTask(i)} >
                        <CheckCircleRoundedIcon color="success"sx={{fontSize:"35px"}} />
                        </IconButton>
                        <IconButton sx={{padding:0}} onClick={()=>removeTask(i)}>
                        <CancelRoundedIcon color="error" sx={{fontSize:"35px"}} />
                        </IconButton>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    )
}
