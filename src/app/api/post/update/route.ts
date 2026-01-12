import { withApiHandler } from "@/utils/withApiHandler";
import { error, success } from "@/utils/apiResponse";
import { NextRequest } from "next/server";
import { BUSINESS_STATUS_CODE, DB_NAME } from "@/config/constants";
import clientPromise from "@/lib/mongodb";

export const POST = withApiHandler(async (req: NextRequest) => {
  const body = await req.json();
  const { id, title, content } = body;
  if (!id || !title || !content) {
    return Response.json(
      error("ID, title and content are required", BUSINESS_STATUS_CODE.WARNING),
      { status: 400 },
    );
  }
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection("posts");
  const result = await collection.updateOne(
    { id },
    { $set: { title, content, updatedAt: new Date().getTime() } }
  );

  if (result.matchedCount === 0) {
    return Response.json(
     error("Post not found", BUSINESS_STATUS_CODE.WARNING),
     { status: 404 },
   );
 }

  return Response.json(success({}), {
    status: 200,
  });
});
