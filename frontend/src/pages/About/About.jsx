import React from 'react'
import aboutImage from '../../assets/about.webp';
import backgroundImage from  '../../assets/b2.jpg';
import './About.css';
import Banner from '../../components/Banner/Banner';
const About = () => {
  return (
    <>
    <Banner title="About us" backgroundImage={backgroundImage}/>
    <section className="about">
      <div className="about-img">
      <img src={aboutImage} alt="About us"/>
      </div>
      <div className="about-info">
        <h2 className="about-title">
          About Us
        </h2>
        <p className='about-text'><b>Empowering Learners, One Course at a Time</b> <br></br>

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


        <button className='aboutbtn'>Learn more</button>
      </div>

    </section>
      
    </>
  );
}

export default About;
