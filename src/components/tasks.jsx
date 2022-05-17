import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import TasksTable from './tasksTable';
import SearchBox from './common/searchBox';
import _ from 'lodash';

class Tasks extends Component {

    getPagedData = () => {
        const { pageSize, currentPage, tasks: allTasks, selectedSeverity, sortColumn, searchQuery } = this.props;

        let filtered = allTasks;
        if (searchQuery) {
            filtered = allTasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
        } else if (selectedSeverity && selectedSeverity._id) {
            filtered = allTasks.filter(t => t.severity === selectedSeverity.name);
        }

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const tasks = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: tasks };
    };

    render() { 
        const {
            onCheck,
            onDelete,
            showID,
            pageSize,
            currentPage,
            onPageChange,
            severities,
            selectedSeverity,
            onSeveritySelect,
            onSort,
            sortColumn,
            searchQuery,
            onSearch,
            user
        } = this.props;
        const { length: tasksLength } = this.props.tasks;

        if (!user) return <p>Please <Link to='/login'>login</Link> to see tasks</p>;
        if (tasksLength === 0) {
            return <p>There are no tasks in the database.</p>;
        }

        const { totalCount, data: tasks } = this.getPagedData();

        return (
            <div className='row'>
                <div className="col-3">
                    <ListGroup
                        items={severities}
                        selectedItem={selectedSeverity}
                        onItemSelect={onSeveritySelect}
                    />
                </div>
                <div className="col">
                    {user && (
                        <Link
                            to='/tasks/new'
                            className="btn btn-success"
                        >
                            +
                        </Link>
                    )}
                    <p>Showing {totalCount} tasks in the database.</p>
                    <SearchBox
                        value={searchQuery}
                        onChange={onSearch}
                    />
                    <TasksTable
                        tasks={tasks}
                        onCheck={onCheck}
                        onDelete={onDelete}
                        onSort={onSort}
                        sortColumn={sortColumn}
                    />
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
        );
    }
}
 
export default Tasks;