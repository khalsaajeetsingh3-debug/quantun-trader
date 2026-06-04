/*
  # Add Admin User Support

  1. Changes
    - Modify handle_new_user() to make the first user an admin
    - All subsequent users get 'user' role
  
  2. Security
    - Uses SECURITY DEFINER to allow the trigger to check profiles table
*/

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_count int;
BEGIN
  SELECT COUNT(*) INTO user_count FROM profiles;
  
  INSERT INTO profiles (id, email, full_name, referral_code, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    UPPER(SUBSTRING(MD5(RANDOM()::text) FROM 1 FOR 8)),
    CASE WHEN user_count = 0 THEN 'admin' ELSE 'user' END
  );
  RETURN NEW;
END;
$$;
