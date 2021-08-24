import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios'
import '../components/Todo.css'

const Todo = (props) => {
    const [todoName, setTodoName] = useState('')
    const todoListReducer = (state, action) => {
        switch(action.type) {
            case 'ADD':
                return state.concat(action.payload)
            case 'SET':
                return action.payload
            case 'DELETE':
                return state.filter((todo) => todo.id !== action.payload)
            default:
                return state
        }
    }
    const [todoList, dispatch] = useReducer(todoListReducer, [])
    useEffect(() => {
        axios.get('https://todo-5273b-default-rtdb.firebaseio.com/todos.json')
            .then(result => {
                console.log(result)
                const todoData = result.data
                const todos = []
                for (const item in todoData) {
                    todos.push({
                        id: item,
                        name: todoData[item].name,
                       
                    })
                dispatch({ type: 'SET', payload: todos })
                }
            })
    }, [])
    const handleChange = (e) => {
        setTodoName(e.target.value)
    }

    const todoAddHandler = () => {
        console.log("add")
        axios.post(
            'https://todo-5273b-default-rtdb.firebaseio.com/todos.json',
            {
                name: todoName
            }
        ).then(res => {
            const todoItem = { id: res.data.name, name: todoName }
            dispatch({ type: 'ADD', payload: todoItem })
        }).catch(err => {
            console.log(err)
        })
    }

    const todoDeleteHandler = (todoId) => {
        axios.delete(`https://todo-5273b-default-rtdb.firebaseio.com/todos/${todoId}.json`)
            .then(res => {
                dispatch({ type: 'DELETE', payload: todoId })
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
        <div className="todoList">
            <input 
                value={todoName}
                onChange={handleChange}
                placeholder="Enter task"
            />
            <button onClick={todoAddHandler} className="btn btn-success">Add</button>
            <ul>
                {todoList.map(todo => (
                    <li key={todo.id} >
                        {todo.name}<button className="btn btn-danger" onClick={todoDeleteHandler.bind(this, todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default Todo;