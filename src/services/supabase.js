import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://riouxjduebosieuvqpuv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpb3V4amR1ZWJvc2lldXZxcHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwOTI3ODAsImV4cCI6MjA0NzY2ODc4MH0.MebPC1E0aFBMbrhxm3yq67uyJ_HAvUtNfylBaOyuOt8"
);
