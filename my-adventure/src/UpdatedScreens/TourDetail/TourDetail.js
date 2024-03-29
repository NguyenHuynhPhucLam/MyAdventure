import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import Footer from "../../component/Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDate, formatHour } from "../../constant/formatDate";
import CancelBooking from "../../component/CacelBookingPopUp";

const TourDetail = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [loading, setLoading] = useState(true);

  const [tour, setTour] = useState();
  const [images, setImages] = useState([]);
  const [adult, setAdult] = useState([]);
  const [children, setChildren] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [isShowCancel, setIsShowCancel] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`https://my-adventure-backend.onrender.com/image`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
      })
      .catch((error) => console.log("error", error));

    fetch(`https://my-adventure-backend.onrender.com/booking`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => console.log("error", error));

    fetch(
      `https://my-adventure-backend.onrender.com/tour/place?id=${encodeURIComponent(id)}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setTour(data);
        setLoading(false);
        console.log("place");
      })

      .catch((error) => console.log("error", error));
  }, [localStorage.getItem("isAdmin")]);

  useEffect(() => {
    console.log("tour", tour);
    if (tour && tour._id) {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        `https://my-adventure-backend.onrender.com/children/tour?tourID=${encodeURIComponent(
          tour._id
        )}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => setChildren(result))
        .catch((error) => console.log("error", error));

      fetch(
        `https://my-adventure-backend.onrender.com/adult/tour?tourID=${encodeURIComponent(
          tour._id
        )}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => setAdult(result))
        .catch((error) => console.log("error", error));
    }
  }, [tour]);

  const handleBookTour = () => {
    console.log("token", localStorage.getItem("token"));
    if (
      localStorage.getItem("token") === undefined ||
      localStorage.getItem("token") === null
    ) {
      navigate("/sign-in");
      return;
    }
    const url = `/booking?id=${encodeURIComponent(tour._id)}`;
    navigate(url);
    return;
  };

  const renderImage = (name) => {
    const image = images.find((image) => image.name === name);
    if (image && image.images && image.images.length > 0) {
      const imageLink = image.images[0];
      return imageLink;
    }
    return null;
  };

  const getCity = (name) => {
    const location = name;
    const city = location?.split(",")[0].trim();
    return city;
  };

  const handleHereClick = () => {
    const url = `/company/customer-list?tourID=${encodeURIComponent(id)}`;
    navigate(url);
  };

  const handleModifyClick = () => {
    const url = `/company/modify-tour?id=${encodeURIComponent(id)}`;
    navigate(url);
  };

  const getNumber = (data) => {
    let num = 0;

    data.forEach((element) => {
      bookings.forEach((booking) => {
        if (
          booking.email === element.bookingEmail &&
          booking.date === element.bookingDate
        ) {
          if (booking.status !== "Cancelled") num++;
        }
      });
    });

    return num;
  };

  const handleCancelClick = () => {
    setIsShowCancel(!isShowCancel);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <>
        <div className={styles.introBackground}>
          {/* Left background */}
          <div
            className={styles.halfIntroBackground}
            style={{ backgroundImage: `url(${renderImage(tour.departure)})` }}
          >
            <div className={styles.halfIntroBackgroundLayer}>
              {tour.departure}
            </div>
          </div>
          {/* Right background */}
          <div
            className={styles.halfIntroBackground}
            style={{ backgroundImage: `url(${renderImage(tour.destination)})` }}
          >
            <div className={styles.halfIntroBackgroundLayer}>
              {getCity(tour.destination)}
            </div>
          </div>
        </div>
      </>
      {/* Title */}
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 className={styles.titleMainText}>Tour details</h1>
          <h2 className={styles.titleTourText}>
            {tour.departure}
            {" - "}
            {tour.destination}
          </h2>
          <h3 className={styles.titleTimeText}>
            {formatDate(tour.departureDate)}
            {" - "}
            {formatDate(tour.returnDate)}
          </h3>
        </div>
      </>
      {/* Transportation */}
      <>
        <div
          className={styles.text}
          style={{ marginLeft: "5%", marginTop: "2.5%" }}
        >
          Transportation:
        </div>
      </>

      <>
        <div className={styles.horizontal}>
          <div className={styles.firstHalf}>
            <p className={styles.leftText}>Transportation's brand: </p>
            <p className={styles.leftText}>Departure Date: </p>
            <p className={styles.leftText}>Departure Time: </p>
            <p className={styles.leftText}>Return Date: </p>
            <p className={styles.leftText}>Return Time: </p>
          </div>
          <div className={styles.secondHalf}>
            <p className={styles.rightText}>{tour.transport}</p>
            <p className={styles.rightText}>{formatDate(tour.departureDate)}</p>
            <p className={styles.rightText}>{formatHour(tour.departureDate)}</p>
            <p className={styles.rightText}>{formatDate(tour.returnDate)}</p>
            <p className={styles.rightText}>{formatHour(tour.returnDate)}</p>
          </div>
        </div>
      </>
      {/* Accommodation */}
      <>
        <div
          className={styles.text}
          style={{ marginLeft: "5%", marginTop: "1.5%" }}
        >
          Accommodation:
        </div>
      </>
      <>
        <div className={styles.horizontal}>
          <div className={styles.firstHalf}>
            <p className={styles.leftText}>Accommodation's name: </p>
            <p className={styles.leftText}>Checkin Date: </p>
            <p className={styles.leftText}>Checkin Time: </p>
            <p className={styles.leftText}>Checkout Date: </p>
            <p className={styles.leftText}>Checkout Time: </p>
          </div>
          <div className={styles.secondHalf}>
            <p className={styles.rightText}>{tour.hotel}</p>
            <p className={styles.rightText}>{formatDate(tour.checkin)}</p>
            <p className={styles.rightText}>{formatHour(tour.checkin)}</p>
            <p className={styles.rightText}>{formatDate(tour.checkout)}</p>
            <p className={styles.rightText}>{formatHour(tour.checkout)}</p>
          </div>
        </div>
      </>
      {/* Schedule Details */}
      <>
        <div
          className={styles.text}
          style={{ marginLeft: "5%", marginTop: "1.5%" }}
        >
          Schedule Details:
        </div>
      </>
      <>
        <div
          style={{
            marginLeft: "7.8%",
            marginTop: "1%",
            marginRight: "6%",
            width: "85vw",
          }}
        >
          <div className={styles.tourDetailBox}>
            <pre className={styles.text1}>{tour.details}</pre>
          </div>
        </div>
      </>

      <div
        className={styles.price}
        style={{ marginTop: "2.5%", padding: "1vw 5vw" }}
      >
        Price: ${tour.price}
      </div>

      {/* Number of customers */}
      {localStorage.getItem("isAdmin") === "true" ? (
        <>
          <div style={{ padding: "1vw 5vw", fontSize: "1.8vw" }}>
            <div className={styles.numBooked}>
              Number of customers booking this tour:{" "}
              <span style={{ fontWeight: "bold" }}>{getNumber(adult)}</span>{" "}
              adults{" "}
              <span style={{ fontWeight: "bold" }}>{getNumber(children)}</span>{" "}
              children
            </div>
            <div className={styles.numBooked2}>
              Click{" "}
              <motion.button
                whileTap={{ scale: 0.9 }}
                style={{
                  fontWeight: "500",
                  fontStyle: "italic",
                  textDecoration: "underline",
                }}
                onClick={handleHereClick}
              >
                here
              </motion.button>{" "}
              to see the customer list for this tour
            </div>
          </div>
        </>
      ) : null}

      {/* Book this tour button  */}
      {console.log("isAdmin" + localStorage.getItem("isAdmin"))}
      <>
        {localStorage.getItem("isAdmin") === "true" ? (
          <>
            <div className={styles.displayHorizon}>
              <motion.button
                className={styles.companyBtn}
                whileHover={{ scale: 0.9 }}
                onClick={handleModifyClick}
              >
                Modify
              </motion.button>
              <motion.button
                className={styles.companyBtn}
                style={{ backgroundColor: "#FF9551" }}
                whileHover={{ scale: 0.9 }}
                onClick={handleCancelClick}
              >
                Cancel
              </motion.button>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: "2.5%",
              }}
            >
              <motion.div
                className={styles.bookTourBtn}
                style={{ marginRight: "5%" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleBookTour}
              >
                Booking this tour
              </motion.div>
            </div>
          </>
        )}
      </>
      {/* Footer */}
      <Footer />

      {isShowCancel && (
        <div className={styles.overlay}>
          <CancelBooking
            className={styles.loader}
            onClick={handleCancelClick}
            tourID={id}
            isVNTour={tour.isVNTour}
          ></CancelBooking>
        </div>
      )}
    </>
  );
};

export default TourDetail;
