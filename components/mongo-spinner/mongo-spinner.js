// MongoSpinner.js
import { DiMongodb } from "react-icons/di";



const MongoSpinner = ({propsname}) => {
  return (
    <div className="mongo-spinner">
        <DiMongodb className="mongo-logo"/><br/>
        <h6 className="mongo-spinner-text" >{propsname}</h6>
    </div>
  );
};

export default MongoSpinner;
