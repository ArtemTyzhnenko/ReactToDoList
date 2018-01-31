import React from 'react';

const ToDoFooter = ({hasToDo, clearCompleted, setFilter, counter,filter}) => hasToDo ? (
    <div className={'to-do-footer'}>
        <span className={'counter'}>{counter} items left</span>
        <ul className={'filters'}>
            <li>
                <button className={(filter === 'all') ? 'active-filter': 'all'} onClick={setFilter('all')}>All</button>
            </li>
            <li>
                <button className={(filter === 'active') ? 'active-filter':'active'} onClick={setFilter('active')}>Active</button>
            </li>
            <li>
                <button className={(filter === 'completed') ? 'active-filter':'completed'} onClick={setFilter('completed')}>Completed</button>
            </li>
        </ul>
        <button className={'clear-completed'} onClick={clearCompleted}>Clear completed</button>
    </div>
) : null;

export default ToDoFooter;





