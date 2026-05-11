import React, { useState, useRef, useEffect } from "react";
// import Typical from "react-typical";
import "./ContactMe.css";

import imgBack from "../../../src/images/mailz.jpeg";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import { toast } from "react-toastify";

const Result = () => {
  return (
    <p class="msg-status"> Your Message Has been successfully sent. I will contact you soon</p>
  )
}

export default function ContactMe(props) {
  const form = useRef();
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const sub = ScrollService.currentScreenFadeIn.subscribe((screen) => {
      if (screen.fadeInScreen !== props.id) return;
      Animations.animations.fadeInScreen(props.id);
    });
    return () => sub.unsubscribe();
  }, [props.id]);
  const [result, showResult] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault()

  //   const serviceId = 'service_zpmw66h';
  //   const templateId = 'template_u2ayfxa';
  //   const publicKey = 'RH8v6llJe5ihhMrv6'
  
  //   const templateParams = {
  //     from_name: name,
  //     from_email:email,
  //     to_name:'Mengot Duran',
  //     message:message
  //   }

  //   emailjs.send(serviceId, templateId, templateParams, publicKey)
  //   .then((response) => {
  //       setName('')
  //       setEmail('')
  //       setMessage('')
  //       console.log('Email was sent successfuly', response)
  //   }).catch((error) => {
  //     console.log('Error Sending Email', error)
  //   })
  // }

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://formspree.io/f/xvzllond', {
        method: 'POST',
        body: new FormData(form.current),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        toast.success('Message was submitted');
        e.target.reset();
        showResult(true);
      } else {
        toast.error('Message was not submitted');
      }
    } catch {
      toast.error('Message was not submitted');
    }

    setLoading(false);
  };


  return (
    <div className="main-container fade-in" id={props.id || ""}>
      <ScreenHeading subHeading={"Lets Keep In Touch"} title={"Contact Me"} />
      <div className="central-form">
        <div className="col">
          <h2 className="title">
            {/* <Typical loop={Infinity} steps={["Get In Touch 📧", 1000]} /> */}
            Get In Touch 📧
          </h2>{" "}
          <a href="#">
            <i className="fa fa-facebook-square"></i>
          </a>
          <a href="duranmegot801@gmail.com">
            <i className="fa fa-google-plus-square"></i>
          </a>
          <a href="https://www.instagram.com/mengot_duran/">
            <i className="fa fa-instagram"></i>
          </a>
          <a href="https://twitter.com/home">
            <i className="fa fa-twitter"></i>
          </a>
        </div>
        <div className="back-form">
          <div className="img-back">
            <h4>Send Your Email Here!</h4>
            <img src={imgBack} alt="image not found" />
          </div>
          <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="user_name" required />

            <label>Email</label>
            <input type="email" name="email" required/>

            <label>Message</label>
            <textarea type="text" name="message" required />

            {/* <div className="send-btn">
              <input type="submit" value="Send" />
            </div> */}
            <button disabled={loading ? true : false} type="send" className={loading ? 'disabled' : 'send-btn'}>{loading ? 'Loading...' : 'Send'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

