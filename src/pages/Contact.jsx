import React from "react";
import Navbar from "../components/Navbar";
import "./Contact.css";

const Contact = () => {
  function handleSubmit(e) {
    e.preventDefault();
    alert("Message sent! (Not, really... but the form works 🤪 )");
  }

  return (
    <div className="contact">
      <Navbar />

      <div className="contact__bg">
        <img
          src="/dbom_background.png"
          alt=""
          className="contact__bg-img"
        />
      </div>

      <div className="contact__content">
        <div className="contact__card">
          <h1 className="contact__title">Contact Us</h1>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__field">
              <label htmlFor="name" className="contact__label">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="contact__input"
                placeholder="Your name..."
                required
              />
            </div>

            <div className="contact__field">
              <label htmlFor="email" className="contact__label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="contact__input"
                placeholder="Your email..."
                required
              />
            </div>

            <div className="contact__field">
              <label htmlFor="message" className="contact__label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="contact__textarea"
                placeholder="Your message..."
                rows={5}
                required
              />
            </div>

            <button type="submit" className="btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;