const express = require('express');
const app = express();
const employeeRoute = require('./routes/employeesRoute')
const educationRoute = require('./routes/educationRoute');
const profileRoute = require('./routes/employeeProfileRoute');
const familyRoute = require('./routes/employeeFamilyRoute');
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(employeeRoute);
app.use(educationRoute);
app.use(profileRoute);
app.use(familyRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
