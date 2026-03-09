

## Fix: RLS Policy on `booking_com_settings`

The error "new row violates row-level security policy" occurs because both RLS policies on `booking_com_settings` are set as **restrictive** (`Permissive: No`). In Postgres, you need at least one **permissive** policy for access to be granted — restrictive policies alone always deny.

### Fix
Drop both existing policies and recreate them as **permissive**:

```sql
DROP POLICY "Allow anon read for sync" ON public.booking_com_settings;
DROP POLICY "Allow authenticated full access" ON public.booking_com_settings;

CREATE POLICY "Allow anon read for sync" ON public.booking_com_settings
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow authenticated full access" ON public.booking_com_settings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
```

This is a single database migration — no code changes needed.

