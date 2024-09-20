import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext/TaskContext';

const Pagination = ({ totalTasks }) => {
  const { currentPage, setCurrentPage, tasksPerPage } = useContext(TaskContext);
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  return (
    <div>
      {Array.from({ length: totalPages }, (_, i) => (
        <button key={i} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
      ))}
    </div>
  );
};

export default Pagination;
