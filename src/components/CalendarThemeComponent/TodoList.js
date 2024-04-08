import React, {useEffect, useState} from 'react';
import {
    Checkbox,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
    Box,
} from '@mui/material';
import {doc, onSnapshot, setDoc, updateDoc} from "firebase/firestore";
import db from "../../firebase/firebaseConfig";
import moment from "moment";

const TodoList = ({userInfo}) => {
    const [todos, setTodos] = useState([
        { id: 1, textField: 'Buy groceries', completed: false },
        { id: 2, textField: 'Clean the house', completed: true },
        { id: 3, textField: 'Do laundry', completed: false },
        // Add more initial todos as needed
    ]);
    const [newTodoText, setNewTodoText] = useState('');

    useEffect(() => {
        //get previous data
        const fetchData = async () => {
            onSnapshot(doc(db, `User_${userInfo?.email}` , `TODOList`), (doc) => {
                const data = [];
                if(doc.data()){
                    Object.keys(doc.data()).forEach((key) =>{
                        data.push(doc.data()[key])
                    })
                }
                setTodos(data)
            });
        };
        fetchData();
    }, []);

    const handleToggle = (todoId) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    const handleAddTodo = async (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevents newline insertion
            if (newTodoText.trim() === '') {
                return; // Prevent adding empty todo
            }
            try {
                const todoRef = doc(db, `User_${userInfo?.email}`, `TODOList`);
                const id = Date.now()
                setNewTodoText('')
                await updateDoc(todoRef, {
                    [id]: {
                        id: id,
                        textField: newTodoText,
                        completed: false,
                    }
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    };


    return (
        <Box width={'60%'} marginTop={'50px'}>
            <h3>To Do List</h3>
                <Box sx={{
                    overflow: 'auto',
                    maxHeight: '170px',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    }
                }}
                >
                <List >
                    {todos && todos.map((todo) => (
                        <ListItem key={todo.id} sx={{ marginBottom:'-28px'}}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={todo.completed}
                                    onChange={() => handleToggle(todo.id)}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={todo.textField}
                                primaryTypographyProps={{ variant: 'body1' }}
                                style={{
                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                    marginLeft:'-16px',
                                    paddingRight: '8px', // Adjust right padding
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>

            <TextField
                label="Add Todo"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                fullWidth
                variant="standard"
                margin="normal"
                onKeyDown={handleAddTodo}
            />
        </Box>
    );
};

export default TodoList;
