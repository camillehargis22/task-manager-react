import './App.css';
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Tasks from './components/tasks';
import { getTasks, getSeverities, deleteTask, saveTask } from './services/taskService';
import NavBar from './components/navbar';
import Admin from './components/admin';
import Account from './components/account';
import Login from './components/login';
import NotFound from './components/notFound';
import TaskEdit from './components/taskEdit';
import Logout from './components/logout';
import Register from './components/register';
import ProtectedRoute from './components/common/protectedRoute';
import { toast, ToastContainer } from 'react-toastify';
import auth from './services/authService';
import 'react-toastify/dist/ReactToastify.css';

// Notes:
  // Fix button styling on rows
  // organize import statements
  // implement owners and viewers and admins

class App extends Component {
  state = {
    tasks: [],
    pageSize: 3, // this will change later, just temp for testing
    currentPage: 1,
    severities: [],
    selectedSeverity: "",
    sortColumn: { path: 'title', order: 'asc' },
    searchQuery: ''
  };

  async componentDidMount() {
    // const { data } = await getSeverities(); // when make collection
    const severities = [ { _id: '', name: 'All Tasks'} , ...getSeverities()]; // and the getSeverities() will then be data

    const { data: tasks } = await getTasks();
    const user = auth.getCurrentUser();
    this.setState({ tasks, severities, user });
  };

  handleDelete = async (task) => {
    const originalTasks = this.state.tasks;

    const tasks = this.state.tasks.filter(t => t._id !== task._id);
    this.setState({ tasks });

    try {
      await deleteTask(task._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error('This movie has already been deleted.');
      }
      this.setState({ tasks: originalTasks });
    }
  };

  handleCheck = async (task) => {
    const originalTasks = this.state.tasks;

    const tasks = [...this.state.tasks];
    const index = tasks.indexOf(task);
    tasks[index] = {...tasks[index]};
    tasks[index].isComplete = !tasks[index].isComplete;
    this.setState({ tasks });

    try {
      saveTask(tasks[index]);
    } catch (ex) {
      this.setState({ tasks: originalTasks });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSeveritySelect = (severity) => {
    this.setState({ selectedSeverity: severity, searchQuery: '', currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedSeverity: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  // Bonus attempt
  showID = (task) => {
    // would like to add to DOM under table, but haven't quite figured out how, so alert will do for now
    alert(`The ObjectID is: ${task._id}`);
  };
  
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer/>
        <NavBar user={user}/>
        <main className='container'>
          <Switch>
            <ProtectedRoute path='/tasks/:id' component={TaskEdit} />
            <Route
              path='/tasks'
              render={props => <Tasks
                tasks={this.state.tasks}
                onDelete={this.handleDelete}
                onCheck={this.handleCheck}
                showID={this.showID}
                pageSize={this.state.pageSize}
                currentPage={this.state.currentPage}
                onPageChange={this.handlePageChange}
                severities={this.state.severities}
                selectedSeverity={this.state.selectedSeverity}
                onSeveritySelect={this.handleSeveritySelect}
                sortColumn={this.state.sortColumn}
                onSort={this.handleSort}
                searchQuery={this.state.searchQuery}
                onSearch={this.handleSearch}
                user={user}
                {...props}
              />}
            />
            <ProtectedRoute path='/admin' component={Admin} /> {/* ????? */}
            <Route path='/myaccount' component={Account} />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
            <Route path='/register' component={Register} />
            <Route path='/not-found' component={NotFound} />
            <Redirect from='/' exact to='/tasks' />
            <Redirect to='/not-found' />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
