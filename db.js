import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config();
const supabase=createClient(process.env.DATABASE_URL,process.env.ANON_KEY);

export default supabase;