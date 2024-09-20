import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext/TaskContext';

const FilterSort = () => {
  const { filters, setFilters } = useContext(TaskContext);

  return (
    <div>
      <label>
        Status:
        <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </label>
      <label>
        Priority:
        <select value={filters.priority} onChange={(e) => setFilters({ ...filters, priority: e.target.value })}>
          <option value="">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </label>
    </div>
  );
};

export default FilterSort;
