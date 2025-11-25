import neon from "@neondatabase/serverless";

import "dotenv/config";


//Creates a sql connection using our db url
export default sql = neon(process.env.DATABASE_URL);
