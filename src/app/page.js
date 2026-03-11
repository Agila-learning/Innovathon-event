import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Importance from '@/components/Importance';
import KeyAspects from '@/components/KeyAspects';
import Benefits from '@/components/Benefits';
import AnalysisParams from '@/components/AnalysisParams';
import ProgramProcedure from '@/components/ProgramProcedure';
import RegistrationDetails from '@/components/RegistrationDetails';
import Rewards from '@/components/Rewards';
import Fees from '@/components/Fees';
import ResultAnnouncement from '@/components/ResultAnnouncement';
import ParticipationProcedure from '@/components/ParticipationProcedure';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <div className="landing-container">
            <Nav />
            <Hero />
            <div id="about"><About /></div>
            <Importance />
            <KeyAspects />
            <div id="benefits"><Benefits /></div>
            <AnalysisParams />
            <div id="procedure"><ParticipationProcedure /></div>
            <RegistrationDetails />
            <Rewards />
            <Fees />
            <ResultAnnouncement />
            <Footer />
        </div>
    );
}
