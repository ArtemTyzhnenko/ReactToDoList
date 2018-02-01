import React, {Component, Fragment} from 'react';

import './App.css';

import ToDoList from './ToDoList';
import ToDoFooter from './ToDoFooter';

class App extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            toDoList: [],
            filter: 'all',
            editableId: null,
            editableText: '',
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
                    {value, check: false, id: (((1+Math.random())*0x10000)|0).toString(16).substring(1)}
                ],
                value: '',
            });
        }
    };

    onInputChange = (e) => {
        this.setState({value: e.target.value})
    };

    onChecked = (checked, id) => {
        const {toDoList} = this.state;
        const updatedList = toDoList.map((item, i) => (item.id === id) ?
            ({value: item.value, check: checked, id:id}) : item);
        this.setState({toDoList: updatedList});
    };

    onRemove = (id) => {
        const {toDoList} = this.state;
        const updateList = toDoList.filter((item) => item.id !== id);
        this.setState({toDoList: updateList});
    };

    onClickToggle = () => {
        const {toDoList} = this.state;
        const isUnchecked = toDoList.some((item) => item.check === false);
        const updateList = toDoList.map((item) => ({value: item.value, check: isUnchecked, id: item.id}));
        this.setState({toDoList: updateList})
    };

    filterTodos = (optionalFilter) => {
        const {filter, toDoList} = this.state;
        return this.filters[optionalFilter || filter](toDoList);
    };

    setFilter = (filter) => () =>{
        this.setState({filter})
    };

    clearCompleted = () =>{
        const {toDoList}= this.state;
        const updateList = toDoList.filter((item) => !item.check);
        this.setState({toDoList: updateList, filter: 'all'});
    };

    setEditableId = (id, originText) => () =>{
        this.setState({editableId: id, editableText:originText})
    };

    editableChange = (id, e) => {
        const {toDoList} = this.state;
        const updateListValue = toDoList.map((item)=> (item.id === id)?
            {value: e.target.value, check: item.check, id} : item);
        this.setState({toDoList: updateListValue});
    };

    inputChangeBlur = (id) => () => {
        const {toDoList, editableText} = this.state;
        const returnOldValue = toDoList.map((item)=> item.id === id ? item.value = editableText: item);
        this.setState({editableId: null, editableText: returnOldValue});
    };

    onSaveEdited =  (e,id)  => {
        if(e.key === 'Enter' && e.target.value.length !== 0) {
            this.setState({editableId: null})
        } else if(e.key === 'Enter' && e.target.value.length === 0) {
            this.onRemove(id);
            this.setState({editableId: null})
        } else if(e.keyCode === '27'){
            this.inputChangeBlur(id)
        }
    };

    render() {
        const {value, toDoList, editableId, filter, active,id } = this.state;
        const list  = this.filterTodos();
        const hasToDo  = !!toDoList.length;
        const counter = this.filterTodos('active').length;

        return (
            <Fragment>
                <h1>todos</h1>
                <input type="text"
                       placeholder={'What needs to be done?'}
                       className={'add-input'}
                       onChange={this.onInputChange}
                       onKeyDown={this.addTodo}
                       value={value}
                       maxLength={'450px'}
                />
                <ToDoList toDoList={list}
                          onChecked={this.onChecked}
                          onRemove={this.onRemove}
                          onClickToggle={this.onClickToggle}
                          hasToDo={hasToDo}
                          setEditableId = {this.setEditableId}
                          editableId = {editableId}
                          inputChangeBlur = {this.inputChangeBlur}
                          editableChange = {this.editableChange}
                          onSaveEdited = {this.onSaveEdited}
                          active ={active}
                          id={id}
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

export default App;