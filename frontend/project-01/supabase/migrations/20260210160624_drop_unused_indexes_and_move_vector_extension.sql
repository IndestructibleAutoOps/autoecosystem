/*
  # Index Management and Extension Organization

  1. Index Review
    - Keep `idx_projects_user_id` and `idx_projects_updated_at` as they are used by API queries
    - Only drop indexes for tables that don't exist yet
  
  2. Extension Changes
    - Conditionally move `vector` extension from `public` schema to `extensions` schema only if it exists
  
  3. Notes
    - Indexes on projects table are kept because they support actual queries in app/api/projects/route.ts
    - Query pattern: SELECT * FROM projects WHERE user_id = ? ORDER BY updated_at DESC
    - Extension move is conditional to prevent migration failures
*/

-- Only attempt to move vector extension if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_extension WHERE extname = 'vector'
  ) THEN
    -- Move vector extension from public to extensions schema
    ALTER EXTENSION vector SET SCHEMA extensions;
  END IF;
END $$;
