import React from "react";
import styles from './styles.module.css';
import Departure from "../../assets/icons/departure.png";
import Location from "../../assets/icons/location.png";
import AdultNum from "../../assets/icons/adultNum.png";
import ChildNum from "../../assets/icons/childNum.png";

function TourContainer (props) {
    const { expectedTime, route, numAdult, nameA, numChild, nameC, tourStatus } = props;
    const BUTTON_STATUS = {
        WaitingForHandling: <div className={styles.button} style={{backgroundColor:'#FFED8C',}}><div className={styles.buttonText}>Waiting for handling</div></div>,
        Confirmed: <div className={styles.button} style={{backgroundColor:"#F5AE45",}}><div className={styles.buttonText}>Confirmed</div></div>,
        Paid: <div className={styles.button} style={{backgroundColor:"#2CF594",}}><div className={styles.buttonText}>Paid</div></div>,
        Successful: <div className={styles.button} style={{backgroundColor:"#30E742",}}><div className={styles.buttonText}>Successful</div></div>,
      }
    var AdultList = nameA.map((name) => <li>{name}</li>)
    var ChildList = nameC.map((name) => <li>{name}</li>)
        return (
          <div className={styles.mainView}>
            <div className={styles.column}>
              <div className={styles.horizon}>
                <div className={styles.horizon1}>
                  <img className={styles.img} src={Departure} alt="departure"></img>
                  <div className={styles.label}>Expected time:</div>
                </div>
                <div className={styles.content}>{expectedTime.join(' - ')}</div>
              </div>

              <div className={styles.horizon} style={{marginTop: "3vh"}}>
                <div className={styles.horizon1}>
                  <img className={styles.img} src={Location} alt="location"></img>
                  <div className={styles.label}>Departure and Destination:</div>
                </div>
                <div className={styles.content}>{route.join(' - ')}</div>
              </div>

              <div className={styles.horizon} style={{marginTop: "3vh"}}>
                <div className={styles.horizon1}>
                  <img className={styles.img} src={AdultNum} alt="adultNum"></img>
                  <div className={styles.label}>Number of adults:</div>
                </div>
                <div className={styles.column1}>
                  <div className={styles.content} style={{fontWeight: "bold"}}>{numAdult} adults</div>
                  <ul className={styles.content}>{AdultList}</ul>
                </div>
              </div>

              <div className={styles.horizon} style={{marginTop: "3vh"}}>
                <div className={styles.horizon1}>
                  <img className={styles.img} src={ChildNum} alt="childNum"></img>
                  <div className={styles.label}>Number of children:</div>
                </div>
                <div className={styles.column1}>
                  <div className={styles.content} style={{fontWeight: "bold"}}>{numChild} children</div>
                  <ul className={styles.content}>{ChildList}</ul>
                </div>
              </div>
            </div>

            <button>
              { BUTTON_STATUS[tourStatus] }
            </button>

          </div>
    );
}
export default TourContainer;