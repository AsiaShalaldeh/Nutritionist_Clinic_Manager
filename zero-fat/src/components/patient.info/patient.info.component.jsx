import "./patient.info.css";
import Input from "../../components/common/input/input-component";
import Select from "../../components/common/select/select-component";
import CITIES from "../../data/cities";

const PatientInfo = (props) => {
  return (
    <div className="info-container">
      <img
        className="patient"
        src={process.env.PUBLIC_URL + "/patient.jpg"}
        alt="Patient"
      />
      <div className="patient-info">
        <Input
          label="Name :"
          name="name"
          placeholder="Name"
          onChange={(e) => props.name(e.target.value)}
          required
        />
        <Input
          name="phone"
          label="Phone :"
          placeholder="059-289-6297"
          minLength={12}
          maxLength={12}
          pattern="^05(9|6)-\d{3}-\d{4}$"
          onChange={(e) => props.phone(e.target.value)}
        />
        <Input
          name="email"
          label="Email :"
          placeholder="ahmed@example.com"
          pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
          onChange={(e) => props.email(e.target.value)}
          required
        />
        <Input
          name="date"
          label="DOB : "
          type="date"
          onChange={(e) => props.dateOfBirth(e.target.value)}
        />
        <Select
          className="city"
          name="city"
          label="City :"
          onChange={(e) => props.city(e.target.value)}
          required
        >
          {CITIES.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </Select>
      </div>
    </div>
  );
};
export default PatientInfo;
