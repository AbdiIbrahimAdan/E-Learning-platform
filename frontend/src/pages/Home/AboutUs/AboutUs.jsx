import React from 'react'
import './AboutUs.css'
import aboutHome from './../../../assets/back.webp';
const AboutUs = () => {
  return (
    <section className='about-us'>
        <div className="container">
            <div className="about-content">
                <div className="about-text">
                    <h2>About Us</h2>

                    <p>Empowering Learners, One Course at a Time

LearnHub is a cutting-edge e-learning platform designed to bridge the gap between education and opportunity. Our mission is to make high-quality learning accessible to everyone, anywhere in the world.

<h3>🎯 Our Vision</h3>
To create an innovative learning space that empowers individuals with the knowledge and skills they need to succeed.

<h3>📚 What We Offer</h3>
<ul>
<li>A vast library of interactive courses</li>
<li>Expert instructors guiding your learning journey</li>
<li>Real-time progress tracking and certifications</li>
<li>AI-powered chatbot assistance for quick help</li>
<li>A supportive community of learners</li>
</ul>
At LearnHub, we are committed to making learning engaging, accessible, and effective for all. Join us and unlock your potential today! 💡📖✨
</p>

                </div>
                <div className="about-image">
                 <img src={aboutHome} alt="About Us" />
                </div>
            </div>
        </div>
    </section>
  );
};

export default AboutUs;
