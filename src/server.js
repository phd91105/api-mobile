const { app, port } = require("./app");

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
