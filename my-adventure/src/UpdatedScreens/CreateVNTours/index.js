import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import Footer from "../../component/Footer/Footer";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
const CreateVietNamTourScreen = (props) => {
  const navigate = useNavigate();
  const [transportBrand, setTransportBrand] = useState("");
  const [departureDate, setDepartureDate] = useState();
  const [returnDate, setReturnDate] = useState();
  const [accomodation, setAccomodation] = useState("");
  const [checkinDate, setCheckinDate] = useState();
  const [checkoutDate, setCheckoutDate] = useState();
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState();
  const [depature, setDeparture] = useState("choose");
  const [destination, setDestination] = useState("choose");
  const [depatures, setDepartures] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [message, setMessage] = useState("");
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [area, setArea] = useState("choose");
  const [areas, setAreas] = useState([]);

  const handleTransportBrandChange = (e) => {
    setTransportBrand(e.target.value);
  };

  const handleAccomodationChange = (e) => {
    setAccomodation(e.target.value);
  };

  const handleDetailsChange = (e) => {
    setDetails(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setAreas(["North", "South", "Center"]);
  }, []);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://my-adventure-backend.onrender.com/tour/vietnam-tours/departures", requestOptions)
      .then((response) => response.json())
      .then((result) => setDepartures(result))
      .catch((error) => console.log("error", error));
  }, [depatures]);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://my-adventure-backend.onrender.com/tour/vietnam-tours/destinations",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setDestinations(result))
      .catch((error) => console.log("error", error));
  }, [destinations]);

  const AddTour = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      departure: depature,
      destination: destination,
      departureDate: departureDate,
      returnDate: returnDate,
      price: price,
      area: area,
      isVNTour: true,
      hotel: accomodation,
      transport: transportBrand,
      checkin: checkinDate,
      checkout: checkoutDate,
      details: details,
      isCancel: false,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://my-adventure-backend.onrender.com/tour/add", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  const handleSubmit = async (e) => {
    if (
      transportBrand === "" ||
      accomodation === "" ||
      departureDate === undefined ||
      returnDate === undefined ||
      checkinDate === undefined ||
      checkoutDate === undefined ||
      price === "" ||
      details === "" ||
      depature === "" ||
      destination === ""
    ) {
      setMessage("Please fill in enough information");
      setIsShowMessage(true);
      return;
    }

    if (destination === depature) {
      setMessage("Destination and departure are the same");
      setIsShowMessage(true);
      return;
    }

    setIsLoading(true);

    const response = await AddTour();
    console.log("response", response);
    setIsLoading(false);

    const url = `/company/vietnam-tours`;
    navigate(url);
  };

  return (
    <>
      {/* VN background */}
      <div className={styles.vnTourIntroBackground}>
        <div className={styles.vnTourIntroLayer}>
          <h1 className={styles.vnTourIntroText}>OUR VIETNAM TOURS</h1>
        </div>
      </div>
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
        <h1
          className={styles.titleText}
          style={{ fontSize: "3.5vw", marginTop: "2.5%", fontWeight: "bold" }}

        >
          <h1
            className={styles.titleText}
            style={{ fontSize: "3.5vw", marginTop: "2.5%", fontWeight: "800" }}
          >
            CREATE A NEW TOUR
          </h1>
        </h1>
        </div>

        <div className={styles.horizontal}>
          <p className={styles.leftText}>Departure: </p>
          {/* <input value={transportBrand} onChange={handleTransportBrandChange} type="text" className={styles.inputStyle}/> */}
          <motion.select
            className={styles.filterBox}
            name="departure"
            value={depature}
            onChange={(e) => setDeparture(e.target.value)}
          >
            <motion.option key="choose" value="choose" disabled>
              --Choose a departure--
            </motion.option>
            {depatures?.map((departure, index) => (
              <motion.option key={index} value={departure}>
                {departure}
              </motion.option>
            ))}
          </motion.select>
        </div>

        <div className={styles.horizontal}>
          <p className={styles.leftText}>Destination: </p>
          <motion.select
            className={styles.filterBox}
            name="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            <motion.option key="choose" value="choose" disabled>
              --Choose a destination--
            </motion.option>
            {destinations?.map((destination, index) => (
              <motion.option key={index} value={destination}>
                {destination}
              </motion.option>
            ))}
          </motion.select>
        </div>

        <div className={styles.horizontal}>
          <p className={styles.leftText}>Area: </p>
          <motion.select
            className={styles.filterBox}
            name="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          >
            <motion.option key="choose" value="choose" disabled>
              --Choose the area of destination--
            </motion.option>
            {areas?.map((area, index) => (
              <motion.option key={index} value={area}>
                {area}
              </motion.option>
            ))}
          </motion.select>
        </div>
      </>
      {/* Transportation */}
      <>
      <div
        className={styles.text}
        style={{ marginLeft: "5%", marginTop: "2vw" }}
      >
        Transportation:
      </div>

      </>
      <>
        <div>
          <div className={styles.horizontal}>
            <p className={styles.leftText}>Transportation's brand: </p>
            <input
              value={transportBrand}
              onChange={handleTransportBrandChange}
              type="text"
              className={styles.inputStyle}
            />
          </div>

          <div className={styles.horizontal}>
            <p className={styles.leftText}>Departure Date: </p>
            <DatePicker
              selected={departureDate}
              onChange={(date) => setDepartureDate(date)}
              showTimeInput
              dateFormat="dd/MM/yyyy HH:mm"
              className={styles.datePicker}
            />
          </div>

          <div className={styles.horizontal}>
            <p className={styles.leftText}>Return Date: </p>
            <DatePicker
              selected={returnDate}
              onChange={(date) => setReturnDate(date)}
              showTimeInput
              dateFormat="dd/MM/yyyy HH:mm"
              className={styles.datePicker}
            />
          </div>
        </div>
      </>
      {/* Accommodation */}
      <>
      <div
        className={styles.text}
        style={{ marginLeft: "5%", marginTop: "2vw" }}
      >
        Accommodation:
      </div>
      <>
      <div>
          <div className={styles.horizontal}>
            <p className={styles.leftText}>Accommodation's name: </p>
            <input value={accomodation} onChange={handleAccomodationChange} type="text" className={styles.inputStyle}

              />
            </div>

            <div className={styles.horizontal}>
              <p className={styles.leftText}>Checkin Date: </p>
              <DatePicker
                selected={checkinDate}
                onChange={(date) => setCheckinDate(date)}
                showTimeInput
                dateFormat="dd/MM/yyyy HH:mm"
                className={styles.datePicker}
              />
            </div>

            <div className={styles.horizontal}>
              <p className={styles.leftText}>Checkout Date: </p>
              <DatePicker
                selected={checkoutDate}
                onChange={(date) => setCheckoutDate(date)}
                showTimeInput
                dateFormat="dd/MM/yyyy HH:mm"
                className={styles.datePicker}
              />
            </div>
          </div>
        </>
      </>
      {/* Schedule Details */}
      <>
        <div

        className={styles.text}
        style={{ marginLeft: "5%", marginTop: "2vw" }}
      >
        Schedule Details:
      </div>
        </>


      <textarea
        value={details}
        onChange={handleDetailsChange}
        type="text"
        className={styles.textareaStyle}
      />

      {/* Price */}
      <div className={styles.horizontal}>
        <div className={styles.price}>Price: $</div>
        <input
          value={price}
          onChange={handlePriceChange}
          type="number"
          className={styles.priceInputStyle}
        />
      </div>

      {isShowMessage ? <div className={styles.errorText}>{message}</div> : null}


      <div className= {styles.submitContainer}>
        <motion.button className={styles.submitBtn} whileHover={{scale: "0.98"}} onClick={handleSubmit}>Submit</motion.button>
      </div>

      {/* Footer */}
      <Footer />

      {isLoading && (
        <div className={styles.overlay}>
          <div className={styles.loader}></div>
        </div>
      )}
    </>
  );
};

export default CreateVietNamTourScreen;
