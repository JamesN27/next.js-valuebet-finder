import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();
const sql = postgres('postgres://valuebet:valuebet@localhost:5432/valuebet');
