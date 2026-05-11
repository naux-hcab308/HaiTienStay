const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://iryulmxbbrtqeioohexv.supabase.co";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyeXVsbXhiYnJ0cWVpb29oZXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTU5NjQsImV4cCI6MjA5Mjg5MTk2NH0.vaMBc_fgGFh0rW_yk8imP7k0XO1d_tt9CG-CXR9KiZY";

const supabase = createClient(supabaseUrl, anonKey);

async function testUploadAnon() {
  const bucketName = "assets";
  const fileName = "images/test_anon.png";
  
  // Fake 1px PNG to bypass mime type check
  const fakePng = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", "base64");

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, fakePng, {
      contentType: 'image/png',
      upsert: true
    });

  if (error) {
    console.error("Anon Upload error details:", error);
  } else {
    console.log("Anon Upload success:", data);
  }
}

testUploadAnon();
