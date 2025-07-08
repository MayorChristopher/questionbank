import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://debescctuqegxpmflerg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlYmVzY2N0dXFlZ3hwbWZsZXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MjU3MDUsImV4cCI6MjA2NzMwMTcwNX0.0HYDeqrlvyTHO5CzlbjwZKh1i_B3NR0dtxfxZ993pLo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);