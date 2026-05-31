import { createClient } from "@supabase/supabase-js";

// Make sure to add these to your .env.local file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://bcrjqtuachwvmnucgyfd.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjcmpxdHVhY2h3dm1udWNneWZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyMDk5ODYsImV4cCI6MjA5NTc4NTk4Nn0.uvyfbvgnVSp3YKaKzcNwzUrZ2VKY1fAltPEc_KRl5Ro";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
