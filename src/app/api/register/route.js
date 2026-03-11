import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Registration from '@/models/Registration';
import crypto from 'crypto';

import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();

        // Generate a unique registration ID
        const registrationId = `INV-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

        const newRegistration = new Registration({
            ...body,
            registrationId,
            paymentStatus: 'pending'
        });

        await newRegistration.save();

        // Google Sheets Sync
        try {
            const sheetData = {
                ...body,
                registrationId: newRegistration.registrationId,
                paymentScreenshotUrl: body.paymentScreenshot,
                reportPdfUrl: body.reportPdf,
                transactionId: body.transactionId
            };

            const response = await fetch('https://script.google.com/macros/s/AKfycbz1ynU7c6rJfglCfw4GjbRQ4-fNYXNAc06yJPQnD1Mn7030ku73wC2MnqQr4m28Z0xnZA/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sheetData),
                redirect: 'follow'
            });

            const resText = await response.text();
            console.log('Google Sheets Sync Response:', resText);
        } catch (sheetError) {
            console.error('Google Sheets Sync Error:', sheetError);
            // Don't fail the whole registration if sheet sync fails
        }

        return NextResponse.json({
            success: true,
            registrationId: newRegistration.registrationId,
            status: 'pending_verification'
        }, { status: 201 });

    } catch (error) {
        console.error('Registration Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to process registration' }, { status: 500 });
    }
}
