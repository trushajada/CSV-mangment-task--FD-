import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ priority: 'All' });

  return (
    <TaskContext.Provider value={{ tasks, setTasks, filters, setFilters }}>
      {children}
    </TaskContext.Provider>
  );
};
