// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://ltlqjnvddmrulbtuxlui.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0bHFqbnZkZG1ydWxidHV4bHVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0NjYwODQsImV4cCI6MjA0ODA0MjA4NH0.QARBOkDtZ0P0G3KUvXwMMomdhF7ApLWOlutRLxLFs30";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);