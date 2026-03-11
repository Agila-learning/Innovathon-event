import mongoose from 'mongoose';

const RegistrationSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    emailAddress: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    collegeName: { type: String, required: true },
    department: { type: String, required: true },
    yearOfStudy: { type: String, required: true },
    cityState: { type: String, required: true },
    participationType: { type: String, enum: ['Individual', 'Team of 2'], required: true },
    teamMember2: {
        name: String,
        department: String,
        college: String
    },
    projectTitle: { type: String, required: true },
    shortIdeaDescription: { type: String, required: true },
    domainCategory: { type: String, required: true },
    githubLink: String,
    liveProjectUrl: String,
    videoLink: String,
    transactionId: { type: String, required: true },
    paymentScreenshot: String, // URL/Path to file
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    shortlisted: { type: Boolean, default: false },
    reportPdf: { type: String }, // Store URL or path to the PDF
    registrationId: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Registration || mongoose.model('Registration', RegistrationSchema);
