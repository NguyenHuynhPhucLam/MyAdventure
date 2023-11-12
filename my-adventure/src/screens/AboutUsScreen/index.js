import React from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";

import DiHetVN from "../../assets/images/about_us_1.png";
import CompanyOverviewIllus from "../../assets/images/about_us_2.png";
import Avatar from "./images/avatar.png";

import IntroBackground from "../../component/IntroBackground/IntroBackground";
import Footer from "../../component/Footer/Footer";
import CompanyCard from "./components/CompanyCard/CompanyCard";

import { useState } from "react";

const AboutUsScreen = () => {
  let CompanyInfo = {
    avatar: Avatar,
    name: [
      "Anna Nguyen",
      "Lena Dang",
      "Dung Nguyen",
      "Julia Ngo",
      "Thu Pham",
      "Bradon Nguyen",
    ],
    role: [
      "CEO",
      "Founder",
      "Sale Director",
      "Marketing Director",
      "Sale Manager",
      "Sale Senior",
    ],
    details: [
      "Over 20 years in Finance and accountancy",
      "Certificated in financial management and business with languages",
      "Over 15 years in Travel Industry, specially in social/economic/business studies",
      "Relevant management experience in other areas of the leisure or tourism industry such as hotels or airlines",
    ],
  };
  return (
    <div>
      {/* Intro Background */}
      <IntroBackground />
      {/* About my Adventure */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 className={styles.aboutUsGreenText} style={{ marginTop: "5%" }}>
          About My Adventure
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          marginTop: "5%",
        }}
      >
        <p className={styles.aboutUsNormalText} style={{ width: "45%" }}>
          My Adventure’s Travel Agency is your number one Ho Chi Minh Travel
          Agent, helping you plan and book Vietnam travel experiences,
          adventures and itineraries for more than 15 years. We are proud to
          provide honest, tailored advice and services to each and every client
          to make sure their trip to Vietnam is amazing in every way.
          <br />
          Browse through our website to get inspired with tour itineraries and
          contact us to create your custom Vietnam trip! We are proud that
          Lily’s travel is ranked 5-stars on Tripadvisor. The satisfaction of
          visitors is our happiness and motivation. We are always eager to
          listen to our customers’ suggestions and requests as: In My Adventure
          travel agency, we always insist in our mind and our heart that “TRUST
          IS MORE VALUABLE THAN GOLD”
        </p>
        <img src={DiHetVN} alt="DiHetVN" style={{ width: "30%" }} />
      </div>
      {/* Company Overview */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#5CD6C0",
          marginTop: "5%",
          paddingBottom: "5%",
        }}
      >
        <h1 className={styles.aboutUsWhiteText} style={{ marginTop: "2.5%" }}>
          Company Overview
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: "2.5%",
          }}
        >
          <img
            src={CompanyOverviewIllus}
            alt="about_us_2"
            style={{ width: "35%" }}
          />
          <p
            className={styles.aboutUsNormalText}
            style={{ width: "40%", color: "white" }}
          >
            My Adventure’s Travel also supports travellers with transportation
            by bus, train, and plane, as well as visa arrangements and even
            laundry!
            <br />
            Our team is young, enthusiastic and highly responsible for all the
            customers! All of our employee earn a bachelor’s degree in Tourism.
            Our team always have drastic initiative and creativity in work under
            the leadership of sensitive leader. The people of Lily always bring
            with them their own culture, built and cultivated by the
            intelligence and ceaseless creativity of the staff.
            <br />
            Through the long journey of growth and development, it is them who
            have made good values, contributing to the success of the agency
            today.Fast and reliable for contacting in advance by email or in
            person. If My Aventure is not there, you always can put trust on
            them.
          </p>
        </div>
      </div>
      {/* Meet Our Team */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5%",
        }}
      >
        <h1 className={styles.aboutUsGreenText}>Meet Our Team</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "5%",
        }}
      >
        <CompanyCard
          avatar={CompanyInfo.avatar}
          name={CompanyInfo.name[0]}
          role={CompanyInfo.role[0]}
          details={CompanyInfo.details}
        />
        <CompanyCard
          avatar={CompanyInfo.avatar}
          name={CompanyInfo.name[1]}
          role={CompanyInfo.role[1]}
          details={CompanyInfo.details}
        />
        <CompanyCard
          avatar={CompanyInfo.avatar}
          name={CompanyInfo.name[2]}
          role={CompanyInfo.role[2]}
          details={CompanyInfo.details}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "2.5%",
        }}
      >
        <CompanyCard
          avatar={CompanyInfo.avatar}
          name={CompanyInfo.name[3]}
          role={CompanyInfo.role[3]}
          details={CompanyInfo.details}
        />
        <CompanyCard
          avatar={CompanyInfo.avatar}
          name={CompanyInfo.name[4]}
          role={CompanyInfo.role[4]}
          details={CompanyInfo.details}
        />
        <CompanyCard
          avatar={CompanyInfo.avatar}
          name={CompanyInfo.name[5]}
          role={CompanyInfo.role[5]}
          details={CompanyInfo.details}
        />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUsScreen;
