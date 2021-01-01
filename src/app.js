const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const categoryRoutes = require("../routes/category-routes");
const noteRoutes = require("../routes/note-routes");
const verifyToken = require("../middlewares/verifyToken");
const authRoutes = require("../routes/auth-routes");
const profileRoutes = require("../routes/profile-routes");
const statusRoutes = require("../routes/status-routes");
const priorityRoutes = require("../routes/priority-routes");

class App {
  constructor() {
    this.app = express();
    this.config();
    this.main();
  }
  config() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(express.json());
    this.app.use(cors());
    this.port = process.env.PORT;
  }
  main() {
    this.app.use(statusRoutes.routes);
    this.app.use("/api", authRoutes.routes);
    this.app.use(verifyToken);
    this.app.use("/api", noteRoutes.routes);
    this.app.use("/api", statusRoutes.routes);
    this.app.use("/api", priorityRoutes.routes);
    this.app.use("/api", categoryRoutes.routes);
    this.app.use("/api", profileRoutes.routes);
  }
}

module.exports = { app: new App().app, port: new App().port };
