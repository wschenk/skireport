import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { getMohawkStatus } from "./mohawk.ts";

console.log("Listening on http://localhost:8000");
serve(async (_req) => {
  const status = await getMohawkStatus()
  
  return new Response(JSON.stringify(status), {
    headers: { "content-type": "text/plain" },
  });
});