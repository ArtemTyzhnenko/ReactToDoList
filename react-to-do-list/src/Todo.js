import React, {Component, Fragment} from 'react';

import './App.css';


import ToDoList from './components/ToDoList/ToDoList';
import ToDoFooter from './components/ToDoFooter/ToDoFooter';


class Todo extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            toDoList: [],
            filter: 'all',
            editableIndex: null,
        };
    }

    filters = {
        all: (list) => list,
        completed: (list) => list.filter((item)=> item.check),
        active: (list) => list.filter((item)=> !item.check),
    };

    addTodo = (e) => {
        const {value, toDoList: prevList} = this.state;
        if (!!value && e.keyCode === 13) {

            this.setState({
                toDoList: [
                    ...prevList,
                    {value, check: false}
                ],
                value: '',
            });

        }
    };

    onInputChange = (e) => {
        this.setState({value: e.target.value})
    };

    onChecked = (checked, index) => {
        const {toDoList} = this.state;
        const updatedList = toDoList.map((item, i) => (i === index) ?
            ({value: item.value, check: checked}) : item);
        this.setState({toDoList: updatedList});
    };

    onRemove = (index) => {
        const {toDoList} = this.state;
        const updateList = toDoList.filter((item, i, arr) => arr[i] !== arr[index]);
        this.setState({toDoList: updateList});
    };

    onClickToggle = () => {
        const {toDoList} = this.state;
        const isUnchecked = toDoList.some((item) => item.check === false);
        const updateList = toDoList.map((item) => ({value: item.value, check: isUnchecked}));
        this.setState({toDoList: updateList})
    };

    filterTodos = () => {
        const {filter, toDoList} = this.state;
        return this.filters[filter](toDoList);
    };

    setFilter = (filter) => () =>{
        this.setState({filter})
    };

    clearCompleted = () =>{
        const {toDoList}= this.state;
        const updateList = toDoList.filter((item) => !item.check);
        this.setState({toDoList: updateList});
    };

    setEditableIndex = (index) =>{
        this.setState({editableIndex: index})
    };

    editableChange = (index, e) => {
        const {toDoList} = this.state;
        const updateListValue = toDoList.map((item, i, arr)=> (arr[i] === arr[index])?
            {value: e, check: item.check} : item);
        this.setState({toDoList: updateListValue});

    };

    onInputChangeBlur = () => {
        this.setState({editableIndex: false});
    };

    onSaveEdited =  (e,index) => {
        if(e.keyCode === 13 && e.target.value.length !== 0) {
            this.onInputChangeBlur();
        } else if(e.keyCode === 13) {
            this.onRemove(index);
            this.onInputChangeBlur();
        }
    };

    render() {
        const {value, toDoList, editableIndex, filter} = this.state;
        const list  = this.filterTodos();
        const hasToDo  = !!toDoList.length;
        const counter = toDoList.filter((item)=> !item.check).length;

        return (
            <Fragment>
                <h1>todos</h1>
                <input type="text"
                       placeholder={'What needs to be done?'}
                       className={'add-input'}
                       onChange={this.onInputChange}
                       onKeyDown={this.addTodo}
                       value={value}
                />
                <ToDoList toDoList={list}
                          onChecked={this.onChecked}
                          onRemove={this.onRemove}
                          onClickToggle={this.onClickToggle}
                          hasToDo={hasToDo}
                          setEditableIndex = {this.setEditableIndex}
                          editableIndex = {editableIndex}
                          onInputChangeBlur = {this.onInputChangeBlur}
                          editableChange = {this.editableChange}
                          onSaveEdited = {this.onSaveEdited}
                />
                <ToDoFooter hasToDo={hasToDo}
                            clearCompleted={this.clearCompleted}
                            setFilter={this.setFilter}
                            counter = {counter}
                            filter = {filter}
                />
            </Fragment>
        );
    }
}

export default Todo;