import Contact from '../../components/Contact/Contact.jsx';

function ContactPage() {
  return (
    <div className="contact-page">
      <div className="background-overlay"></div> 

      <div className="contact-header">
        <h1 className="contact-title">Contacto</h1>
        <p className="contact-subtitle-page">Tu consulta</p>
      </div>

      <Contact />
    </div>
  );
}

export default ContactPage;