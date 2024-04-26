import React from "react";
import "../css/bootstrap.css";

import "../css/style.css";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
const Home = () => {
  return (
    <div>
      <>
        <div className="hero_area">
          <div className="hero_bg_box">
            <div className="bg_img_box">
              <img src="images/hero-bg.png" alt="" />
            </div>
          </div>
          {/* header section strats */}
          <header className="header_section">
            <div className="container-fluid">
              
              <nav className="navbar navbar-expand-lg custom_nav-container ">
                <a className="navbar-brand" href="index.html">
                  <img
                    src="images/logo.png"
                    alt=""
                    style={{ height: "50px" }}
                  />
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className=""> </span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav  ">
                    <li className="nav-item active">
                      <a className="nav-link" href="index.html">
                        Home <span className="sr-only">(current)</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#about">
                        About
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#services">
                        Services<onfocus></onfocus>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#why">
                        Why Us
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#team">
                        Team
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        {" "}
                        <i className="fa fa-user" aria-hidden="true" />{" "}
                        <Link to="/login">Login</Link>
                      </a>
                    </li>
                    <form className="form-inline">
                      <button
                        className="btn  my-2 my-sm-0 nav_search-btn"
                        type="submit"
                      >
                        <i className="fa fa-search" aria-hidden="true" />
                      </button>
                    </form>
                  </ul>
                </div>
              </nav>
            </div>
          </header>
          {/* end header section */}
          {/* slider section */}
          <section className="slider_section ">
            <div
              id="customCarousel1"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="container ">
                    <div className="row">
                      <div className="col-md-6 ">
                        <div className="detail-box">
                          <h1>
                            Welcome to <br />
                            ICT Internship
                          </h1>
                          <p>
                            Embark on a journey with us as we bridge the gap
                            between aspiring talent and cutting-edge technology
                            companies. Whether you're a student eager to dive
                            into the dynamic world of information and
                            communication technology or an organization seeking
                            fresh perspectives, you've come to the right place.
                          </p>
                          <div className="btn-box">
                            <a href="" className="btn1">
                              Read More
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="img-box">
                          <img src="images/slider-img.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item ">
                  <div className="container ">
                    <div className="row">
                      <div className="col-md-6 ">
                        <div className="detail-box">
                          <h1>
                            Crypto <br />
                            Currency
                          </h1>
                          <p>
                            Explicabo esse amet tempora quibusdam laudantium,
                            laborum eaque magnam fugiat hic? Esse dicta aliquid
                            error repudiandae earum suscipit fugiat molestias,
                            veniam, vel architecto veritatis delectus repellat
                            modi impedit sequi.
                          </p>
                          <div className="btn-box">
                            <a href="" className="btn1">
                              Read More
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="img-box">
                          <img src="../public/images/slider-img.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="container ">
                    <div className="row">
                      <div className="col-md-6 ">
                        <div className="detail-box">
                          <h1>
                            Crypto <br />
                            Currency
                          </h1>
                          <p>
                            Explicabo esse amet tempora quibusdam laudantium,
                            laborum eaque magnam fugiat hic? Esse dicta aliquid
                            error repudiandae earum suscipit fugiat molestias,
                            veniam, vel architecto veritatis delectus repellat
                            modi impedit sequi.
                          </p>
                          <div className="btn-box">
                            <a href="" className="btn1">
                              Read More
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="img-box">
                          <img src="../public/images/slider-img.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ol className="carousel-indicators">
                <li
                  data-target="#customCarousel1"
                  data-slide-to={0}
                  className="active"
                />
                <li data-target="#customCarousel1" data-slide-to={1} />
                <li data-target="#customCarousel1" data-slide-to={2} />
              </ol>
            </div>
          </section>
          {/* end slider section */}
        </div>
        {/* service section */}
        <section id='services' className="service_section layout_padding">
          <div className="service_container">
            <div className="container ">
              <div className="heading_container heading_center">
                <h2>
                  Our <span>Services</span>
                </h2>
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration
                </p>
              </div>
              <div className="row">
                <div className="col-md-4 ">
                  <div className="box ">
                    <div className="img-box">
                      <img src="images/s1.png" alt="" />
                    </div>
                    <div className="detail-box">
                      <h5>Pay with low price</h5>
                      <p>
                        We are giving you the best internship prograam with low
                        price value with much higher knowledge
                      </p>
                      <a href="">Read More</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 ">
                  <div className="box ">
                    <div className="img-box">
                      <img src="images/s2.png" alt="" />
                    </div>
                    <div className="detail-box">
                      <h5>Group project</h5>
                      <p>
                        You have to complete a project which will hwllp you to
                        create a core understanding of which program you are
                        selecting
                      </p>
                      <a href="">Read More</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 ">
                  <div className="box ">
                    <div className="img-box">
                      <img src="images/s3.png" alt="" />
                    </div>
                    <div className="detail-box">
                      <h5>Expert Support</h5>
                      <p>
                        We have the best support team to support the students.
                        They have more than 5 years of experience in IT field
                      </p>
                      <a href="">Read More</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="btn-box">
                <a href="">View All</a>
              </div>
            </div>
          </div>
        </section>
        {/* end service section */}
        {/* about section */}
        <section id='about' className="about_section layout_padding">
          <div className="container  ">
            <div className="heading_container heading_center">
              <h2>
                About <span>Us</span>
              </h2>
              <p>
                Magni quod blanditiis non minus sed aut voluptatum illum
                quisquam aspernatur ullam vel beatae rerum ipsum voluptatibus
              </p>
            </div>
            <div className="row">
              <div className="col-md-3 ">
                <div className="img-box">
                  <img src="../public/images/about-img.png" alt="" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="detail-box">
                  <h3>We Are ICT</h3>
                  <p>
                    At our internship program, we're dedicated to nurturing the
                    next generation of ICT professionals, equipping them with
                    the essential skills and knowledge required to thrive in
                    today's dynamic and technology-centric landscape. Whether
                    you're passionate about software development, network
                    administration, cybersecurity, or data analytics, our
                    comprehensive program offers an array of opportunities to
                    delve into various facets of the ICT field.
                  </p>
                  <p>
                    We understand the importance of staying abreast of industry
                    best practices and emerging trends. That's why our
                    internship program emphasizes exposure to real-world
                    challenges and scenarios, allowing you to gain invaluable
                    insights into how ICT solutions are designed, implemented,
                    and optimized in today's business environment. From agile
                    development methodologies to robust cybersecurity protocols,
                    you'll have the opportunity to learn from the best and
                    sharpen your skills in alignment with industry standards.
                  </p>
                  <a href="" className="about">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end about section */}
        {/* why section */}
        <section id='why' className="why_section layout_padding">
          <div className="container">
            <div className="heading_container heading_center">
              <h2>
                Why Choose <span>Us</span>
              </h2>
            </div>
            <div className="why_container">
              <div className="box">
                <div className="img-box">
                  <img src="images/w1.png" alt="" />
                </div>
                <div className="detail-box">
                  <h5>Expert Management</h5>
                  <p>
                    Our internship program is meticulously designed to offer a
                    comprehensive learning experience, covering a wide range of
                    ICT disciplines such as software development, network
                    administration, cybersecurity, and data analytics. Whether
                    you're a novice or an experienced learner, our program
                    caters to individuals at all skill levels, providing ample
                    opportunities to enhance your expertise and expand your
                    knowledge horizons.
                  </p>
                </div>
              </div>
              <div className="box">
                <div className="img-box">
                  <img src="images/w2.png" alt="" />
                </div>
                <div className="detail-box">
                  <h5>Low Payment</h5>
                  <p>
                    Our internship program is committed to breaking down
                    barriers to entry and making valuable learning experiences
                    in the ICT field accessible to all. With our low-cost
                    structure, we offer an affordable alternative for aspiring
                    ICT professionals who may be constrained by financial
                    limitations but are eager to pursue their passion for
                    technology and gain practical skills that can propel their
                    careers forward.
                  </p>
                </div>
              </div>
              <div className="box">
                <div className="img-box">
                  <img src="images/w3.png" alt="" />
                </div>
                <div className="detail-box">
                  <h5>Opportunity for Growth</h5>
                  <p>
                    Our affordable internship program isn't just about
                    affordability—it's about providing an opportunity for growth
                    and advancement in the ICT field. By joining our program,
                    you'll gain access to valuable resources, mentorship, and
                    hands-on experience that can help you build a solid
                    foundation for a successful career in technology, regardless
                    of your financial background or socioeconomic status.
                  </p>
                </div>
              </div>
              <div className="box">
                <div className="img-box">
                  <img src="images/w4.png" alt="" />
                </div>
                <div className="detail-box">
                  <h5>Expert Mentorship</h5>
                  <p>
                    Certainly! Here's an expanded section on mentorship within
                    your affordable internship program: Expert Mentorship:
                    Guiding Your Path to Success At our affordable internship
                    program, mentorship is at the heart of our commitment to
                    your professional growth and development. We believe that
                    personalized guidance and support from experienced industry
                    professionals are essential ingredients for your success in
                    the dynamic field of ICT. That's why we've curated a team of
                    dedicated mentors who are passionate about sharing their
                    knowledge, insights, and experiences to help you navigate
                    your internship journey with confidence and clarity.
                  </p>
                </div>
              </div>
            </div>
            <div className="btn-box">
              <a href="">Read More</a>
            </div>
          </div>
        </section>
        {/* end why section */}
        {/* team section */}
        <section id="team" className="team_section layout_padding">
          <div className="container-fluid">
            <div className="heading_container heading_center">
              <h2 className="">
                Our <span> Team</span>
              </h2>
            </div>
            <div className="team_container">
              <div className="row">
                <div className="col-lg-3 col-sm-6">
                  <div className="box ">
                    <div className="img-box">
                      <img src="images/team-1.jpg" className="img1" alt="" />
                    </div>
                    <div className="detail-box">
                      <h5>Joseph Brown</h5>
                      <p>MERN STACK</p>
                    </div>
                    <div className="social_box">
                      <a href="#">
                        <i className="fa fa-facebook" aria-hidden="true" />
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter" aria-hidden="true" />
                      </a>
                      <a href="#">
                        <i className="fa fa-linkedin" aria-hidden="true" />
                      </a>
                      <a href="#">
                        <i className="fa fa-instagram" aria-hidden="true" />
                      </a>
                      <a href="#">
                        <i className="fa fa-youtube-play" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <div className="box ">
                    <div className="img-box">
                      <img src="images/team-2.jpg" className="img1" alt="" />
                    </div>
                    <div className="detail-box">
                      <h5>Nancy White</h5>
                      <p>PYTHON DJANGO</p>
                    </div>
                    <div className="social_box">
                      <a href="#">
                        <i className="fa fa-facebook" aria-hidden="true" />
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter" aria-hidden="true" />
                      </a>
                      <a href="#">
                        <i className="fa fa-linkedin" aria-hidden="true" />
                      </a>
                      <a href="#">
                        <i className="fa fa-instagram" aria-hidden="true" />
                      </a>
                      <a href="#">
                        <i className="fa fa-youtube-play" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <div className="box ">
                    <div className="img-box">
                      <img src="/images/team-3.jpg" className="img1" alt="" />
                    </div>
                    <div className="detail-box">
                      <h5>Earl Martinez</h5>
                      <p>MACHINE LEARNING</p>
                    </div>
                    <div className="social_box">
                      <a href="#">
                        <i className="fa fa-facebook" aria-hidden="true" />
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter" aria-hidden="true" />
                      </a>
                      <a href="#">
                        <i className="fa fa-linkedin" aria-hidden="true" />
                      </a>
                      <a href="#">
                        <i className="fa fa-instagram" aria-hidden="true" />
                      </a>
                      <a href="#">
                        <i className="fa fa-youtube-play" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <div className="box ">
                    <div className="img-box">
                      <img src="images/team-4.jpg" className="img1" alt="" />
                    </div>
                    <div className="detail-box">
                      <h5>Josephine Allard</h5>
                      <p>DATA SCIENCE</p>
                    </div>
                    <div className="social_box">
                      <a href="#">
                        <i className="fa fa-facebook" aria-hidden="true" />
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter" aria-hidden="true" />
                      </a>
                      <a href="#">
                        <i className="fa fa-linkedin" aria-hidden="true" />
                      </a>
                      <a href="#">
                        <i className="fa fa-instagram" aria-hidden="true" />
                      </a>
                      <a href="#">
                        <i className="fa fa-youtube-play" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end team section */}
        {/* client section */}
        <section className="client_section layout_padding">
          <div className="container">
            <div className="heading_container heading_center psudo_white_primary mb_45">
              <h2>
                What says our <span>STUDENTS</span>
              </h2>
            </div>
            <div className="carousel-wrap ">
              <div className="owl-carousel client_owl-carousel">
                <div className="item">
                  <div className="box">
                    <div className="img-box">
                      <img
                        src="../public/images/client1.jpg"
                        alt=""
                        className="box-img"
                      />
                    </div>
                    <div className="detail-box">
                      <div className="client_id">
                        <div className="client_info">
                          <h6>LusDen</h6>
                          <p>magna aliqua. Ut</p>
                        </div>
                        <i className="fa fa-quote-left" aria-hidden="true" />
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="box">
                    <div className="img-box">
                      <img
                        src="../public/images/client2.jpg"
                        alt=""
                        className="box-img"
                      />
                    </div>
                    <div className="detail-box">
                      <div className="client_id">
                        <div className="client_info">
                          <h6>Zen Court</h6>
                          <p>magna aliqua. Ut</p>
                        </div>
                        <i className="fa fa-quote-left" aria-hidden="true" />
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="box">
                    <div className="img-box">
                      <img
                        src="../public/images/client1.jpg"
                        alt=""
                        className="box-img"
                      />
                    </div>
                    <div className="detail-box">
                      <div className="client_id">
                        <div className="client_info">
                          <h6>LusDen</h6>
                          <p>magna aliqua. Ut</p>
                        </div>
                        <i className="fa fa-quote-left" aria-hidden="true" />
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="box">
                    <div className="img-box">
                      <img
                        src="../public/images/client2.jpg"
                        alt=""
                        className="box-img"
                      />
                    </div>
                    <div className="detail-box">
                      <div className="client_id">
                        <div className="client_info">
                          <h6>Zen Court</h6>
                          <p>magna aliqua. Ut</p>
                        </div>
                        <i className="fa fa-quote-left" aria-hidden="true" />
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end client section */}
        {/* info section */}
        <section className="info_section layout_padding2">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-3 info_col">
                <div className="info_contact">
                  <h4>Address</h4>
                  <div className="contact_link_box">
                    <a href="">
                      <i className="fa fa-map-marker" aria-hidden="true" />
                      <span>Location</span>
                    </a>
                    <a href="">
                      <i className="fa fa-phone" aria-hidden="true" />
                      <span>Call +01 1234567890</span>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope" aria-hidden="true" />
                      <span>demo@gmail.com</span>
                    </a>
                  </div>
                </div>
                <div className="info_social">
                  <a href="">
                    <i className="fa fa-facebook" aria-hidden="true" />
                  </a>
                  <a href="">
                    <i className="fa fa-twitter" aria-hidden="true" />
                  </a>
                  <a href="">
                    <i className="fa fa-linkedin" aria-hidden="true" />
                  </a>
                  <a href="">
                    <i className="fa fa-instagram" aria-hidden="true" />
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 info_col">
                <div className="info_detail">
                  <h4>Info</h4>
                  <p>
                    necessary, making this the first true generator on the
                    Internet. It uses a dictionary of over 200 Latin words,
                    combined with a handful
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-2 mx-auto info_col">
                <div className="info_link_box">
                  <h4>Links</h4>
                  <div className="info_links">
                    <a className="active" href="index.html">
                      Home
                    </a>
                    <a className="" href="about.html">
                      About
                    </a>
                    <a className="" href="service.html">
                      Services
                    </a>
                    <a className="" href="why.html">
                      Why Us
                    </a>
                    <a className="" href="team.html">
                      Team
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 info_col ">
                <h4>Subscribe</h4>
                <form action="#">
                  <input type="text" placeholder="Enter email" />
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* end info section */}
        {/* footer section */}
        <section className="footer_section">
          <div className="container">
            <p>
              © <span id="displayYear" /> All Rights Reserved By
              <a href="https://html.design/">Free Html Templates</a>
            </p>
          </div>
        </section>
      </>
    </div>
  );
};

export default Home;
