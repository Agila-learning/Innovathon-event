import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Setting from '@/models/Setting';

export async function GET() {
    await dbConnect();
    const settings = await Setting.find({});
    return NextResponse.json({ success: true, settings });
}

export async function POST(req) {
    try {
        await dbConnect();
        const { key, value } = await req.json();
        const setting = await Setting.findOneAndUpdate(
            { key },
            { value },
            { upsert: true, new: true }
        );
        return NextResponse.json({ success: true, setting });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update setting' }, { status: 500 });
    }
}
