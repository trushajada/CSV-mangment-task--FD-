// csvUtils.js

export const exportToCSV = (tasks) => {
  const csvData = tasks.map(task => ({
    Title: task.title,
    Description: task.description,
    DueDate: task.dueDate,
    Priority: task.priority,
    Status: task.status
  }));

  const csvContent = 'data:text/csv;charset=utf-8,' +
    Object.keys(csvData[0]).join(',') + '\n' +
    csvData.map(row => Object.values(row).join(',')).join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'tasks.csv');
  document.body.appendChild(link);
  link.click();
};

export const importFromCSV = (file, callback) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    const rows = text.split('\n').slice(1); 
    const tasks = rows.map(row => {
      const [title, description, dueDate, priority, status] = row.split(',');
      return { title, description, dueDate, priority, status };
    });
    callback(tasks);
  };
  reader.readAsText(file);
};
