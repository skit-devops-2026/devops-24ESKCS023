const Contact = require("../models/Contact");

// @route POST /api/contact
const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await Contact.create({ name, email, subject, message });
    res.status(201).json({ message: "Your message has been sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not send message" });
  }
};

module.exports = { sendMessage };
