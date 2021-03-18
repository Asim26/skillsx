import React, { useEffect } from "react";
import { loginAccess } from "./cache";
import { useHistory } from "react-router-dom";

const Protected = (props: any) => {
  const Component = props.Component;
  const history = useHistory();

  useEffect(() => {
    if (loginAccess() == false) {
      history.push("/");
    }
  }, []);

  return (
    <div>
      <Component />
    </div>
  );
};
export default Protected;
