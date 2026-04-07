# MongoDB Connection Fix - TODO

- [x] Step 1: Update server/config/db.js (remove family:4, improve options)
- [x] Step 2: Update server/index.js (import/use connectDB, remove duplicate connect)
- [ ] Step 3: User updates server/.env with standard MongoDB URI
- [ ] Step 4: Test with `cd server && npm run dev`
- [ ] Step 5: Verify Atlas settings (IP whitelist 0.0.0.0/0, cluster active)

✅ Steps 1-2 complete: Code updated to use centralized connectDB without IPv6 force.

Remaining:
- [ ] Step 3: Update server/.env MONGO_URI to standard format (mongodb:// not mongodb+srv://)
- [ ] Step 4: Test connection
