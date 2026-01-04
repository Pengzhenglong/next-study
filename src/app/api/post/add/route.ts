import { withApiHandler } from "@/utils/withApiHandler";
import { NextRequest } from "next/server";
import { success } from "@/utils/apiResponse";

export const POST = withApiHandler(async (req: NextRequest) => {
  const reqBody = await req.json();
  return Response.json(
    success({}),
  );
});