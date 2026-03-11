import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Registration from '@/models/Registration';

export async function GET(req) {
    try {
        await dbConnect();
        // In a real app, verify admin token here
        const registrations = await Registration.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, registrations });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch registrations' }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        await dbConnect();
        const { id, updates } = await req.json();
        const updated = await Registration.findByIdAndUpdate(id, updates, { new: true });
        return NextResponse.json({ success: true, registration: updated });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update registration' }, { status: 500 });
    }
}
