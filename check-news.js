const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://iryulmxbbrtqeioohexv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyeXVsbXhiYnJ0cWVpb29oZXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTU5NjQsImV4cCI6MjA5Mjg5MTk2NH0.vaMBc_fgGFh0rW_yk8imP7k0XO1d_tt9CG-CXR9KiZY";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkNews() {
  const { data, error } = await supabase.from("news").select("*");
  if (error) {
    console.error("Error:", error);
    return;
  }
  console.log(JSON.stringify(data, null, 2));
}

checkNews();
