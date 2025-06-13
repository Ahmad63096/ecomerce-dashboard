// import React, { useState } from 'react';
// import { Button, Modal } from 'react-bootstrap';

// function GreetingMessage() {
//   const [show, setShow] = useState(false);
//   const [activeModal, setActiveModal] = useState('');
//   const [formData, setFormData] = useState({
//     greetings_message: '',
//     farewell_message: '',
//   });
//   const [responseMessage, setResponseMessage] = useState('');
//   const [validationMessage, setValidationMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (activeModal === 'greeting' && !formData.greetings_message) {
//       setValidationMessage('Greeting message is required.');
//       return;
//     }
//     if (activeModal === 'farewell' && !formData.farewell_message) {
//       setValidationMessage('Farewell message is required.');
//       return;
//     }

//     setValidationMessage('');

//     try {
//       const response = await fetch(process.env.REACT_APP_API_GRETTINGURL, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setResponseMessage('Message updated successfully!');
//         console.log('Response:', data);

//         setFormData({
//           greetings_message: '',
//           farewell_message: '',
//         });

//         setShow(false);
//       } else {
//         setResponseMessage('Failed to update messages.');
//         console.error('Failed to submit:', response.statusText);
//       }
//     } catch (error) {
//       setResponseMessage('Error submitting the form.');
//       console.error('Error:', error);
//     }
//   };

//   const handleClose = () => {
//     setShow(false);
//     setValidationMessage('');
//   };

//   const handleShow = (modalType) => {
//     setActiveModal(modalType);
//     setShow(true);
//     setValidationMessage('');
//   };

//   return (
//     <div>
//       <Button variant="primary" onClick={() => handleShow('greeting')}>
//         Greeting Messages
//       </Button>
//       &nbsp; &nbsp;
//       <Button variant="primary" onClick={() => handleShow('farewell')}>
//         Farewell Messages
//       </Button>

//       <Modal show={show} onHide={handleClose} centered>
//         <Modal.Body className="bg-dark text-white">
//           <div className="p-4 pb-5 pt-4 bg-dark text-white">
//             <form onSubmit={handleSubmit}>
//               {activeModal === 'greeting' && (
//                 <>
//                   <div className="mb-3 py-3">
//                     <label className="form-label" htmlFor="greetings_message">
//                       Greeting Message
//                     </label>
//                     <input
//                       type="text"
//                       id="greetings_message"
//                       name="greetings_message"
//                       className="form-control main-search"
//                       placeholder="Enter Greeting Message"
//                       value={formData.greetings_message}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </>
//               )}
//               {activeModal === 'farewell' && (
//                 <>
//                   <div className="mb-3">
//                     <label className="form-label" htmlFor="farewell_message">
//                       Farewell Message
//                     </label>
//                     <input
//                       type="text"
//                       id="farewell_message"
//                       name="farewell_message"
//                       className="form-control main-search"
//                       placeholder="Enter Farewell Message"
//                       value={formData.farewell_message}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </>
//               )}

//               {validationMessage && (
//                 <p className="text-danger text-center">{validationMessage}</p>
//               )}

//               <button
//                 type="submit"
//                 className="btn btn-primary w-100 mt-3 submit-button"
//               >
//                 Submit
//               </button>
//             </form>

//             {responseMessage && (
//               <p className="mt-3 text-center">{responseMessage}</p>
//             )}
//           </div>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default GreetingMessage;
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function GreetingMessage() {
  const [show, setShow] = useState(false);
  const [activeModal, setActiveModal] = useState('');
  const [formData, setFormData] = useState({
    greetings_message: '',
    farewell_message: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for each modal type
    if (activeModal === 'greeting' && !formData.greetings_message.trim()) {
      setValidationMessage('Greeting message is required.');
      return;
    }
    if (activeModal === 'farewell' && !formData.farewell_message.trim()) {
      setValidationMessage('Farewell message is required.');
      return;
    }

    setValidationMessage('');

    // Create the payload based on the active modal
    const payload =
      activeModal === 'greeting'
        ? { greetings_message: formData.greetings_message }
        : { farewell_message: formData.farewell_message };

    // Log the form data to the console
    console.log('Form data being submitted:', payload);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(process.env.REACT_APP_API_GRETTINGURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage('Message updated successfully!');
        console.log('Response:', data);

        // Clear the relevant input
        setFormData((prevData) => ({
          ...prevData,
          [activeModal === 'greeting' ? 'greetings_message' : 'farewell_message']: '',
        }));

        setShow(false);
      } else {
        setResponseMessage('Failed to update messages.');
        console.error('Failed to submit:', response.statusText);
      }
    } catch (error) {
      setResponseMessage('Error submitting the form.');
      console.error('Error:', error);
    }
  };
  const handleClose = () => {
    setShow(false);
    setValidationMessage('');
    setResponseMessage('');
  };

  const handleShow = (modalType) => {
    setActiveModal(modalType);
    setShow(true);
    setValidationMessage('');
  };

  return (
    <div>
      <Button variant="primary" onClick={() => handleShow('greeting')}>
        Greeting Messages
      </Button>
      &nbsp; &nbsp;
      <Button variant="primary" onClick={() => handleShow('farewell')}>
        Farewell Messages
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className="bg-dark text-white">
          <div className="p-4 pb-5 pt-4 bg-dark text-white">
            <form onSubmit={handleSubmit}>
              {activeModal === 'greeting' && (
                <div className="mb-3 py-3">
                  <label className="form-label" htmlFor="greetings_message">
                    Greeting Message
                  </label>
                  <input
                    type="text"
                    id="greetings_message"
                    name="greetings_message"
                    className="form-control main-search"
                    placeholder="Enter Greeting Message"
                    value={formData.greetings_message}
                    onChange={handleChange}
                  />
                </div>
              )}
              {activeModal === 'farewell' && (
                <div className="mb-3">
                  <label className="form-label" htmlFor="farewell_message">
                    Farewell Message
                  </label>
                  <input
                    type="text"
                    id="farewell_message"
                    name="farewell_message"
                    className="form-control main-search"
                    placeholder="Enter Farewell Message"
                    value={formData.farewell_message}
                    onChange={handleChange}
                  />
                </div>
              )}

              {validationMessage && (
                <p className="text-danger text-center">{validationMessage}</p>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100 mt-3 submit-button"
              >
                Submit
              </button>
            </form>

            {responseMessage && (
              <p className="mt-3 text-center">{responseMessage}</p>
            )}
          </div>
        </Modal.Body>
      </Modal>
      <div className="row mt-5">
        <div className="col-md-6">
          <table className='table text-start align-middle table-bordered table-hover mb-0'>
            <thead>
              <td>Sr.No</td>
              <td>Greating</td>
              <td>Action</td>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Hello Nice to meet you</td>
                <td>
                  <Button variant="primary">Delete</Button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Hello Nice to meet you</td>
                <td>
                  <Button variant="primary">Delete</Button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Hello Nice to meet you</td>
                <td>
                  <Button variant="primary">Delete</Button>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>Hello Nice to meet you</td>
                <td>
                  <Button variant="primary">Delete</Button>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>Hello Nice to meet you</td>
                <td>
                  <Button variant="primary">Delete</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <table className='table text-start align-middle table-bordered table-hover mb-0'>
            <thead>
              <td>Sr.No</td>
              <td>Farewell</td>
              <td>Action</td>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Hello Nice to meet you</td>
                <td>
                  <Button variant="primary">Delete</Button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Hello Nice to meet you</td>
                <td>
                  <Button variant="primary">Delete</Button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Hello Nice to meet you</td>
                <td>
                  <Button variant="primary">Delete</Button>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>Hello Nice to meet you</td>
                <td>
                  <Button variant="primary">Delete</Button>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>Hello Nice to meet you</td>
                <td>
                  <Button variant="primary">Delete</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GreetingMessage;
