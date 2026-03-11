import './globals.css';

export const metadata = {
    title: 'Innovathon 2026 | Antigraviity',
    description: 'The Innovation Event by Antigraviity. Your idea today could become tomorrow’s revolution.',
    openGraph: {
        title: 'Innovathon 2026',
        description: 'A Pan India innovation competition organized by Antigraviity.',
        images: ['/og-image.jpg'], // Placeholder for later
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <main>{children}</main>
            </body>
        </html>
    );
}
