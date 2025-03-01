import { config } from "./config/config";
import app from "./app";
import { database } from "./config/database";
import { exec } from "child_process";

(function() {
  try {
    // Connecting to database
    const db = database.getConnection();

    // Log successful database connection
    db.connection.once('open', () => {
      console.log('🎉 MongoDB connection established successfully');
      console.log(`📅 Current server time: ${new Date().toISOString()}`);
      console.log(`🗄️ Connected to database: ${database.getConnection().connection.db?.databaseName}`);
    });

    const port = config.port;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    // exec('ipconfig', (err, stdout, stderr) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   console.info(stdout);
    // });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
