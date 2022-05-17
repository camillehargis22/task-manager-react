import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Complete from './common/complete';
import Table from './common/table';
import auth from '../services/authService';

class TasksTable extends Component {

    columns = [
        { path: 'title', label: 'Title', content: task => <Link to={`/tasks/${task._id}`}>{task.title}</Link> },
        { path: 'task', label: 'Task' },
        { path: 'notes', label: 'Notes' },
        { path: 'category', label: 'Category' },
        { path: 'tags', label: 'Tags' },
        { path: 'severity', label: 'Severity' },
        { 
            path: 'complete',
            label: 'Completed',
            content:
                task => (
                    <Complete
                        complete={task.isComplete} 
                        onClick={() => this.props.onCheck(task)}
                    />
                )
        }
    ];

    deleteColumn = {
        key: 'delete',
        content:
            task => (
                <button
                    onClick={() => this.props.onDelete(task)}
                    className='btn btn-danger btn-sm'
                >
                    <i className="fa fa-trash"></i>
                </button>
            )
    };

    constructor() {
        super();
        const user = auth.getCurrentUser();
        if (user && user.isAdmin) {
            this.columns.push(this.deleteColumn);
        }
    };
     
    render() {

        const { tasks, onSort, sortColumn } = this.props;

        return (
            <Table
                columns={this.columns}
                data={tasks}
                sortColumn={sortColumn}
                onSort={onSort}
            />
        );
    }
}
 
export default TasksTable;