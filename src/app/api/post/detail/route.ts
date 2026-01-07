import { NextRequest } from 'next/server';
import { withApiHandler } from '@/utils/withApiHandler';
import { success, error } from '@/utils/apiResponse';
import clientPromise from '@/lib/mongodb';
import { DB_NAME } from '@/config/constants';

export const GET = withApiHandler(async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if(!id) {
        return Response.json(
            error('Post ID is required', 400),
            {status: 400}
        );
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection('posts');
    const post = await collection.findOne({ id });
    return Response.json(success(post), {
        status: 200
    });
})