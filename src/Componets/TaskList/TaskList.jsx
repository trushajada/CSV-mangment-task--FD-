import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Navbar, Nav, Row } from 'react-bootstrap';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [displayedTasks, setDisplayedTasks] = useState('Pending');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  const filteredTasks = tasks.filter(task => task.status === displayedTasks);

  const exportToCSV = () => {
    const csvRows = [];
    csvRows.push(['Title', 'Description', 'Due Date', 'Priority', 'Status', 'Assigned Users'].join(','));

    filteredTasks.forEach(task => {
      const row = [
        task.title,
        task.description,
        task.dueDate,
        task.priority,
        task.status,
        task.assignedUsers.join(', ')
      ];
      csvRows.push(row.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'tasks.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <Navbar expand="md" bg="light" variant="light" className="shadow p-3 mb-5">
        <Container fluid>
          <h3 className="fw-bold ms-2 me-5 text-dark">Task List</h3>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto ms-5">
              <Nav.Link href="/" className="ms-md-3 me-4 fw-bold">Task</Nav.Link>
              <Nav.Link href="/list" className="ms-md-3 me-4 fw-bold">Task List</Nav.Link>
              <Nav.Link href="#" className="ms-md-3 me-4 fw-bold">Details</Nav.Link>
              <Nav.Link href="#" className="ms-md-3 me-4 fw-bold">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="mb-5  ">
        <Button
          variant="outline-primary"
          onClick={() => setDisplayedTasks('Pending')}
          className="me-3 fw-bold"
        >
          Show Pending
        </Button>
        <Button
          variant="outline-secondary"
          onClick={() => setDisplayedTasks('Completed')}
          className="me-2 fw-bold"

        >
          Show Completed
        </Button>
        <Button
          variant="outline-success"
          onClick={exportToCSV}
          className="ms-2 fw-bold"
        >
          Export Tasks to CSV
        </Button>
      </div>

      <Row className="w-100">
        <div className="table-responsive">
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned Users</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.dueDate}</td>
                    <td>{task.priority}</td>
                    <td>{task.status}</td>
                    <td>{task.assignedUsers.join(', ')}</td>
                    <td>
                      <Button variant="danger" onClick={() => deleteTask(index)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No {displayedTasks} tasks available.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Row>
    </Container>
  );
};

export default TaskList;
