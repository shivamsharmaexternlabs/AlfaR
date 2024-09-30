import React, { useState } from 'react'
import logo from '../Astes/logowh.svg'
import bannerimg from '../Astes/bannerimg.png'
import icon10 from '../Astes/icon10.png'
import icon9 from '../Astes/icon9.png'
import item2 from '../Astes/item2.png'
import hello from '../Astes/hello.png'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../Layout/Header'
import { useDispatch } from 'react-redux'
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PhoneInput from "react-phone-input-2";


const Home = () => {




  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState(false)
  const [message,setMessage]=useState("")
  const dispatch = useDispatch()


  // Initial values for the Formik form
  const defaultValue = {
    name: "",
    email: "",
    brand: ""

  };

  const Validate = yup.object({
    name: yup.string().required('name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    brand: yup.string().required('brand is required'),
  });


  const handleOnChange = (value, country) => {


    // Extract country code and phone number
    const countryCode = country?.dialCode;
    const phoneNumberWithoutCountryCode = value?.slice(countryCode?.length);

    setPhoneNumber({ countryCode, phoneNumberWithoutCountryCode })


  };


  const handleSubmit = async (values) => {
    let countryCode = `+${phoneNumber?.countryCode}`
    let newValue = {
      ...values, "phoneNumber": phoneNumber?.phoneNumberWithoutCountryCode,
      "countryCode": countryCode,
      "inquiryMessage":message
    }

    let responseData
    // = await dispatch(SignUpSlice({ ...newValue }));

    if (responseData?.payload?.status === 201) {
      navigate("/signin")
    }
  };

  return (
    <>
      <Header />

      <section className='bannersection'>
        <div className='container'>
          <div className='leftpart'>
            <h1>Fashion designing made fast and easy with AI</h1>
            <p>Know what's trending using real data<br /> AI based design editing tool and tech pack<br /> creation in minutes<br /> Get a sample delivered in 7 days!</p>
            <button type='button' className='tryitbtn' onClick={() => { navigate("/design") }}>Try It</button>
          </div>
          <div className='rightpart'>
            <img src={bannerimg} alt='img' />
          </div>
        </div>
      </section>

      <section className='worksection'>
        <div className='container'>
          <h2>How does stofee work?</h2>
          <ul className='worklist'>
            <li>
              <span> <img src={icon10} alt='img' /> </span>
              <h3>Design Faster</h3>
              <p>Using AI editor specially made for fashion, design Faster</p>
            </li>
            <li>
              <span> <img src={icon9} alt='img' /> </span>
              <h3>Automate Documentation</h3>
              <p>Get tech pack made in a click using AI</p>
            </li>
            <li>
              <span> <img src={icon10} alt='img' /> </span>
              <h3>Production</h3>
              <p>Connect with curated list of trusted suppliers and manufacturers to get sampling and production done</p>
            </li>
            <li>
              <span> <img src={icon10} alt='img' /> </span>
              <h3>Collaborate</h3>
              <p>Track every step of your order and collaborate with cross functional teams</p>
            </li>
          </ul>
        </div>
      </section>




      <section className='Stofeesection'>
        <div className='container'>
          <div className='leftpart'>
            <img src={item2} alt='item2 img' />
          </div>
          <div className='rightpart'>
            <h2>Why work with Stofee?</h2>
            <p> Stofee is a Canva for fashion designers. We allow you to take designs,
              iterate and order samples within a few minutes allowing you to focus on innovation
              instead of repetitive
              tasks
            </p>
            <ul className='stofelist'>
              <li>End to End platform from design to production</li>
              <li>Saves time for innovative tasks</li>
              <li>Automates grunt work and repeatative tasks</li>
              <li>Ethical suppliers, quality, in time production with best prices</li>
            </ul>
          </div>
        </div>
      </section>


      <section className='contactussection'>
        <div className='container'>
          <div className='leftpart'>
            <h2>Contact Us</h2>
          </div>
          <div className='rightpart'>
            <div className='title'>
              <img src={logo} alt='Logo img' />
              <img src={hello} alt='hello img' />
            </div>
            <div className='contactform'>




              <Formik
                initialValues={defaultValue}
                validationSchema={Validate}
                onSubmit={handleSubmit}
              >
                <div className="login-box">
                  <Form>
                    <div className="formbox"  >
                      <div className='forminnerbox'>
                        <Field
                          name="name"
                          type="text"
                          className={`form-control `}
                          required
                        />
                        <label>Full Name</label>
                      </div>
                      <span className="text-danger mb-0">
                        <ErrorMessage name="name" />
                      </span>
                    </div>
                    <div className="formbox mt-3"  >
                      <div className='forminnerbox'>
                        <Field
                          name="brand"
                          type="text"
                          className={`form-control `}
                          required
                        />
                        <label>Brand Name</label>
                      </div>
                      <span className="text-danger mb-0">
                        <ErrorMessage name="brand" />
                      </span>
                    </div>
                    <div className="formbox mt-3"  >
                      <div className='forminnerbox'>
                        <Field
                          name="email"
                          type="text"
                          className={`form-control `}
                          autoComplete="off"
                          required
                        />
                        <label >Email</label>
                      </div>
                      <span className="text-danger mb-0">
                        <ErrorMessage name="email" />
                      </span>
                    </div>
                    <div className="formbox mt-3"  >
                      <div className={`${phoneNumber !== false && phoneNumber !== "" ? "phone-number" : "input-edit"} forminnerbox`}>
                        <PhoneInput

                          placeholder="Phone Number"
                          onChange={handleOnChange}
                          onFocus={setPhoneNumber}
                          required

                        />
                        {phoneNumber && <label>Contact Person Phone</label>}
                      </div>
                    </div>

                    <div className='mt-3'>
                      <label>Message</label>
                      <textarea placeholder='Write some message..' onChange={(e)=>setMessage(e.target.value)} className='form-control mt-1'/> 
                    </div>



                    <div className="text-center">
                      <button type="submit" className="signbtn">
                        {"Sign Up"}
                      </button>
                    </div>
                  </Form>
                </div>
              </Formik>










              {/* <div className=''>
                <label>Fullname</label>
                <input type='text' className='form-control mt-1' placeholder='Ex, John Doe' />
              </div>
              <div className='mt-3'>
                <label>Brand Name</label>
                <input type='text' className='form-control mt-1' placeholder='Ex, Stofee' />
              </div>
              <div className='mt-3'>
                <label>Email</label>
                <input type='email' className='form-control mt-1' placeholder='example@gmail.com' />
              </div>
              <div className='mt-3'>
                <label>Phone Number</label>
                <input type='text' className='form-control mt-1' placeholder='Ex +62xxxxx' />
              </div>
              <div className='mt-3'>
                <label>Message</label>
                <textarea placeholder='Write some message..' className='form-control mt-1'></textarea>
              </div>

              <button type='button'>Let’s Talk </button> */}



            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className='footertop'>
          <div className='container'>
            <div className='leftpart'>
              <img src={logo} alt='logo' />
              <p>Design automation and B2B Marketplace</p>
              <p>Stofee, 2024.</p>
            </div>
            <ul className='ftmenulist'>
              <li> <Link to={''}> Trending </Link> </li>
              <li> <Link to={''}> Create Design </Link> </li>
              <li> <Link to={''}> Techpack </Link> </li>
              <li> <Link to={''}> Order </Link> </li>
              <li> <Link to={''}> Recycle </Link> </li>
            </ul>
          </div>
        </div>
        <div className='footerbottom'>
          <div className='container'>
            <p>&copy; 2024 Stofee. All rights reserved.</p>
          </div>
        </div>

      </footer>

    </>
  )
}

export default Home