import http from './httpService';
import config from '../config.json';

const apiEndpoint = `${config.apiUrl}/tasks`;

function taskUrl(taskId) {
    return `${apiEndpoint}/${taskId}`;
}

export function getTasks() {
    return http.get(apiEndpoint);
}

export function getTask(taskId) {
    return http.get(taskUrl(taskId));
}

export function saveTask(task) {
    if (task._id) {
        const body = {...task};
        delete body._id;
        delete body.__v;
        return http.put(taskUrl(task._id), body);
    }

    // new task
    return http.post(apiEndpoint, task);
}

export function deleteTask(taskId) {
    return http.delete(taskUrl(taskId));
}

export function getSeverities() {
    // I'll probably move this to a new db collection later
    const severities = [
      { _id: 1, name: 'Low' },
      { _id: 2, name: 'Average' },
      { _id: 3, name: 'High' },
      { _id: 4, name: 'Priority' }
    ];
    return severities;
}