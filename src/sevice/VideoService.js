import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://uvdsrgzacndqthmtpxjs.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2ZHNyZ3phY25kcXRobXRweGpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyNTU4ODMsImV4cCI6MTk4MzgzMTg4M30.Y7nxHw7cea_hySLN2ZTOjCqMFEcfuB4N32NTkOetI8k";
const supabase = createClient(PROJECT_URL, API_KEY);

export function videoService() {
  return {
    getAllVideos() {
        return supabase
        .from("videos")
        .select("*")
    }
  };
}
