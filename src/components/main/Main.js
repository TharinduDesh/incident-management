import "./Main.css";
import hello from "../../assets/hello.svg";
import Chart from "../charts/Charts";

// Adding Main page details

const Main = () => {
  return (
    <main>
      <div className="main__container">
        <div className="main__title">
          <img src={hello} alt="hello" />
          <div className="main__greeting">
            <h1>Hello!</h1>
            <p>Welcome to your dashboard</p>
          </div>
        </div>

        <div className="main__cards">
          <div className="card">
            <i className="fa-solid fa-user fa-2x text-lightblue"></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of Customers</p>
              <span className="font-bold text-title">25670</span>
            </div>
          </div>

          <div className="card">
            <i className="fa-solid fa-triangle-exclamation fa-2x text-red"></i>
            <div className="card_inner">
              <p className="text-primary-p">Times of Complain</p>
              <span className="font-bold text-title">7450</span>
            </div>
          </div>

          <div className="card">
            <i className="fa-solid fa-check fa-2x text-yellow"></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of Completed Complains</p>
              <span className="font-bold text-title">7420</span>
            </div>
          </div>

          <div className="card">
            <i className="fa fa-thumbs-up fa-2x text-green"></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of Customer Feedback</p>
              <span className="font-bold text-title">7145</span>
            </div>
          </div>
        </div>

        <div className="charts">
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>Daily Reports</h1>
                <p>Colombo</p>
              </div>
              <i className="fa-solid fa-share-from-square"></i>
            </div>
            <Chart />
          </div>

          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Stats Reports</h1>
                <p>Colombo</p>
              </div>
              <i className="fa fa-use"></i>
            </div>

            <div className="charts__right__cards">
              <div className="card1">
                <h1>Customers</h1>
                <p>4860</p>
              </div>

              <div className="card2">
                <h1>Complains</h1>
                <p>670</p>
              </div>

              <div className="card3">
                <h1>Customer Feedback</h1>
                <p>578</p>
              </div>

              <div className="card4">
                <h1>Completed Complains</h1>
                <p>620</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
