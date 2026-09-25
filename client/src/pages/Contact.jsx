import { useState } from "react";
import api from "../services/api";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name || !form.email || !form.subject || !form.message) return "All fields are required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email address.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setSuccess("");
      return;
    }
    try {
      await api.post("/contact", form);
      setSuccess("Your message has been sent successfully.");
      setError("");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Could not send your message.");
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Contact Us</h1>

      <div className="contact-layout">
        <form className="contact-form" onSubmit={handleSubmit}>
          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} />

          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} />

          <label>Subject</label>
          <input name="subject" value={form.subject} onChange={handleChange} />

          <label>Message</label>
          <textarea name="message" rows="5" value={form.message} onChange={handleChange}></textarea>

          <button type="submit" className="btn-filled" style={{ marginTop: "1rem" }}>Send Message</button>
        </form>

        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>📧 adityasoni1377272@digitallibrary.com</p>
          <p>📞 +91 89057 39341</p>
          <p>📍 Swami Keshvanand Institute of Technology,
Management & Gramothan, Jaipur</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
