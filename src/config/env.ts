import 'dotenv/config'
import {envSchema} from "./env.schema";
export interface Env {
    PORT: number;
    db: {
        url: string;
    }
}

interface RawEnv {
    PORT: string,
    DATABASE_URL: string,
}

const {error, value} = envSchema.validate(process.env);

if(error) {
    throw new Error(`Config validation error: ${error}`)
}

const envVars: RawEnv = value;

export const envConfig: Env = {
    PORT: +envVars.PORT || 3000,
    db: {
        url: process.env.DATABASE_URL || 'http://localhost',
    }
};