import { db } from "src/db";

const List = async () => {
  const applications = await db.application.findMany();

  return (
    <div>
      <pre>{JSON.stringify(applications, null, 2)}</pre>
    </div>
  )
}

export { List }