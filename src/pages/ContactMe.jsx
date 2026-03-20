import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { motion, AnimatePresence } from 'framer-motion';


const ContactMe = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const sendEmail = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setFeedback({ type: 'error', text: 'Please fill all fields!' });
      return;
    }

    setLoading(true);
    setFeedback({ type: '', text: '' });

    const templateParams = { from_name: name, from_email: email, message: message };

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        setLoading(false);
        setFeedback({ type: 'success', text: 'Message sent successfully!' });
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch(() => {
        setLoading(false);
        setFeedback({ type: 'error', text: 'Failed to send message. Try again.' });
      });
  };

  return (
    <div className='bg-bg-primary min-h-screen flex flex-col items-center text-text-primary font-sans border-bg-tertiary border-dotted border-2 border-t-0 gap-4'>
      <h1 className='text-2xl font-thin mb-8 mt-4 text-center'>Contact Me</h1>

      <motion.form
        className='bg-bg-buttons p-6 rounded-2xl flex flex-col gap-6 w-[90%] md:w-[50%] shadow-lg items-center mb-28 text-text-primary'
        onSubmit={sendEmail}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='px-4 py-2 shadow-xl rounded-lg bg-bg-buttons2 outline-none w-full md:w-[60%] '
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='px-4 py-2 shadow-xl rounded-lg bg-bg-buttons2 outline-none w-full md:w-[60%] '
        />

        <textarea
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='px-4 py-2 shadow-xl rounded-lg bg-bg-buttons2 outline-none w-full h-32 resize-none md:w-[60%] '
        />

        <AnimatePresence>
          {feedback.text && (
            <motion.p
              key={feedback.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className={`text-center ${feedback.type === 'success' ? 'text-green-500' : 'text-red-500'}`}
            >
              {feedback.text}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 shadow-xl active:scale-95 hover:shadow-2xl rounded-lg bg-bg-buttons2 hover:bg-opacity-80 transition duration-300 w-full md:w-[40%] mx-auto flex justify-center items-center gap-2`}
          animate={feedback.type === 'error' ? { x: [0, -5, 5, -5, 5, 0] } : {}}
          transition={{ duration: 0.3 }}
        >
          {loading ? (
            <span className='animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5'></span>
          ) : (
            'Send Message'
          )}
        </motion.button>
      </motion.form>
      
    </div>
  );
};

export default ContactMe;
