import React, { Component } from "react";
import AOS from "aos";
//import axios from "axios";
import "aos/dist/aos.css";
import "../css/fund.css";

class Fund extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fundDatas: [],
    };
  }

  componentDidMount() {
    AOS.init();
    /*axios
      .get("https://za-rvqp.onrender.com/api/get-all-transactions")
      .then((response) => {
        // Update the state using setState
        this.setState({ fundDatas: response.data }); // Assuming that the response contains an array of data
        console.log(this.state.fundDatas);
      })
      .catch((error) => {
        console.error("Error fetching total fund amount:", error);
      });*/
  }

  /*render() {
    return (
      <div>
        <div style={{ marginTop: "16vh", width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0% 7%",
            }}
          >
            <div id="circle">
              <h1>
                {this.state.fundDatas.reduce((totalBalance, transaction) => {
                  if (transaction.type === "Income") {
                    return totalBalance + transaction.amount;
                  } else if (transaction.type === "Expense") {
                    return totalBalance - transaction.amount;
                  }
                  return totalBalance;
                }, 0)}{" "}
                <sub>BDT</sub>
              </h1>
            </div>
          </div>
          <div id="scrollBoxs">
            <div className="scrollBox">
              <p
                style={{
                  textAlign: "top",
                  fontSize: "1.5rem",
                  marginBottom: "3%",
                  borderBottom: "2px dashed black",
                  boxSizing: "border-box",
                  minWidth: "400px"
                }}
              >
                Incomes:
              </p>
              <div
                style={{
                  maxHeight: "15rem",
                  overflowY: "scroll",
                  boxSizing: "border-box",
                }}
              >
                {this.state.fundDatas
                  .filter((data) => data.type === "Income")
                  .map((data, index) => (
                    <p key={index} className="scrlP" style={{borderBottom:"2px solid black"}}>
                      {data.details}
                    </p>
                  ))}
              </div>
            </div>
            <div className="scrollBox">
              <p
                style={{
                  textAlign: "top",
                  verticalAlign: "top",
                  borderBottom: "2px dashed black",
                  fontSize: "1.5rem",
                  marginBottom: "3%",
                  minWidth:"400px"
                }}
              >
                Expense:
              </p>
              <div
                style={{
                  maxHeight: "15rem",
                  overflowY: "scroll",
                  boxSizing: "border-box",
                }}
              >
                {this.state.fundDatas
                  .filter((data) => data.type === "Expense")
                  .map((data, index) => (
                    <p key={index} className="scrlP" style={{borderBottom:"2px solid black"}}>
                      {data.details}
                    </p>
                  ))}
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", margin: "1rem auto" }}>
            <input value={"Donate"} type="button" style={{ fontSize: "40px", backgroundColor: "gold" }} />
          </div>

          <h2 style={{ textAlign: "center" }}>For more information, please contact Shudipta Chocroborti, Civil'16.</h2>
        </div>
      </div>
    );
  }
}*/

  render() {
    return (
      <div style={{
        marginTop: "16vh",
        width: "100%",
        height: "84vh",
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <p style={{fontSize:"3rem", color:"antiquewhite"}}>You can send dontion for your beloved association through-</p>
        <div style={{display:"flex"}}>
          <p style={{borderLeft:"solid 2px black", paddingLeft:"5px", paddingRight:"5px", borderRight:"solid 2px black", fontSize:"2rem", color:"rgb(203,15,98)"}}>BKash: 01767366049</p>
          <p style={{borderLeft:"solid 2px black", paddingLeft:"5px", paddingRight:"5px", borderRight:"solid 2px black",fontSize:"2rem", color:"rgb(241,101,34)"}}>Nagad: 01767366049</p>
          <p style={{borderLeft:"solid 2px black", paddingLeft:"5px", paddingRight:"5px", borderRight:"solid 2px black",fontSize:"2rem", color:"rgb(134,39,139)"}}>Rocket: 01767366049</p>

         
        </div>
        <h3 style={{color:"antiquewhite"}}>With reference: BZA</h3>
      </div>
    );
  }
}

export default Fund;
