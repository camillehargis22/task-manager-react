import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getTask, getSeverities, saveTask } from '../services/taskService';

class TaskEdit extends Form {
    state = {
        data: {
            title: '',
            task: '',
            notes: '',
            category: '',
            tags: [],
            severity: '',
            isComplete: false
        },
        severities: [],
        errors: {}
    };

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        task: Joi.string().max(25).required().label('Task'),
        notes: Joi.string().max(250).allow('', null).label('Notes'),
        category: Joi.string().min(3).required().label('Category'),
        tags: Joi.array().required().label('Tags'), // ????
        severity: Joi.string().required().label('Severity'), // ???
        isComplete: Joi.boolean().label('Complete')
    };

    populateSeverities() { // will need to add async when add collection
        // const { data: severities } = await getSeverities();
        const severities = getSeverities();
        this.setState({ severities });
    };

    async populateTask() {
        try {
            const taskId = this.props.match.params.id;
            if (taskId === 'new') return;

            const { data: task } =  await getTask(taskId);
            this.setState({ data: this.mapToViewModel(task) });
        } catch (ex) {
            if (ex.response && ex.response.status === 404) {
                this.props.history.replace('/not-found');
            }
        }
    }

    async componentDidMount() {
        this.populateSeverities(); // add await when add collections
        await this.populateTask();
    };

    mapToViewModel(task) {
        return {
            _id: task._id,
            title: task.title,
            task: task.task,
            notes: task.notes,
            category: task.category,
            tags: task.tags,
            severity: task.severity,
            isComplete: task.isComplete
        };
    };

    handleTagDelete = (index) => {
        const data = this.state.data;
        data.tags.splice(index, 1);
        this.setState({ data });
    };

    handleAddTag = () => {
        const data = this.state.data;
        for (let i = 0; i < data.tags.length; i++) {
            if (data.tags[i] === '') return;
        }
        data.tags.push('');
        this.setState({ data });
    }

    renderTags() {
        const { data } = this.state;

        data.tags.map(tag => {
            console.log(`tag: ${tag}`);
        });
        return (
            <div className="form-group">
                <label htmlFor="tags">Tags</label>
                <div style={{ border: '1px solid #CED4DA', borderRadius: '.25rem', padding: '20px'}}>
                    {data.tags.map((tag, index) => (
                        <div className="row" key={index} style={{ borderBottom: '1px solid black' }}>
                            <div className="col-11">
                                {this.renderTagInput('tags', 'Tag', index)}
                            </div>
                            <div className="col-1">
                                <button
                                    className="btn btn-danger"
                                    onClick={() => this.handleTagDelete(index)}
                                >
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                    <div>
                        <button
                            className="btn btn-success"
                            onClick={this.handleAddTag}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    doSubmit = async () => {
        await saveTask(this.state.data);
        window.location = '/tasks';
        // this.props.history.push('/tasks');
        // this is not updating when it goes back to /tasks, but db is getting
        // updated I am not sure if this is a bug or because my computer is
        // being super slow when I worked on this, so will worry about this later
        // because it will show the updates when page is refreshed
        // of course the solution to this was in the next videos!
    };

    render() { 
        return (
            <div>
                <h1>Task Edit</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title')}
                    {this.renderInput('task', 'Task')}
                    {this.renderInput('notes', 'Notes')}
                    {this.renderInput('category', 'Category')}
                    {this.renderTags()}
                    {this.renderSelect('severity', 'Severity', this.state.severities)}
                    {this.renderComplete('isComplete', 'Complete')}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}
 
export default TaskEdit;