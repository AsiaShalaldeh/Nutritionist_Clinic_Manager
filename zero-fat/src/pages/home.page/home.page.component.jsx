import MealsPage from "../meals.page/meals.page.component";
import "./home.page.css";

const HomePage = (props) => {
  return (
    <div>
      <div className="diet">
        <img src={process.env.PUBLIC_URL + "/diet.jpg"} alt="" />
      </div>
      {props.page !== "login" && (
        <p className="quote">
          Your diet is a bank account. Good food choices are good investments
        </p>
      )}
    </div>
  );
};
export default HomePage;
