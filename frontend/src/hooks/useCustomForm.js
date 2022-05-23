import { useState } from "react";

const useCustomForm = (initialValues = {}, onSubmit) => {
  const [formData, setFormValues] = useState(initialValues);
  const [pastUrl, setPastUrl] = useState()

  const handleInputChange = (e) => {
    e.persist();
    if (e.target.name === "isAdmin") {
      setFormValues({ ...formData, [e.target.name]: e.target.checked });
    } else {
      setFormValues({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e,pastUrl) => {
    e.preventDefault();
    // console.log(pastUrl)
    onSubmit(formData, pastUrl);
  };

  const reset = () => {
    setFormValues(initialValues);
  };

  return [formData, handleInputChange, handleSubmit, reset, setPastUrl];
};

export default useCustomForm;
