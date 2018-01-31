import React, {Component, Fragment} from 'react';

class ToDoList extends Component {

    onChangeCheckBox = (index) => (e) => {
        const {onChecked} = this.props;
        onChecked(e.target.checked, index);
    };

    onEditableChange = (index) => (e) =>{
        const{editableChange} = this.props;
        editableChange(index, e.target.value)
    };

    onClickRemoveButton = (index) => () => {
        const {onRemove} = this.props;
        onRemove(index);
    };

    onchangeTodo = (index) =>()=> {
        const {setEditableIndex} = this.props;
        setEditableIndex(index);
    };

    moveCaretAtEnd = (e) => {
        let temp_value = e.target.value;
        e.target.value = "";
        e.target.value = temp_value;
    };

    saveEdited = (index) => (e) =>{
        const {onSaveEdited} = this.props;
        onSaveEdited(e,index)
    };

    render() {
        const {toDoList, onClickToggle, hasToDo, editableIndex, onInputChangeBlur} = this.props;
        return (
            (hasToDo) ?
                (<Fragment>
                    <ul className={'list-of-todo'}>
                        <button className="toggle-all" type="button" onClick={onClickToggle}/>
                        {toDoList.map((item, index) => <li key={index} className={'to-do-paragraph'}>
                            <input type="checkbox" checked={item.check} className={'checkbox'}
                                   onChange={this.onChangeCheckBox(index)}
                            />
                            {
                                editableIndex === index ? <input type='text'
                                                                 className = {'editable-input'}
                                                                 value = {item.value}
                                                                 onChange={this.onEditableChange(index)}
                                                                 onBlur = {onInputChangeBlur}
                                                                 onKeyDown={this.saveEdited(index)}
                                                                 autoFocus
                                                                 onFocus={this.moveCaretAtEnd}
                                                                    /> :
                                    <lable onDoubleClick={this.onchangeTodo(index)}>{item.value}</lable>
                            }
                            <input type="button" className={'removeButton'} value={'X'}
                                   onClick={this.onClickRemoveButton(index)}
                            />
                        </li>)}
                    </ul>
                </Fragment>)
                : null)
    }
}

export default ToDoList;