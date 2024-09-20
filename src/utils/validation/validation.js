export const validateTask = (task) => {
    const errors = [];
    if (!task.title) errors.push('Title is required');
    if (!task.dueDate || new Date(task.dueDate) < new Date()) errors.push('Due date cannot be in the past');
    return errors;
  };
  
  export const validateCSVData = (tasks) => {
    const errors = [];
    const seenTitles = new Set();
  
    tasks.forEach((task, index) => {
      const taskErrors = validateTask(task);
      if (seenTitles.has(task.title)) taskErrors.push('Duplicate task title');
      seenTitles.add(task.title);
      if (taskErrors.length > 0) {
        errors.push({ row: index + 1, errors: taskErrors });
      }
    });
  
    return errors;
  };
  
  export const createErrorReportCSV = (errors) => {
    const headers = ['Row', 'Errors'];
    const csvContent = [
      headers,
      ...errors.map(err => [err.row, err.errors.join('; ')]),
    ].map(row => row.join(",")).join("\n");
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'error_report.csv';
    a.click();
  };
  