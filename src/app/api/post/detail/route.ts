import { NextRequest } from 'next/server';
import { withApiHandler } from '@/utils/withApiHandler';
import { success, error } from '@/utils/apiResponse';


export const GET = withApiHandler(async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if(!id) {
        return Response.json(
            error('Post ID is required', 400),
            {status: 400}
        );
    }
})