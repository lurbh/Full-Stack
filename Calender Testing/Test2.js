const xlsxFile = require('read-excel-file/node');

xlsxFile('./Jan FT 2024 Bells 2.xlsx')
    .then((rows) => {
    const columnNames = rows.shift(); // Separate first row with column names
    const objs = rows.map((row) => { // Map the rest of the rows into objects
      const obj = {}; // Create object literal for current row
      row.forEach((cell, i) => {
        obj[columnNames[i]] = cell; // Use index from current cell to get column name, add current cell to new object
      });
      return obj;
      console.log(objs); // Display the array of objects on the console
    });
  });