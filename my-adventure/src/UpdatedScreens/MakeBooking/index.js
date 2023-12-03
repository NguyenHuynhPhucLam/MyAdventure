import React from "react";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import CustomerBox from "../../components/CustomerBox";
import GlobeIMG from "../../assets/images/globe.png";
import AddButtonIC from "../../assets/icons/add.png";

import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../../constant/formatDate";
import Footer from "../../component/Footer/Footer";

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

  const addBooking = (date) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "email":email,
      "name": name,
      "phone": phoneNumber,
      "nationality": nationality,
      "address": address,
      "note": note,
      "departure": tour.departure,
      "destination": tour.destination,
      "departureDate": tour.departureDate,
      "returnDate": tour.returnDate,
      "status": "Waiting for Handling",
      "date": date,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3001/booking/add", requestOptions)
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

      fetch("http://localhost:3001/adult/add", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
  }

  const addChildren = (data, date) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "bookingEmail": email,
      "bookingDate": date,
      "name": data.fullName,
      "sex": data.sex,
      "dob": data.birthDate,
      "birthCert": data.selectedFile,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3001/children/add", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

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
          <CustomerBox
            key={index}
            type="both"
            data={box.data}
            onDelete={() => handleDelete(index)}
            index={index}
            onDataChange={handleCustomerInfoChange}
          />
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
  
    fetch(`http://localhost:3001/tour/place?id=${id}`, requestOptions)
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
      <div className={styles.title}>BOOKING TOUR</div>
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
            <span
              style={{
                fontWeight: "normal",
                fontSize: "1.4vw",
                paddingLeft: "25%",
              }}
            >
              {formatDate(tour.departureDate)} - {formatDate(tour.returnDate)}
            </span>
          </div>

          <div className={styles.spaceContainer}>
            Departure and Destination:
            <span
              style={{
                fontWeight: "normal",
                fontSize: "1.4vw",
                paddingLeft: "3%",
              }}
            >
              {tour.departure + " - " + tour.destination}
            </span>
          </div>
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
          <div style={{ color: "#7C8DB0", fontSize: "1.2vw", marginTop: "2vh" }}>
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
            <div style={{ marginLeft: "2vw", fontSize: "1.2vw" }}>
              Almost done! Just fill in the
              <span className={styles.redStar}> * </span>
              required info
            </div>
          </div>
        </div>
        <div className={styles.bookingForm}>
          <div className={styles.heading1}>1. Contact Information</div>
          <div className={styles.horizontalInfo}>
            <div style={{width: "20%"}}>Your good name<span style={{color:"red"}}>*</span>:</div>
            <input
                value={name}
                onChange={handleNameChange}
                type="text"
                className={styles.inputStyle}
              />
          </div>

          <div className={styles.horizontalInfo}>
            <div style={{width: "20%"}}>Phone number<span style={{color:"red"}}>*</span>:</div>
            <input
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                type="text"
                className={styles.inputStyle}
              />
          </div>

          <div className={styles.horizontalInfo}>
            <div style={{width: "20%"}}>Your nationality<span style={{color:"red"}}>*</span>:</div>
            <input
                value={nationality}
                onChange={handleNationalityChange}
                type="text"
                className={styles.inputStyle}
              />
          </div>

          <div className={styles.horizontalInfo}>
            <div style={{width: "20%"}}>Your address<span style={{color:"red"}}>*</span>:</div>
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
      </div>

      {
        isShow ? (
          <div style={{marginTop:"2vw",color: "red", marginLeft: "15%", fontSize: "1.5vw"}}>Please fill in essential information in your form!</div>
        ) : null
      }
      
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
      <Footer/>
    </div>
  );
};

export default MakeBookingScreen;
