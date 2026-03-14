const { createClient } = require('@supabase/supabase-js');

// On Vercel, environment variables are provided automatically via process.env.
// We only use dotenv for local development if a .env file is present.
try {
  require('dotenv').config();
} catch (e) {
  // Ignore error if dotenv is not found or fails
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

console.log('Supabase Connection Check:');
console.log('- SUPABASE_URL:', supabaseUrl ? 'FOUND (starts with ' + supabaseUrl.substring(0, 10) + '...)' : 'MISSING');
console.log('- SUPABASE_ANON_KEY:', supabaseKey ? 'FOUND' : 'MISSING');

if (!supabaseUrl || !supabaseKey) {
  console.error('CRITICAL: Supabase environment variables are missing!');
}

const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder'
);

module.exports = { supabase };
