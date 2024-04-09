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
import {doc, onSnapshot, deleteField, deleteDoc, setDoc, updateDoc, arrayUnion} from "firebase/firestore";
import db from "../../firebase/firebaseConfig";
import moment from "moment";
import {debounce} from "lodash";

const TodoList = ({userInfo}) => {
    const [todos, setTodos] = useState([]);
    const [newTodoText, setNewTodoText] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            onSnapshot(doc(db, `User_${userInfo?.email}` , `TODOList`), (doc) => {
                let prevData =  doc.data()
                if(prevData){
                    const {completedList, ...todosWithoutCompletedList} = prevData;
                    const transformedData = Object.keys(todosWithoutCompletedList).map(key => ({
                        [key]: todosWithoutCompletedList[key]
                    }));

                    setTodos(transformedData);
                }
                else setTodos([]);
            });
        };
        fetchData();
    }, []);

    const handleToggle = async (todoId, textField) => {
        const updatedTodos = todos.map((todo) =>
            todo.hasOwnProperty(todoId) ? { [todoId]: {...todo[todoId], completed: !todo[todoId].completed} } : todo
        );
        setTodos(updatedTodos);

        const todoRef = doc(db, `User_${userInfo?.email}`, `TODOList`);
        const debouncedUpdate = debounce(async (fieldKey) => {
            try {
                await updateDoc(todoRef, {
                    [todoId]: deleteField()
                });
                const updateCompletedData = {
                    'completedList' : arrayUnion({ [todoId]: {
                            textField: textField,
                            completed: true,
                        }})
                };
                await setDoc(doc(db, `User_${userInfo?.email}`, `TODOList`), updateCompletedData, { merge: true });
            } catch (error) {
                console.error("Error removing field: ", error);
            }
        }, 1500);
        debouncedUpdate(todoId);
    };

    const handleAddTodo = async (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevents newline insertion
            if (newTodoText.trim() === '') {
                return; // Prevent adding empty todo
            }
            try {
                // const todoRef = doc(db, `User_${userInfo?.email}`, `TODOList`);
                setNewTodoText('')
                const id = Date.now()
                const newTodo = {
                    textField: newTodoText,
                    completed: false,
                };
                await setDoc(doc(db, `User_${userInfo?.email}`, "TODOList"), { [id]: newTodo }, { merge: true });
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
                    {todos && todos.length > 0 && todos.map((todo, index) => {
                        const id = Object.keys(todo)[0];
                        const todoItem = todo[id];
                        return (
                            <ListItem key={id} sx={{ marginBottom: '-28px' }}>
                                <ListItemIcon>
                                    <Checkbox
                                        checked={todoItem.completed}
                                        onChange={() => handleToggle(id, todoItem.textField)}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={todoItem.textField}
                                    primaryTypographyProps={{ variant: 'body1' }}
                                    style={{
                                        textDecoration: todoItem.completed ? 'line-through' : 'none',
                                        marginLeft: '-16px',
                                        paddingRight: '8px', // Adjust right padding
                                    }}
                                />
                            </ListItem>
                        );
                    })}
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
