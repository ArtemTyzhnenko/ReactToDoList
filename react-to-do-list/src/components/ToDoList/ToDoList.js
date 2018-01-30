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
        const {onRemoveButton} = this.props;
        onRemoveButton(index);
    };

    onchangeTodo = (index) =>()=> {
        const {setEditableIndex} = this.props;
        setEditableIndex(index);
    };
    onBlurEnter =  (e) => {
        if(e.keyCode === 13) {
            this.onInputChangeBlur()
        }
    };


    render() {
        const {toDoList, onClickToggle, hasToDo, editableIndex, onInputChangeBlur,onSaveEdited} = this.props;
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
                                                                 onKeyDown={onSaveEdited}
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