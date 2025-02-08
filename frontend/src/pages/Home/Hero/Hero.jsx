import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-text">
          <h1>Welcome to LearnHub – Your Gateway to Knowledge!</h1>
          <p>
            At LearnHub, we believe in <b>transforming education</b> through interactive and engaging learning experiences. Whether you're looking to <b>upgrade your skills</b>, <b>learn something new</b>, or <b>advance your career</b>, we offer a wide range of <b>courses</b> tailored to your needs.
          </p>

          <h2>🌟 Why Choose LearnHub?</h2>
          <ul>
            <li>✔️ Expert Instructors</li>
            <li>✔️ Flexible Learning at Your Pace</li>
            <li>✔️ Interactive Courses & Assessments</li>
            <li>✔️ AI-Powered Chatbot Assistance</li>
            <li>✔️ Progress Tracking & Certifications</li>
          </ul>

          <div className="hero-buttons">
            <button className="primary-btn">Learn More</button>
            <button className="primary-btn">Enroll Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
