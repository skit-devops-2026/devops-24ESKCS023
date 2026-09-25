const About = () => {
  return (
    <div className="page-container about-page">
      <h1 className="page-title">About Digital Library</h1>
      <p>
        Digital Library is a Library built to demonstrate a full-stack Mern application.
        It allows an Admin to manage a collection of books, and lets users browse, search, and
        build their own personal digital library.
      </p>

      <h2>My Mission</h2>
      <p>
        My mission is to give users an easy and enjoyable way to discover and read digital
        books, all in one clean and simple platform.
      </p>

      <h2>Features</h2>
      <ul>
        <li>Search books by title, author or category</li>
        <li>Browse books by category</li>
        <li>Read available books digitally</li>
        <li>Build a personal library</li>
        <li>Track reading status for every book</li>
      </ul>

      <h2>Technologies Used</h2>
      <div className="tech-badges">
        <span>React.js</span>
        <span>Node.js</span>
        <span>Express.js</span>
        <span>MongoDB</span>
        <span>JavaScript</span>
        <span>CSS</span>
      </div>
    </div>
  );
};

export default About;
