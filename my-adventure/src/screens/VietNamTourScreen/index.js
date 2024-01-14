import React, { useEffect, useState } from "react";
import DestinationSection from "../../component/DestinationSection/DestinationSection";
import Footer from "../../component/Footer/Footer";
import styles from "./styles.module.css";

const VietNamTourScreen = () => {
  const [northDestinations, setNorthDestinations] = useState();
  const [southDestinations, setSouthDestinations] = useState();
  const [centerDestinations, setCenterDestinations] = useState();
  const [resultData, setResultData] = useState([]);
  const [northDestinationsImage, setNorthDestinationsImage] = useState();
  const [southDestinationsImage, setSouthDestinationsImage] = useState();
  const [centerDestinationsImage, setCenterDestinationsImage] = useState();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://my-adventure-backend.onrender.com/tour/vietnam-tours/north-destinations",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setNorthDestinations(result))
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://my-adventure-backend.onrender.com/tour/vietnam-tours/south-destinations",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setSouthDestinations(result))
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://my-adventure-backend.onrender.com/tour/vietnam-tours/center-destinations",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCenterDestinations(result);
        setResultData(result.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        const fetchedImageList = [];

        for (const destination of northDestinations) {
          const response = await fetch(
            `https://my-adventure-backend.onrender.com/image/place?name=${destination}`,
            requestOptions
          );
          const result = await response.json();
          fetchedImageList.push(result);
        }

        setNorthDestinationsImage(fetchedImageList);
        console.log("North Vietnam Image Lists:", fetchedImageList);
        console.log("North Vietnam Image Lists 11111:", fetchedImageList[0][0]);
      } catch (error) {
        console.log("Error:", error);
        setNorthDestinationsImage([]);
      }
    };

    fetchImage();
  }, [northDestinations]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        const fetchedImageList = [];

        for (const destination of southDestinations) {
          const response = await fetch(
            `https://my-adventure-backend.onrender.com/image/place?name=${destination}`,
            requestOptions
          );
          const result = await response.json();
          fetchedImageList.push(result);
        }

        setSouthDestinationsImage(fetchedImageList);
        console.log("South Vietnam Image Lists:", fetchedImageList);
      } catch (error) {
        console.log("Error:", error);
        setSouthDestinationsImage([]);
      }
    };

    fetchImage();
  }, [southDestinations]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        const fetchedImageList = [];

        for (const destination of centerDestinations) {
          const response = await fetch(
            `https://my-adventure-backend.onrender.com/image/place?name=${destination}`,
            requestOptions
          );
          const result = await response.json();
          fetchedImageList.push(result);
        }

        setCenterDestinationsImage(fetchedImageList);
        console.log("Center Vietnam Image Lists:", fetchedImageList);
      } catch (error) {
        console.log("Error:", error);
        setCenterDestinationsImage([]);
      }
    };

    fetchImage();
  }, [centerDestinations]);

  useEffect(() => {
    console.log("North Destination Image:", northDestinationsImage);
  }, [northDestinationsImage]);

  const filterNorthDestinations = northDestinationsImage
    ? northDestinationsImage.filter((destination) => {
        return destination.name
          .toLowerCase()
          .includes(searchText.toLowerCase());
      })
    : [];

  const filterCenterDestinations = centerDestinationsImage
    ? centerDestinationsImage.filter((destination) => {
        return destination.name
          .toLowerCase()
          .includes(searchText.toLowerCase());
      })
    : [];

  const filterSouthDestinations = southDestinationsImage
    ? southDestinationsImage.filter((destination) => {
        return destination.name
          .toLowerCase()
          .includes(searchText.toLowerCase());
      })
    : [];

  return (
    <div>
      {/* Viet Nam Tour Intro */}
      <div className={styles.vnTourIntroBackground}>
        <div className={styles.vnTourIntroLayer}>
          <h1 className={styles.vnTourIntroText}>OUR VIETNAM TOURS</h1>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search for destination..."
        onChange={(e) => setSearchText(e.target.value)}
        className={styles.searchBox}
      />
      {/* DESTINATIONS IN NORTHERN VIETNAM */}
      <DestinationSection
        text={
          "Awe-inspiring landscapes characterised by limestone mountains and vibrant green rice paddies, diverse local cultures and exhilarating adventures; this is Northern Vietnam."
        }
        img={filterNorthDestinations}
      >
        {"DESTINATIONS IN NORTHERN VIETNAM"}
      </DestinationSection>
      {/* DESTINATIONS IN CENTRAL VIETNAM */}
      <DestinationSection
        text={
          "Awe-inspiring landscapes characterised by limestone mountains and vibrant green rice paddies, diverse local cultures and exhilarating adventures; this is Northern Vietnam."
        }
        img={filterCenterDestinations}
      >
        {"DESTINATIONS IN CENTRAL VIETNAM"}
      </DestinationSection>
      {/* DESTINATIONS IN SOUTH VIETNAM */}
      <DestinationSection
        text={
          "Awe-inspiring landscapes characterised by limestone mountains and vibrant green rice paddies, diverse local cultures and exhilarating adventures; this is Northern Vietnam."
        }
        img={filterSouthDestinations}
      >
        {"DESTINATIONS IN SOUTH VIETNAM"}
      </DestinationSection>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VietNamTourScreen;
