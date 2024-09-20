import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Card, Button, Form, Nav, Row, Col } from 'react-bootstrap';

const TaskForm = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: 'Pending',
    assignedUsers: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title || !task.description || !task.dueDate || !task.assignedUsers) {
      setError("Please fill in all the required fields");
      return;
    }

    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const newTask = {
      title: task.title || `Task ${existingTasks.length + 1}`,
      description: task.description || `This is the description for task ${existingTasks.length + 1}`,
      dueDate: task.dueDate || new Date().toISOString().split('T')[0],
      priority: task.priority,
      status: task.status,
      assignedUsers: task.assignedUsers.split(',').map(user => user.trim()),
    };

    const updatedTasks = [...existingTasks, newTask];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    setTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'Low',
      status: 'Pending',
      assignedUsers: '',
    });

    navigate('/list');
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className="creat-box col-12  p-5">
          <Navbar expand="md" bg="light" variant="light" className="shadow p-3 mb-5">
            <Container fluid>
              <h3 className="fw-bold ms-2 me-5 text-dark">Add New Task</h3>
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

          <Col xs={12} md={6} lg={12} className="mb-3 ">
            <Form onSubmit={handleSubmit} className="p-5 border rounded">
              <Row className="mb-3">
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                      type="text"
                      value={task.title}
                      onChange={(e) => setTask({ ...task, title: e.target.value })}
                      placeholder="Enter task title"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Assigned Users:</Form.Label>
                    <Form.Control
                      type="text"
                      value={task.assignedUsers}
                      onChange={(e) => setTask({ ...task, assignedUsers: e.target.value })}
                      placeholder="Enter users (comma-separated)"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  as="textarea"
                  value={task.description}
                  onChange={(e) => setTask({ ...task, description: e.target.value })}
                  placeholder="Enter task description"
                  required
                />
              </Form.Group>

              <Row className="mb-3">
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Due Date:</Form.Label>
                    <Form.Control
                      type="date"
                      value={task.dueDate}
                      onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Priority:</Form.Label>
                    <Form.Select
                      value={task.priority}
                      onChange={(e) => setTask({ ...task, priority: e.target.value })}
                    >
                      <option value="">Select option</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Status:</Form.Label>
                    <Form.Select
                      value={task.status}
                      onChange={(e) => setTask({ ...task, status: e.target.value })}
                    >
                      <option value="">Select option</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {error && <p style={{ color: 'red' }}>{error}</p>}

              <Button type="submit" className="btn btn-primary">Add Task</Button>
            </Form>
          </Col>
        </Row>
      </Container>

    </>
  );
};

export default TaskForm;
