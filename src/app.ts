import express, { Application, Request, Response } from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.middleware";
import { database } from "./config/database";
import routes from "./routes/v1";

const app: Application = express();

const corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type']
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.get('/', (req, res) => {
  res.send('<H1>Maharashtra Orthopeodic Association</H1>');
})

app.get('/health', async (req, res) => {
  try {
    const dbState = database.getConnection().connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      database: {
        state: states[dbState as keyof typeof states],
        name: database.getConnection().connection.db?.databaseName
      },
      server: {
        time: new Date().toISOString(),
        user: 'hamshad'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking health status',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});


// API Routes
app.use('/api/v1/', routes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
    path: req.path
  });
});


app.use(errorMiddleware);

export default app;
