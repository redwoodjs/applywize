import { RequestInfo } from "@redwoodjs/sdk/worker";
import { DatePicker } from "@/app/components/ui/DatePicker";

export function Home({ ctx }: RequestInfo) {
  return (
    <div>
      <h1 className="text-4xl font-bold text-red-500">YOLO</h1>
      <p>
        {ctx.user?.username
          ? `You are logged in as user ${ctx.user.username}`
          : "You are not logged in"}
      </p>
      <DatePicker />
    </div>
  );
}
