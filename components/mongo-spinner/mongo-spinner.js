// MongoSpinner.js
import { DiMongodb } from "react-icons/di";



const MongoSpinner = ({propsname}) => {
  return (
    <div className="mongo-spinner">
        <DiMongodb className="mongo-logo"/>{propsname}
    </div>
  );
};

export default MongoSpinner;
