// configuration file for all types of env variables imports 
import { config as conf } from 'dotenv';

// Load .env variables
conf();

const _config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.MONGODB_URI || '',
  env: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'jwt',
};


// Export and freeze the object to avoid overriding 
export const config = Object.freeze(_config); 
