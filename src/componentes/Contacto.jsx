import React from 'react';

const Contacto = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Contact Us</h2>
      <form style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="message">Message:</label>
          <textarea id="message" name="message" style={styles.textarea} rows="5"></textarea>
        </div>
        <button type="submit" style={styles.button}>Send Message</button>
        
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontSize: '16px',
    color: '#555',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    width: '100%',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    width: '100%',
    resize: 'vertical',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};

export default Contacto;
