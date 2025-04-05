import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-page">
      <header>
        <h1>Welcome to SecureBank</h1>
        <p>Your Trusted Banking Partner</p>
      </header>
      <main>
        <section className="hero">
          <h2>Banking Made Simple</h2>
          <p>Secure, reliable, and easy-to-use banking solutions</p>
          <Link to="/login" className="cta-button">
            Login to Your Account
          </Link>
        </section>
      </main>
    </div>
  );
}

export default LandingPage; 