import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wogizsxjlhuzrcfqmhjv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvZ2l6c3hqbGh1enJjZnFtaGp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NTM2ODksImV4cCI6MjA4MDEyOTY4OX0.mZ2g8o_1BboRB1S2YDaDF-Dp1fIzmGE6ekP7fK4K-jI';

export const supabase = createClient(supabaseUrl, supabaseKey);