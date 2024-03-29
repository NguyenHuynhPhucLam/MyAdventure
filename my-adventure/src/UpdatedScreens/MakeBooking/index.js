import React from "react";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import CustomerBox from "../../components/CustomerBox";
import GlobeIMG from "../../assets/images/globe.png";
import AddButtonIC from "../../assets/icons/add.png";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../../constant/formatDate";
import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid';
import Footer from "../../component/Footer/Footer";

const supabaseUrl = "https://nkaxnoxocaglizzrfhjw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rYXhub3hvY2FnbGl6enJmaGp3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDEyMDI2NCwiZXhwIjoyMDE1Njk2MjY0fQ.6ZNDz2LY3uTglFR2sqJvyPirr00voeSv9BNBRDU_F08";
const supabase = createClient(supabaseUrl, supabaseKey);

const MakeBookingScreen = () => {
  const navigate = useNavigate();
  const location  = useLocation()
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  console.log("id", id)

  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const [isShow, setIsShow] = useState(false);

  const [tour, setTour] = useState("");

  const [customerInfo, setCustomerInfo] = useState({});

  const email = localStorage.getItem('email')

  const handleCustomerInfoChange = (index, info) => {
    setCustomerInfo((prevCustomerInfo) => ({
      ...prevCustomerInfo,
      [index]: info
    }));
  };

  async function uploadImage(file) {
    console.log("file " + file);
    const key = `BirthCert/${uuidv4()}`;
    const { data, error } = await supabase.storage.from('myadventure').upload(key, file, {
      cacheControl: 'max-age=31536000',
      upsert: false,
      contentType: 'image/jpeg',
    });
    if (error) {
      console.error('Error uploading image:', error.message);
      return;
    }
    console.log('Image uploaded successfully:', key);
  
    const supabaseUrl = 'https://nkaxnoxocaglizzrfhjw.supabase.co/storage/v1/object/public';
    const imageUrl = `${supabaseUrl}/myadventure/${key}`;
    console.log('Image URL:', imageUrl);
    return imageUrl;
  }

  const addBooking = (date) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    console.log("customerInfo", customerInfo)
    const price = Object.keys(customerInfo).length * tour.price;
    var raw = JSON.stringify({
      "email":email,
      "name": name,
      "phone": phoneNumber,
      "nationality": nationality,
      "address": address,
      "note": note,
      "tourID": id,
      "status": "Waiting for handling",
      "date": date,
      "rating" : 0,
      "price": price,
      "payment": "test",
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://my-adventure-backend.onrender.com/booking/add", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }


    const addAdult = (data, date) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "bookingEmail": email,
        "bookingDate": date,
        "tourID" : id,
        "name": data.fullName,
        "sex": data.sex,
        "dob": data.birthDate,
        "id": data.citizenID,
        "phone": data.phone,
        "email": data.email,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("https://my-adventure-backend.onrender.com/adult/add", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
  }

  const updateImage = (id, url) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      _id: id,
      birthCert: url
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    console.log("id" + id)
    console.log("url" + url)
    
    fetch(`https://my-adventure-backend.onrender.com/children/update-imageURL?_id=${id}&birthCert=${url}`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  const addChildren = async (data, date) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      const raw = JSON.stringify({
        bookingEmail: email,
        bookingDate: date,
        tourID: id,
        name: data.fullName,
        sex: data.sex,
        dob: data.birthDate,
        birthCert: "test",
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
  
      const response = await fetch("https://my-adventure-backend.onrender.com/children/add", requestOptions);
      const result = await response.json();
  
      if (response.ok) {
        const childId = result.children._id
        console.log(data.selectedFile)
        const url = await uploadImage(data.selectedFile);
        updateImage(childId, url);
        
      } else {
        console.error("Failed to add children:", result.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  

  const addAll = () => {
    const date = new Date();
    addBooking(date);
    for (const key in customerInfo) {
      const info = customerInfo[key];
      if(info.isChild === true) {
        addChildren(info, date);
      } else {
        addAdult (info, date);
      }
    }
    console.log('Add all customers successfully!');
  }

  const handleSubmit = () => {
    if (name==="" || nationality === "" || phoneNumber === "" ||address === "")
    {
      setIsShow(true);
      return;
    }  

      console.log('Customer Information:', customerInfo);
  
    for (const key in customerInfo)
    {
      const info = customerInfo[key];
      if (info.isChild === true) {
        if (info.fullName === ''  || info.birthDate === null || info.selectedFile === null)
          {
            setIsShow(true);
            return;
          }
      }
      else {
        if (info.fullName === ''  || !info.citizenID === ""|| info.phone === "" || !info.birthDate === null)
        {
          setIsShow(true);
          return;
        }
      }
    }
    console.log("hello")
    addAll();
    
    navigate('/successful-booking')
    
  
  };

  // window.onpopstate = function (event) {
  //   navigate(`/tour-detail?id=${encodeURIComponent(id)}`);
  //   console.log("idne", id);
  //   console.log("Back button pressed");
  // };

  const [customerBoxes, setCustomerBoxes] = useState([ { key: 0, type: "both" }]);

  const handleDelete = (index) => {
    if (index >= 0 && index < customerBoxes.length) {
      setCustomerBoxes((prevBoxes) => {
        const updatedBoxes = [...prevBoxes];
        updatedBoxes.splice(index, 1);
        for(let i = index; i < updatedBoxes.length; i++) {
          updatedBoxes[i].key = updatedBoxes[i].key - 1;
        }
        return updatedBoxes;
      });
    }
  };

  const renderCustomerBoxes = () => {
    return (
      <>
        {customerBoxes.map((box, index) => (
          <>
          <CustomerBox
            key={index}
            type="both"
            data={box.data}
            onDelete={() => handleDelete(index)}
            index={index}
            onDataChange={handleCustomerInfoChange}
          />
          </>
        ))}
      </>
    );
  };
  

  const handleAddBtn = () => {
    setCustomerBoxes((prevBoxes) => [
      ...prevBoxes,
      { key: prevBoxes.length, type: "both" }
    ]);

  };

  useEffect(() => {
    console.log("CustomerBoxes", customerBoxes)
  }, [customerBoxes])

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  
    fetch(`https://my-adventure-backend.onrender.com/tour/place?id=${encodeURIComponent(id)}`, requestOptions)
    .then(response => response.json())
    .then(data => {
      setTour(data);
      console.log(tour);
      setLoading(false)
    })
    .catch(error => console.log('error', error));

  }, [id]);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleNationalityChange = (event) => {
    setNationality(event.target.value);
  };

  if(loading) {
    return <div>...Loading</div>
  }


  return (
    <div>
      <div className={styles.title} key="bookingTour">BOOKING TOUR</div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "80vw",
          height: "40vh",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "2vh",
          marginLeft: "10vw",
        }}
      >
        <div className={styles.timeAndPlaceContainer}>
          <div className={styles.timeContainer}>
            Time Start:
            
          </div>
          <span
              className={styles.time}
            >
              {formatDate(tour.departureDate)} - {formatDate(tour.returnDate)}
            </span>

          <div className={styles.spaceContainer}>
            Departure and Destination:
            
          </div>
          <span
              className={styles.time}
            >
              {tour.departure + " - " + tour.destination}
            </span>
        </div>
        <img src={GlobeIMG} alt="globe.png" className={styles.globe}></img>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className={styles.accountBox}>
          <img
            src={require("../../assets/icons/account.png")}
            alt="account"
            style={{ width: "2.5vw", height: "2.5vw", marginLeft: "2vw" }}
          />
          <div className={styles.signIn}>
            <div className={styles.text1} style={{ fontWeight: "bold" }}>
              You're signed in as
            </div>
            <div style={{ marginTop: "2vh" }}>{email}</div>
          </div>
        </div>
        <div className={styles.text1}>
          <div style={{ color: "#7C8DB0", fontSize: "2vh", marginTop: "2vh" }}>
            You will be received all e-confirmation mail/ tickets/ vouchers from
            this booking to contact
          </div>
          <div
            style={{ fontSize: "2.5vw", fontWeight: "600", marginTop: "6vh" }}
          >
            Enter Your Details
          </div>
          <div className={styles.note}>
            <img
              src={require("../../assets/icons/note.png")}
              alt="note"
              style={{ width: "1.5vw", height: "auto", marginLeft: "2vw" }}
            ></img>
            <div className={styles.notif}>
              Almost done! Just fill in the
              <span className={styles.redStar}> * </span>
              required info
            </div>
          </div>
        </div>
        <div className={styles.bookingForm}>
          <div className={styles.heading1}>1. Contact Information</div>
          <div className={styles.horizontalInfo}>
            <div className={styles.leftText}>Your good name<span style={{color:"red"}}>*</span>:</div>
            <input
                value={name}
                onChange={handleNameChange}
                type="text"
                className={styles.inputStyle}
              />
          </div>

          <div className={styles.horizontalInfo}>
            <div className={styles.leftText}>Phone number<span style={{color:"red"}}>*</span>:</div>
            <input
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                type="text"
                className={styles.inputStyle}
              />
          </div>

          <div className={styles.horizontalInfo}>
            <div className={styles.leftText}>Your nationality<span style={{color:"red"}}>*</span>:</div>
            <input
                value={nationality}
                onChange={handleNationalityChange}
                type="text"
                className={styles.inputStyle}
              />
          </div>

          <div className={styles.horizontalInfo}>
            <div className={styles.leftText}>Your address<span style={{color:"red"}}>*</span>:</div>
            <input
                value={address}
                onChange={handleAddressChange}
                type="text"
                className={styles.inputStyle}
              />
          </div>
          
          <div className={styles.heading1} style={{ marginTop: "6vh" }}>
            2. Customer Information
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
          <div>
          <div style={{display: "flex", flexDirection: "column"}}>
            {renderCustomerBoxes()}
          </div>
          </div>

          </div>
          <motion.img
            src={AddButtonIC}
            alt="Add.png"
            className={styles.addButton}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8, opacity: 0.5 }}
            onClick={handleAddBtn}
          ></motion.img>
          <div className={styles.notionSectionContainer}>
            <div>
              If you have any notion for this booking, please do not hesitate to
              fill in this notion box:
            </div>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} className={styles.textBox}></textarea>
          </div>
        </div>
        {
        isShow ? (
          <div style={{marginTop:"2vw",color: "red", marginLeft: "15%", fontSize: "1.5vw"}}>Please fill in essential information in your form!</div>
        ) : null
      }
      
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          width: "70vw",
        }}
      >
        <motion.button
          className={styles.submitButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95, opacity: 0.5 }}
          onClick={handleSubmit}
        >
          Submit
        </motion.button>
      </div>
      </div>


      <Footer/>
    </div>
  );
};

export default MakeBookingScreen;
