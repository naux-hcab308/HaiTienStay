const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://iryulmxbbrtqeioohexv.supabase.co";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyeXVsbXhiYnJ0cWVpb29oZXh2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzMxNTk2NCwiZXhwIjoyMDkyODkxOTY0fQ.37XCh86yR6DAJWDa4Ot7HN9_toTmE923RfEyVsszcPg";

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

async function setupBucket() {
  const bucketName = "assets";
  
  console.log("Checking if bucket exists...");
  const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets();
  if (listError) {
    console.error("Error listing buckets:", listError);
    return;
  }
  
  const bucketExists = buckets.some(b => b.name === bucketName);
  
  if (!bucketExists) {
    console.log(`Bucket '${bucketName}' not found. Creating it...`);
    const { data, error } = await supabaseAdmin.storage.createBucket(bucketName, {
      public: true, // Make it public so images can be viewed
      fileSizeLimit: 5242880, // 5MB limit
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']
    });
    
    if (error) {
      console.error("Error creating bucket:", error);
    } else {
      console.log("Bucket created successfully:", data);
    }
  } else {
    console.log(`Bucket '${bucketName}' already exists. Updating to public if necessary...`);
    // update bucket to public
    const { error } = await supabaseAdmin.storage.updateBucket(bucketName, {
      public: true
    });
    if (error) {
      console.log("Error updating bucket:", error);
    } else {
      console.log("Bucket updated to public.");
    }
  }
}

setupBucket();
