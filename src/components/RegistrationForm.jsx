'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './RegistrationForm.module.css';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        emailAddress: '',
        mobileNumber: '',
        collegeName: '',
        department: '',
        yearOfStudy: '',
        cityState: '',
        participationType: 'Individual',
        teamMember2Name: '',
        teamMember2Department: '',
        teamMember2College: '',
        projectTitle: '',
        shortIdeaDescription: '',
        domainCategory: 'IT',
        githubLink: '',
        liveProjectUrl: '',
        videoLink: '',
        transactionId: '',
        paymentScreenshot: '',
        reportPdf: '',
        termsAgreed: false,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!data.success) throw new Error(data.error);

            setIsSubmitted(true);
        } catch (error) {
            console.error(error);
            alert("Registration failed: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className={`${styles.successCard} glass`}>
                <div className={styles.successIcon}>✓</div>
                <h2>Registration Successful!</h2>
                <p>Thank you for registering for Innovathon 2026. A confirmation email will be sent shortly.</p>
                <div className={styles.regId}>Registration ID: <span>INV-{Math.floor(1000 + Math.random() * 9000)}</span></div>
                <button onClick={() => window.location.href = '/'} className="glow-btn">Back to Home</button>
            </div>
        );
    }

    return (
        <form className={`${styles.form} glass`} onSubmit={handleSubmit}>
            <div className={styles.section}>
                <h3>Personal Details</h3>
                <div className={styles.formGrid}>
                    <div className={styles.inputGroup}>
                        <label>Full Name</label>
                        <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Email Address</label>
                        <input type="email" name="emailAddress" required value={formData.emailAddress} onChange={handleChange} placeholder="example@college.com" />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Mobile Number</label>
                        <input type="tel" name="mobileNumber" required value={formData.mobileNumber} onChange={handleChange} placeholder="10-digit mobile number" />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>City / State</label>
                        <input type="text" name="cityState" required value={formData.cityState} onChange={handleChange} placeholder="e.g. Bangalore, Karnataka" />
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h3>Academic Details</h3>
                <div className={styles.formGrid}>
                    <div className={styles.inputGroup}>
                        <label>College Name</label>
                        <input type="text" name="collegeName" required value={formData.collegeName} onChange={handleChange} placeholder="Enter your college name" />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Department</label>
                        <input type="text" name="department" required value={formData.department} onChange={handleChange} placeholder="e.g. CSE, IT, ECE" />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Year of Study</label>
                        <select name="yearOfStudy" required value={formData.yearOfStudy} onChange={handleChange}>
                            <option value="">Select Year</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h3>Participation Type</h3>
                <div className={styles.formGrid}>
                    <div className={styles.inputGroup}>
                        <label>Participation Type</label>
                        <select name="participationType" value={formData.participationType} onChange={handleChange}>
                            <option value="Individual">Individual</option>
                            <option value="Team of 2">Team of 2</option>
                        </select>
                    </div>
                </div>

                {formData.participationType === 'Team of 2' && (
                    <div className={`${styles.teamSection} glass`}>
                        <h4>Team Member 2 Details</h4>
                        <div className={styles.formGrid}>
                            <div className={styles.inputGroup}>
                                <label>Name</label>
                                <input type="text" name="teamMember2Name" required value={formData.teamMember2Name} onChange={handleChange} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Department</label>
                                <input type="text" name="teamMember2Department" required value={formData.teamMember2Department} onChange={handleChange} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>College</label>
                                <input type="text" name="teamMember2College" required value={formData.teamMember2College} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.section}>
                <h3>Project Details & Report</h3>
                <div className={styles.inputGroupFull}>
                    <label>Project / Idea Title</label>
                    <input type="text" name="projectTitle" required value={formData.projectTitle} onChange={handleChange} placeholder="Enter your project title" />
                </div>
                <div className={styles.inputGroupFull}>
                    <label>Short Idea Description</label>
                    <textarea name="shortIdeaDescription" required value={formData.shortIdeaDescription} onChange={handleChange} placeholder="Describe your idea and the problem it solves (min 100 characters)" rows="4"></textarea>
                </div>
                <div className={styles.formGrid}>
                    <div className={styles.inputGroup}>
                        <label>Domain / Category</label>
                        <select name="domainCategory" value={formData.domainCategory} onChange={handleChange}>
                            <option value="IT">IT</option>
                            <option value="AI">AI</option>
                            <option value="ML">ML</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Report Document (Drive/Cloud Link)</label>
                        <input type="url" name="reportPdf" required value={formData.reportPdf} onChange={handleChange} placeholder="https://drive.google.com/..." />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>GitHub Repository Link</label>
                        <input type="url" name="githubLink" value={formData.githubLink} onChange={handleChange} placeholder="https://github.com/..." />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Live Project URL</label>
                        <input type="url" name="liveProjectUrl" value={formData.liveProjectUrl} onChange={handleChange} placeholder="https://..." />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Project Video Link</label>
                        <input type="url" name="videoLink" value={formData.videoLink} onChange={handleChange} placeholder="Drive/YouTube link" />
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h3>Payment Verification (₹250)</h3>
                <div className={styles.paymentContainer}>
                    <div className={styles.qrCode}>
                        <div className={styles.qrImageWrapper}>
                            <Image 
                                src="/images/qr-scanner-final.png" 
                                alt="Payment QR Code" 
                                width={200} 
                                height={200}
                                className={styles.qrImage}
                            />
                        </div>
                        <div className={styles.upiDetails}>
                            <span className={styles.label}>UPI ID:</span>
                            <span className={styles.value}>6381091552@kotak</span>
                        </div>
                    </div>
                    <div className={styles.paymentInstructions}>
                        <p>1. Scan the QR code to pay the <strong>₹250</strong> registration fee.</p>
                        <p>2. Take a screenshot of the successful transaction.</p>
                        <p>3. Enter the Transaction ID and upload the screenshot below.</p>
                    </div>
                </div>
                <div className={styles.formGrid}>
                    <div className={styles.inputGroup}>
                        <label>Transaction ID / Reference Number</label>
                        <input type="text" name="transactionId" required value={formData.transactionId} onChange={handleChange} placeholder="Enter your transaction ID" />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Payment Screenshot (Drive Link)</label>
                        <input type="url" name="paymentScreenshot" required value={formData.paymentScreenshot} onChange={handleChange} placeholder="https://drive.google.com/..." />
                    </div>
                </div>
            </div>

            <div className={styles.checkboxGroup}>
                <input type="checkbox" name="termsAgreed" required checked={formData.termsAgreed} onChange={handleChange} id="terms" />
                <label htmlFor="terms">I agree that the idea is original and I accept the terms and conditions of Innovathon 2026.</label>
            </div>

            <button type="submit" className={`${styles.submitBtn} glow-btn`} disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Complete Registration'}
            </button>
        </form>
    );
};

export default RegistrationForm;
