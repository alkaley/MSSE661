"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../user-dashboard/WebsiiteLoader/Index";
import Image from "next/image";
import { useAuth } from "@/components/Utils/AuthContext";
import {
  bodyType,
  educationLevel,
  educationLevels,
  immigrationStatusArray,
  immigrationStatusArrays,
  incomeRange,
  incomeRanges,
  nativeBackOptions,
  partnerAgeArray,
  religionType,
} from "./ApplicationForm";

export const marital_status = ["single", "separated", "widowed", "divorced"];

const ViewApplicationDetails = ({ previewData, refreshData }) => {
  const { userToken, userData, userMail, userContact } = useAuth();
  const token = userToken;
  // const isUpdated = JSON.parse(localStorage.getItem("isFromUpdated"));
  const [isUpdated, setIsUpdated] = useState(false);
  const [formData, setFormData] = useState(previewData);
  const [photograph, setPhotograph] = useState("");
  const [hobby, setHobby] = useState("");
  const [isStatus, setStatus] = useState(true);
  const [imageDisable, setImageDisable] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const formattedToday = new Date().toISOString().split("T")[0];
  // console.log(isUpdated);
  const [isOtherBackOption, setIsOtherBackOption] = useState(false);
  const [isOtherLanguage, setIsOtherLanguage] = useState(false);
  const [isfemale, setIsfemale] = useState(false);
  const [isOtherMuslim, setIsOtherMuslim] = useState(false);
  // console.log(userMail);
  const [isPartnerOtherMuslim, setIsPartnerOtherMuslim] = useState(false);
  const [isPartnerOtherBackground, setIsPartnerOtherBackground] =
    useState(false);
  const [isPartnerOtherLanguage, setIsPartnerOtherLanguage] = useState(false);
  const [isImgError, setImgError] = useState("");
  const [isError, setError] = useState("");
  const [isSuccess, setSuccess] = useState("");
  const [getAllStates, setGetAllStates] = useState("");
  const status = previewData.formStatus;
  const [formStatus, setformStatus] = useState(status);

  useEffect(() => {
    if (previewData?.formStatus?.toLowerCase() === "rejected") {
      // localStorage.setItem("isFromUpdated", JSON.stringify(false));
      setIsUpdated(false);
    }
    if (previewData?.formStatus?.toLowerCase() === "approved") {
      // localStorage.setItem("isFromUpdated", JSON.stringify(false));
      setIsUpdated(true);
    }
    if (!nativeBackOptions.includes(previewData?.background)) {
      setIsOtherBackOption(true);
    }
    if (previewData?.nativelanguage !== "English") {
      setIsOtherLanguage(true);
    }
    if (previewData?.gender === "female") {
      setIsfemale(true);
    }
    if (!religionType.includes(previewData?.religion)) {
      setIsOtherMuslim(true);
    }
    if (!religionType.includes(previewData?.partnerReligion)) {
      setIsPartnerOtherMuslim(true);
    }
    if (!nativeBackOptions.includes(previewData?.partnerBackground)) {
      setIsPartnerOtherBackground(true);
    }
    if (previewData?.partnerNativeLanguage !== "English") {
      setIsPartnerOtherLanguage(true);
    }
  }, []);
  const InputHandler = (e) => {
    if (e.target.name === "image") {
      setPhotograph({ file: e.target.files[0] });
      setImgError("");
    } else if (e.target.name === "hobby") {
      const selectedOption = [...formData.hobbies, e.target.value];
      setFormData({
        ...formData,
        hobbies: selectedOption,
      });
      setHobbyErr("");
    } else if (e.target.name === "dateOfBirth") {
      const enteredDate = new Date(e.target.value);
      const currentDate = new Date();

      if (enteredDate > currentDate) {
        setErrorDate("Invalid date of birth. Please enter a date in the past.");
      } else {
        const enteredYear = enteredDate.getFullYear();
        const enteredMonth = enteredDate.getMonth();
        const enteredDay = enteredDate.getDate();

        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();

        let age = currentYear - enteredYear;

        // If the current date is before the birthday this year, subtract one year from the age
        if (
          currentMonth < enteredMonth ||
          (currentMonth === enteredMonth && currentDay < enteredDay)
        ) {
          age--;
        }

        setFormData({
          ...formData,
          dateOfBirth: e.target.value,
          age: age,
        });
        setErrorDate("");
      }
    } else {
      if (e.target.name === "nativelanguage" && e.target.value === "other") {
        setIsOtherLanguage(true);
        setFormData({ ...formData, [e.target.name]: "" });
        return;
      }
      if (e.target.name === "nativelanguage" && e.target.value !== "other") {
        setIsOtherLanguage(false);
      }
      if (
        e.target.name === "partnerNativeLanguage" &&
        e.target.value === "other"
      ) {
        setIsPartnerOtherLanguage(true);
        setFormData({ ...formData, [e.target.name]: "" });
        return;
      }
      if (
        e.target.name === "partnerNativeLanguage" &&
        e.target.value !== "other"
      ) {
        setIsPartnerOtherLanguage(false);
      }

      if (
        e.target.name === "background" &&
        e.target.value?.toLowerCase() === "other"
      ) {
        setIsOtherBackOption(true);
        setFormData({ ...formData, [e.target.name]: "" });
        return;
      }
      if (
        e.target.name === "background" &&
        e.target.value?.toLowerCase() !== "other"
      ) {
        setIsOtherBackOption(false);
      }

      if (
        e.target.name === "partnerBackground" &&
        e.target.value?.toLowerCase() === "other"
      ) {
        setIsPartnerOtherBackground(true);
        setFormData({ ...formData, [e.target.name]: "" });
        return;
      }
      if (
        e.target.name === "partnerBackground" &&
        e.target.value?.toLowerCase() !== "other"
      ) {
        setIsPartnerOtherBackground(false);
      }

      if (
        e.target.name === "religion" &&
        e.target.value?.toLowerCase() === "muslim(other)"
      ) {
        setIsOtherMuslim(true);
        setFormData({ ...formData, [e.target.name]: "" });
        return;
      }
      if (
        e.target.name === "religion" &&
        e.target.value?.toLowerCase() !== "muslim(other)"
      ) {
        setIsOtherMuslim(false);
      }
      if (
        e.target.name === "partnerReligion" &&
        e.target.value?.toLowerCase() === "muslim(other)"
      ) {
        setIsPartnerOtherMuslim(true);
        setFormData({ ...formData, [e.target.name]: "" });
        return;
      }
      if (
        e.target.name === "partnerReligion" &&
        e.target.value?.toLowerCase() !== "muslim(other)"
      ) {
        setIsPartnerOtherMuslim(false);
      }

      // Update other form data properties outside of specific conditions
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  // const InputHandler = (e) => {
  //   if (e.target.name === "image") {
  //     setPhotograph({ file: e.target.files[0] });
  //     setImgError("");
  //   } else if (e.target.name === "hobby") {
  //     setHobby(e.target.value);
  //   } else {
  //     if (e.target.name === "nativelanguage" && e.target.value === "other") {
  //       setIsOtherLanguage(true);
  //       setFormData({ ...formData, [e.target.name]: "" });
  //       return;
  //     }
  //     if (e.target.name === "nativelanguage" && e.target.value !== "other") {
  //       setIsOtherLanguage(false);
  //     }
  //     if (
  //       e.target.name === "partnerNativeLanguage" &&
  //       e.target.value === "other"
  //     ) {
  //       setIsPartnerOtherLanguage(true);
  //       setFormData({ ...formData, [e.target.name]: "" });
  //       return;
  //     }
  //     if (
  //       e.target.name === "partnerNativeLanguage" &&
  //       e.target.value !== "other"
  //     ) {
  //       setIsPartnerOtherLanguage(false);
  //     }

  //     if (
  //       e.target.name === "background" &&
  //       e.target.value?.toLowerCase() === "other"
  //     ) {
  //       setIsOtherBackOption(true);
  //       setFormData({ ...formData, [e.target.name]: "" });
  //       return;
  //     }
  //     if (
  //       e.target.name === "background" &&
  //       e.target.value?.toLowerCase() !== "other"
  //     ) {
  //       setIsOtherBackOption(false);
  //     }

  //     if (
  //       e.target.name === "partnerBackground" &&
  //       e.target.value?.toLowerCase() === "other"
  //     ) {
  //       setIsPartnerOtherBackground(true);
  //       setFormData({ ...formData, [e.target.name]: "" });
  //       return;
  //     }
  //     if (
  //       e.target.name === "partnerBackground" &&
  //       e.target.value?.toLowerCase() !== "other"
  //     ) {
  //       setIsPartnerOtherBackground(false);
  //     }

  //     if (
  //       e.target.name === "religion" &&
  //       e.target.value?.toLowerCase() === "muslim(other)"
  //     ) {
  //       setIsOtherMuslim(true);

  //       setFormData({ ...formData, [e.target.name]: "" });
  //       return;
  //     }
  //     if (
  //       e.target.name === "religion" &&
  //       e.target.value?.toLowerCase() !== "muslim(other)"
  //     ) {
  //       setIsOtherMuslim(false);
  //     }
  //     if (
  //       e.target.name === "partnerReligion" &&
  //       e.target.value?.toLowerCase() === "muslim(other)"
  //     ) {
  //       setIsPartnerOtherMuslim(true);
  //       setFormData({ ...formData, [e.target.name]: "" });
  //       return;
  //     }
  //     if (
  //       e.target.name === "partnerReligion" &&
  //       e.target.value?.toLowerCase() !== "muslim(other)"
  //     ) {
  //       setIsPartnerOtherMuslim(false);
  //     }

  //     // Update other form data properties outside of specific conditions
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   }
  // };

  const handleAddHobbies = () => {
    if (hobby) {
      setFormData({
        ...formData,
        hobbies: [...(formData?.hobbies || []), hobby],
      });
      // Clear the hobby input field after adding it to the formData
      setHobby("");
    }
  };
  const removeHobbies = (id) => {
    let newHobbies = formData?.hobbies.filter((items, index) => {
      return index !== id;
    });
    setFormData({ ...formData, [`hobbies`]: newHobbies });
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, [`image`]: "" });
    setImageDisable(false);
  };

  const uploadImage = async (e) => {
    setImageUpload(true);

    if (photograph == "" || photograph == undefined) {
      setImageUpload(false);
      return setImgError("Please upload image.");
    }

    try {
      const response = await axios.post("/api/auth/uploadImage", photograph, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        // console.log('Category added:', response?.data);
        setFormData({ ...formData, ["image"]: response?.data?.url });
        setImageDisable(true);
        setImageUpload(false);
      } else {
        setFormData({ ...formData, ["image"]: "" });
        setImageDisable(false);
        setImageUpload(false);
      }
    } catch (error) {
      console.error("Error adding category:", error?.response?.data);
      setImageUpload(false);
    }
  };

  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.formStatus?.toLowerCase() !== "pending") {
      // console.log("okkk");
      setFormData({ ...formData, ["formStatus"]: "Pending" });
    } else {
      // return
      setLoading(true);
      try {
        const response = await axios.put(
          `/api/auth/editForm/${previewData?._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          setSuccess(
            "Details updated successfully. Application Pending Approval for the user until an Application has been approved"
          );
          setError("");
          localStorage.setItem("isFromUpdated", JSON.stringify(true));
          // setUpdated(true);
          getUserUpdate(2);
          setStatus(true);
          setLoading(false);
          refreshData();
        } else {
          setLoading(false);
          return;
        }
      } catch (error) {
        if (error?.response?.status === 404) {
          setError("Server error !");
          setError("");
          setLoading(false);
          return;
        } else {
          console.error("Error during category:", error);
          setError(error?.response?.data || "Server error !");
          setError("");
          setLoading(false);
        }
      }
    }
  };
  const getUserUpdate = (step) => {
    setLoading(true);
    const options = {
      method: "PUT",
      url: `/api/auth/updateUser`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      data: {
        id: userData,
        updatedDetails: {
          step: step,
        },
      },
    };
    axios
      .request(options)
      .then((response) => {
        // console.log(response?.data);
        if (response.status === 200) {
          setLoading(false);
          refreshData();
        } else {
          setLoading(false);
          return;
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  };
  const otherOptionHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    defaultStates();
  }, []);

  const defaultStates = () => {
    const option = {
      method: "GET",
      url: `/api/auth/getStateNames`,
    };
    axios
      .request(option)
      .then((response) => {
        setGetAllStates(response?.data);
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };
  return (
    <>
      {imageUpload && <Loader />}
      <section className="bg-[#f3f3f3] rounded max-h-[100vh] overflow-y-scroll">
        <div className="container mx-auto">
          <div className="py-[40px] lg:py-[70px] flex flex-col justify-center">
            <h4 className=" md:text-[40px] sm:text-[30px] text-[24px] font-semibold text-center pt-[8px]">
              Preview application form
            </h4>
            {formStatus === "Pending" ? (
              <div>
                <div className="flex justify-center mt-4">
                 <p className="py-2 px-4 rounded bg-[#dcf6dcdd] text-[green] text-[12px] font-medium mb-2 text-center"> Details updated successfully. Application Pending Approval.</p>
                  {/* for the user until an Application has been
                        approved */}
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="px-[10px] md:px-10  mb-6 py-4">
              {!(previewData?.formStatus?.toLowerCase() === "approved") ? (
                <>
                  {isUpdated ? (
                    <p className="text-center  cursor-pointer font-medium text-[16px] ">
                      Your application form is complete, please wait for the
                      admin to approve it.
                    </p>
                  ) : (
                    <p
                      className="text-right cursor-pointer font-medium max-w-[200px] ml-auto"
                      onClick={() => {
                        setStatus(false), setSuccess("");
                      }}
                    >
                      Edit
                    </p>
                  )}
                </>
              ) : (
                <p className="text-center  cursor-pointer font-medium text-[16px] text-[green] px-2 py-2">
                  Your application form has been approved, Please proceed
                  further.
                </p>
              )}
            </div>
            <form className="" onSubmit={handleSubmit}>
              <div>
                {/*-----------first name -----------*/}
                <div className="py-[20px] lg:max-w-[80%]  mx-auto flex flex-col md:grid md:grid-cols-2 gap-3 gap-x-10 items-start justify-center lg:px-0 px-[20px]">
                  <div className="inputDiv">
                    <label htmlFor="firstname" className="login-input-label ">
                      First Name*:
                    </label>

                    <input
                      id="firstname"
                      type="text"
                      name="firstname"
                      placeholder="First name"
                      className="login-input w-full mt-2 custom-input capitalize"
                      onChange={InputHandler}
                      pattern="^[A-Za-z][A-Za-z\s]*$"
                      title="Enter only alphabet"
                      maxLength={64}
                      value={formData.firstname}
                      disabled={isStatus}
                      required
                    />
                  </div>
                  {/*-----------Middle name -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="middlename" className="login-input-label ">
                      Middle Name:
                    </label>

                    <input
                      type="text"
                      id="middlename"
                      name="middlename"
                      placeholder="Middle name"
                      className="login-input w-full mt-2 custom-input capitalize"
                      onChange={InputHandler}
                      pattern="^[A-Za-z][A-Za-z\s]*$"
                      title="Enter only alphabet"
                      value={formData.middlename}
                      disabled={isStatus}
                      maxLength={64}
                    />
                  </div>
                  {/*-----------last name -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="lastname" className="login-input-label ">
                      Last Name*:
                    </label>

                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      placeholder="Last name"
                      className="login-input w-full mt-2 custom-input capitalize"
                      onChange={InputHandler}
                      pattern="^[A-Za-z][A-Za-z\s]*$"
                      title="Enter only alphabet"
                      maxLength={64}
                      value={formData.lastname}
                      disabled={isStatus}
                      required
                    />
                  </div>
                  {/*-----------Age -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="age" className="login-input-label ">
                      Age*:
                    </label>

                    <input
                      type="number"
                      name="age"
                      placeholder="Age"
                      className="login-input w-full mt-2 custom-input capitalize"
                      onChange={InputHandler}
                      // pattern="^[A-Za-z][A-Za-z\s]*$"
                      min={18}
                      max={100}
                      value={formData.age}
                      disabled={isStatus}
                      required
                    />
                  </div>
                  {/*----------- dob -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="dateOfBirth" className="login-input-label ">
                      DOB*:
                    </label>

                    <input
                      id="dateOfBirth"
                      type="date"
                      name="dateOfBirth"
                      placeholder="DOB (YYYY-MM-DD)"
                      className="login-input w-full mt-2 custom-input"
                      onChange={InputHandler}
                      max={formattedToday}
                      value={formData.dateOfBirth}
                      disabled={isStatus}
                      required
                    />
                  </div>
                  {/*----------- gender -----------*/}
                  <div className="">
                    <label htmlFor="gender" className="login-input-label ">
                      Gender :
                    </label>
                    <div className="flex md:gap-x-5 gap-x-2  py-3  md:px-4">
                      <div>
                        <input
                          type="radio"
                          name="gender"
                          id="male"
                          value="male"
                          className="peer hidden"
                          checked={formData.gender === "male"}
                          onChange={radioGender}
                          disabled={isStatus}
                        />
                        <label htmlFor="male" className="custom-radio">
                          {" "}
                          male{" "}
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="gender"
                          id="female"
                          value="female"
                          className="peer hidden"
                          checked={formData.gender === "female"}
                          onChange={radioGender}
                          disabled={isStatus}
                        />
                        <label htmlFor="female" className="custom-radio">
                          female{" "}
                        </label>
                      </div>
                    </div>
                  </div>
                  {/*----------- email -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="email" className="login-input-label ">
                      Email*:
                    </label>

                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      // disabled={true}
                      maxLength={`64`}
                      defaultValue={userMail}
                      value={formData?.email}
                      className="login-input w-full mt-2 custom-input "
                      onChange={InputHandler}
                      disabled={isStatus}
                      required
                    />
                  </div>
                  {/*----------- number -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="contactNumber"
                      className="login-input-label "
                    >
                      Contact No.*:
                    </label>

                    <input
                      type="text"
                      id="contactNumber"
                      name="contactNumber"
                      placeholder="Mobile no."
                      className="login-input w-full mt-2 custom-input"
                      pattern="[0-9]*"
                      title="Enter only numbers"
                      // disabled={true}
                      defaultValue={userContact}
                      value={formData?.contactNumber}
                      onChange={InputHandler}
                      disabled={isStatus}
                      required
                    />
                  </div>
                  {/*----------- address -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="address" className="login-input-label ">
                      Street Address:
                    </label>

                    <textarea
                      id="address"
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      className="login-input w-full mt-2 custom-input h-[80px]"
                      onChange={InputHandler}
                      pattern="^\S.*$"
                      title="Please enter address without leading white space"
                      maxLength={300}
                      value={formData.address}
                      disabled={isStatus}
                    ></textarea>
                  </div>
                  {/*----------- city -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="city" className="login-input-label ">
                      City*:
                    </label>

                    <input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="City"
                      className="login-input w-full mt-2 custom-input"
                      pattern="^\S.*$"
                      maxLength={`100`}
                      title="Please enter address without leading white space"
                      onChange={InputHandler}
                      value={formData.city}
                      disabled={isStatus}
                      required
                    />
                  </div>
                  {/*----------- state -----------*/}
                  {/* <div className="inputDiv">
                    <label htmlFor="state" className="login-input-label ">
                      State*:
                    </label>

                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      className="login-input w-full mt-2 custom-input"
                      onChange={InputHandler}
                      pattern="^\S.*$"
                      maxLength={`64`}
                      value={formData.state}
                      disabled={isStatus}
                      title="Please enter address without leading white space"
                      required
                    />
                  </div> */}
                  <div className="inputDiv">
                    <label htmlFor="state" className="login-input-label ">
                      State*:
                    </label>
                    <select
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                      id="state"
                      name="state"
                      // value={nativeLanguage}
                      value={formData.state}
                      onChange={InputHandler}
                      required
                    >
                      <option value="">Select...</option>
                      {Array.isArray(getAllStates) &&
                        getAllStates.map((item, index) => {
                          return (
                            <>
                              <option key={item._id} value={item._id}>
                                {item?.State}
                              </option>
                            </>
                          );
                        })}
                    </select>
                  </div>
                  {/*----------- background -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="background" className="login-input-label ">
                      Background*:
                    </label>
                    <select
                      className={`login-input w-full  mt-2 custom-input  ${
                        isStatus ? "disable_input" : "bg-white"
                      }`}
                      id="background"
                      name="background"
                      value={formData.background}
                      disabled={isStatus}
                      // value={nativeLanguage}
                      onChange={InputHandler}
                      required
                    >
                      <option value="">
                        {isOtherBackOption ? "Other" : "Select"}
                      </option>
                      {nativeBackOptions.map((items, index) => {
                        return (
                          <>
                            <option key={index} value={items}>
                              {items}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  {isOtherBackOption ? (
                    <div className="inputDiv">
                      <label
                        htmlFor="background"
                        className="login-input-label "
                      >
                        Other Ethnicity*:
                      </label>

                      <input
                        type="text"
                        name="background"
                        value={formData.background}
                        placeholder="Other Ethnicity"
                        className="login-input w-full mt-2 custom-input"
                        onChange={otherOptionHandler}
                        pattern="^[A-Za-z][A-Za-z\s]*$"
                        title="Enter only alphabet"
                        maxLength={64}
                        disabled={isStatus}
                        required
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  {/* /////////////////////////////language///////////     */}
                  <div className="inputDiv">
                    <label
                      htmlFor="nativeLanguage"
                      className="login-input-label "
                    >
                      Native Language*:
                    </label>
                    <select
                      className={`login-input w-full  mt-2 custom-input  ${
                        isStatus ? "disable_input" : "bg-white"
                      }`}
                      id="nativelanguage"
                      name="nativelanguage"
                      value={formData.nativelanguage}
                      // value={nativeLanguage}
                      disabled={isStatus}
                      onChange={InputHandler}
                      required
                    >
                      <option value="">
                        {isOtherLanguage ? "Other" : "Select"}
                      </option>
                      <option value="English">English</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {isOtherLanguage ? (
                    <div className="inputDiv">
                      <label
                        htmlFor="nativeLanguage"
                        className="login-input-label "
                      >
                        Other Native Language*:
                      </label>

                      <input
                        type="text"
                        name="nativelanguage"
                        value={formData.nativelanguage}
                        placeholder="Other Native Language"
                        className="login-input w-full mt-2 custom-input"
                        onChange={otherOptionHandler}
                        disabled={isStatus}
                        pattern="^[A-Za-z][A-Za-z\s]*$"
                        title="Enter only alphabet"
                        maxLength={64}
                        required
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {/*----------- marital Status -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="maritalStatus"
                      className="login-input-label "
                    >
                      Marital Status*:
                    </label>
                    <select
                      id="maritalStatus"
                      name="maritalStatus"
                      onChange={InputHandler}
                      disabled={isStatus}
                      required
                      value={formData.maritalStatus}
                      className={`login-input w-full  mt-2 custom-input  ${
                        isStatus ? "disable_input" : "bg-white"
                      }`}
                    >
                      <option className="text-gray-100 " value="">
                        Choose marital status
                      </option>
                      {marital_status?.map((sts, inx) => (
                        <option value={sts} key={inx} className="py-2">
                          {sts}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/*----------- height -----------*/}
                  {/* <div className="inputDiv">
                    <label htmlFor="height" className="login-input-label ">
                      Height*:
                    </label>

                    <input
                      type="text"
                      name="height"
                      placeholder="Height (cm)"
                      className="login-input w-full mt-2 custom-input"
                      onChange={InputHandler}
                      disabled={isStatus}
                      value={formData.height}
                      pattern="^([1-9]|[1-9]\d|1\d{2}|200)$"
                      title="Please enter height in inches without leading 0 and up to 3 digits."
                      required
                    />
                  </div> */}
                  <div className="inputDiv">
                    <label htmlFor="height" className="login-input-label ">
                      Height*:
                    </label>
                    <select
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                      id="height"
                      name="height"
                      // value={nativeLanguage}
                      value={formData.height}
                      onChange={InputHandler}
                      required
                    >
                      <option value="">Select...</option>
                      <option value="Less than 5.0">Less than 5.0</option>
                      <option value="5.0 to 5.5">5.0 to 5.5</option>
                      <option value="5.5 to 6.0">5.5 to 6.0</option>
                      <option value="Over 6.0">Over 6.0</option>
                      <option value="No preference">No preference</option>
                    </select>
                  </div>
                  {/*----------- weigth/bodytype -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="weight" className="login-input-label ">
                      Weight/Body Type*:
                    </label>
                    <select
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      disabled={isStatus}
                      onChange={InputHandler}
                      required
                      className={`login-input w-full  mt-2 custom-input  ${
                        isStatus ? "disable_input" : "bg-white"
                      }`}
                    >
                      <option className="text-gray-100 " value="">
                        Choose Weight/Body Type
                      </option>
                      {bodyType?.map((sts, inx) => (
                        <option value={sts} key={inx} className="py-2">
                          {sts}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/*----------- religion -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="religion" className="login-input-label ">
                      Religion*:
                    </label>
                    <select
                      id="religion"
                      name="religion"
                      onChange={InputHandler}
                      disabled={isStatus}
                      value={formData.religion}
                      required
                      className={`login-input w-full  mt-2 custom-input  ${
                        isStatus ? "disable_input" : "bg-white"
                      }`}
                    >
                      <option value="">
                        {isOtherMuslim ? "Other" : "Select"}
                      </option>

                      {religionType?.map((sts, inx) => (
                        <option value={sts} key={inx} className="py-2">
                          {sts}
                        </option>
                      ))}
                    </select>
                  </div>
                  {isOtherMuslim ? (
                    <div className="inputDiv">
                      <label htmlFor="religion" className="login-input-label ">
                        Other Muslim*:
                      </label>

                      <input
                        type="text"
                        name="religion"
                        value={formData.religion}
                        placeholder="Other Muslim"
                        className="login-input w-full mt-2 custom-input"
                        onChange={otherOptionHandler}
                        disabled={isStatus}
                        pattern="^[A-Za-z][A-Za-z\s]*$"
                        title="Enter only alphabet"
                        maxLength={64}
                        required
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {/*----------- education -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="education" className="login-input-label ">
                      Education :
                    </label>
                    <select
                      id="education"
                      name="education"
                      onChange={InputHandler}
                      disabled={isStatus}
                      required
                      value={formData.education}
                      className={`login-input w-full  mt-2 custom-input  ${
                        isStatus ? "disable_input" : "bg-white"
                      }`}
                    >
                      <option className="text-gray-100 " value="">
                        Choose Education
                      </option>
                      {educationLevel?.map((sts, inx) => (
                        <option value={sts} key={inx} className="py-2">
                          {sts}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/*----------- occupation -----------*/}

                  <div className="inputDiv">
                    <label htmlFor="occupation" className="login-input-label ">
                      Profession :
                    </label>
                    <input
                      type="text"
                      name="occupation"
                      placeholder="Occupation"
                      disabled={isStatus}
                      className="login-input w-full mt-2 custom-input capitalize"
                      onChange={InputHandler}
                      pattern="^[^\s][A-Za-z0-9\s]*$"
                      title="Please enter a valid occuption without leading white space or special characters"
                      maxLength={64}
                      value={formData.occupation}
                    />
                  </div>

                  {/*----------- income -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="income" className="login-input-label ">
                      Income(in dollar)*:
                    </label>
                    <select
                      id="income"
                      name="income"
                      onChange={InputHandler}
                      disabled={isStatus}
                      required
                      value={formData.income}
                      className={`login-input w-full  mt-2 custom-input  ${
                        isStatus ? "disable_input" : "bg-white"
                      }`}
                    >
                      <option className="text-gray-100 " value="">
                        Choose Income Range
                      </option>
                      {incomeRange?.map((sts, inx) => (
                        <option value={sts} key={inx} className="py-2">
                          {sts}
                        </option>
                      ))}
                    </select>
                  </div>

0

                  {/*----------- hobbies -----------*/}
                  {!isStatus ? (
                    <>
                      <div className="py-2 ">
                        <span className="login-input-label mb-1">Hobbies:</span>
                        <div className="flex items-center gap-5 py-2 ">
                          <input
                            type="text"
                            name="hobby"
                            placeholder="Hobbies"
                            className={`login-input w-full mt-2 custom-input  ${
                              isStatus ? "disable_input" : ""
                            }`}
                            value={hobby}
                            onChange={InputHandler}
                            disabled={isStatus}
                          />
                          <button
                            type="button"
                            className=" rounded px-1 py-1 text-[19px] font-bold cursor-pointer "
                            onClick={handleAddHobbies}
                          >
                            +
                          </button>
                        </div>
                        <div className="py-2">
                          {formData?.hobbies?.length > 0 && (
                            <>
                              {/* <span className="login-input-label mb-1">
                            Hobbies:
                          </span> */}
                              <div className=" grid md:grid-cols-2 lg:grid-cols-3 flex-col gap-1 px-2 py-3 rounded-[10px] w-full mt-2  bg-white">
                                {formData?.hobbies?.map((hob, inx) => (
                                  <p
                                    className="flex gap-x-2 text-[14px]"
                                    key={inx}
                                  >
                                    <span className="max-w-[100px] text-ellipsis overflow-hidden flex whitespace-nowrap capitalize">
                                      {inx + 1}. {hob}
                                    </span>
                                    <span
                                      className="cursor-pointer font-semibold text-[14px]"
                                      onClick={() => removeHobbies(inx)}
                                    >
                                      x
                                    </span>
                                  </p>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="inputDiv">
                      {formData?.hobbies?.length > 0 && (
                        <>
                          <span className="login-input-label "> Hobbies :</span>
                          <div
                            className={`grid md:grid-cols-2 lg:grid-cols-3 flex-col inputDiv custom-input
                        ${isStatus ? "disable_input" : "bg-white"}`}
                          >
                            {formData?.hobbies?.map((hob, inx) => (
                              <p className="flex gap-x-2 text-[12px]" key={inx}>
                                <span className="max-w-[100px] text-ellipsis overflow-hidden flex whitespace-nowrap capitalize">
                                  {inx + 1}. {hob}
                                </span>
                                {/* <span className="cursor-pointer" onClick={()=>removeHobbies(inx)}> x</span>  */}
                              </p>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/*----------- familyDetails -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="familyDetails"
                      className="login-input-label "
                    >
                      Tell us something about yourself :
                    </label>
                    <textarea
                      type="text"
                      name="familyDetails"
                      placeholder="About yourself"
                      className="login-input w-full mt-2 custom-input h-[80px]"
                      onChange={InputHandler}
                      pattern="^\S.*$"
                      title="Please enter about yourself without leading white space"
                      maxLength={1000}
                      value={formData.familyDetails}
                      disabled={isStatus}
                      // required
                    ></textarea>
                  </div>
                  {/*----------- Relocate -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="wantRelocate"
                      className="login-input-label "
                    >
                      Are you willing to relocate? :
                    </label>
                    <select
                      id="wantRelocate"
                      name="wantRelocate"
                      onChange={InputHandler}
                      value={formData.wantRelocate}
                      disabled={isStatus}
                      className={`login-input w-full  mt-2 custom-input  ${
                        isStatus ? "disable_input" : "bg-white"
                      }`}
                    >
                      <option className="text-gray-100 " value="">
                        Choose appropiate answer
                      </option>

                      <option value={true} className="py-2">
                        Yes
                      </option>
                      <option value={false} className="py-2">
                        No
                      </option>
                    </select>
                  </div>
                  {/*----------- Have Kids -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="isKid" className="login-input-label ">
                      Do you have kids? :
                    </label>
                    <select
                      id="isKid"
                      name="isKid"
                      onChange={InputHandler}
                      value={formData.isKid}
                      disabled={isStatus}
                      className={`login-input w-full  mt-2 custom-input  ${
                        isStatus ? "disable_input" : "bg-white"
                      }`}
                    >
                      <option className="text-gray-100 " value="">
                        Choose appropiate answer
                      </option>

                      <option value={`No`} className="py-2">
                        No
                      </option>
                      <option
                        value={`Yes-Living with you full time.`}
                        className="py-2"
                      >
                        Yes - Living with you full time.
                      </option>
                      <option
                        value={`Yes-Living with other parent full time.`}
                        className="py-2"
                      >
                        Yes - Living with other parent full time.
                      </option>
                      <option value={`Yes-Coparenting.`} className="py-2">
                        Yes - Coparenting.
                      </option>
                    </select>
                  </div>
                  {/* no of kids */}
                  <div className="inputDiv">
                    <label htmlFor="NoOfKids" className="login-input-label ">
                      How many kids you have? :
                    </label>
                    <input
                      type="number"
                      name="NoOfKids"
                      placeholder="No Of Kids"
                      className="login-input w-full mt-2 custom-input capitalize"
                      onChange={InputHandler}
                      // pattern="^[^\s][A-Za-z0-9\s]*$"
                      title="Please enter valid number kids between 0 to 20"
                      // maxLength={64}
                      disabled={isStatus}
                      value={formData.NoOfKids}
                      min="0"
                      max="20"
                    />
                  </div>
                  {/*----------- Want Kids -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="wantKid" className="login-input-label ">
                      Do you want kids? :
                    </label>
                    <select
                      id="wantKid"
                      name="wantKid"
                      onChange={InputHandler}
                      value={formData.wantKid}
                      disabled={isStatus}
                      className={`login-input w-full  mt-2 custom-input  ${
                        isStatus ? "disable_input" : "bg-white"
                      }`}
                    >
                      <option className="text-gray-100 " value="">
                        Choose appropiate answer
                      </option>

                      <option value={true} className="py-2">
                        Yes
                      </option>
                      <option value={false} className="py-2">
                        No
                      </option>
                    </select>
                  </div>
                  {/*----------- Smoke -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="isSmoke" className="login-input-label ">
                      Do you smoke? :
                    </label>
                    <select
                      id="isSmoke"
                      name="isSmoke"
                      onChange={InputHandler}
                      value={formData.isSmoke}
                      disabled={isStatus}
                      className={`login-input w-full  mt-2 custom-input  ${
                        isStatus ? "disable_input" : "bg-white"
                      }`}
                    >
                      <option className="text-gray-100 " value="">
                        Choose appropiate answer
                      </option>

                      <option value={true} className="py-2">
                        Yes
                      </option>
                      <option value={false} className="py-2">
                        No
                      </option>
                    </select>
                  </div>
                  {/*----------- Immigration Legal Status -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="immigrationStatus"
                      className="login-input-label "
                    >
                      Immigration Legal Status*:
                    </label>
                    <select
                      id="immigrationStatus"
                      name="immigrationStatus"
                      onChange={InputHandler}
                      required
                      value={formData.immigrationStatus}
                      disabled={isStatus}
                      className={`login-input w-full  mt-2 custom-input  ${
                        isStatus ? "disable_input" : "bg-white"
                      }`}
                    >
                      <option className="text-gray-100 " value="">
                        Choose appropiate answer
                      </option>

                      {immigrationStatusArray?.map((sts, inx) => (
                        <option value={sts} key={inx} className="py-2">
                          {sts}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* /////////////////////////////////////////socialmedia */}
                  <div className="inputDiv">
                    <label htmlFor="socialMedia" className="login-input-label ">
                      Social Media(Link) :
                    </label>
                    <input
                      type="text"
                      name="socialMedia"
                      style={{ textTransform: "lowercase" }}
                      placeholder="FB/ Instagram/ X/ Tiktok/ LinkedIn/ Other"
                      className="login-input w-full mt-2 custom-input capitalize"
                      onChange={InputHandler}
                      pattern="^\S.*$"
                      title="Please enter a valid occuption without leading white space or special characters"
                      maxLength={200}
                      value={formData.socialMedia}
                      disabled={isStatus}
                    />
                  </div>

                  <div className="py-2 flex items-end gap-x-10">
                    <div className="">
                      <span className="login-input-label cursor-pointer mb-3">
                        Picture
                      </span>
                      {/* {console.log(formData)} */}
                      {isStatus ? (
                        <>
                          {formData?.image !== "" && (
                            <Image
                              src={formData?.image}
                              alt="profile"
                              height={200}
                              width={200}
                            />
                          )}
                        </>
                      ) : (
                        <>
                          {formData?.image ? (
                            <div
                              style={{
                                position: "relative",
                                width: "100px",
                                height: "100px",
                              }}
                            >
                              <img
                                src={formData?.image}
                                alt="loading"
                                style={{ width: "100px", height: "100px" }}
                              />
                              <button
                                onClick={handleRemoveImage}
                                className="text-[14px] font-[400] text-[red] hover:bg-[#efb3b38a]"
                                style={{
                                  position: "absolute",
                                  top: "0px",
                                  right: "0px",
                                  cursor: "pointer",
                                }}
                              >
                                {/* <CloseIcon /> */} X
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center w-fullmd:gap-5 gap-2 mt-2">
                              <div className="md:w-[50%] w-full">
                                <input
                                  id="file"
                                  type="file"
                                  name="image"
                                  disabled={imageDisable}
                                  onChange={InputHandler}
                                  className="w-full bg-cyan-500 hover:bg-cyan-600 "
                                  accept="image/png,image/jpg, image/jpeg , image/*"
                                />
                                {isImgError && (
                                  <div className="py-1 px-4 w-full rounded mt-2 bg-[#e6c8c8e3] text-[red] text-[12px] font-medium mb-2">
                                    {isImgError}
                                  </div>
                                )}
                              </div>
                              <div className="">
                                <button
                                  className={`focus-visible:outline-none text-[13px] px-4 py-1 rounded
                                ${
                                  imageDisable
                                    ? " bg-[green]"
                                    : imageUpload
                                    ? "bg-[gray]"
                                    : "bg-[#070708bd] text-[white]"
                                }`}
                                  type="button"
                                  onClick={uploadImage}
                                  disabled={imageDisable || imageUpload}
                                >
                                  {imageDisable
                                    ? "Uploaded"
                                    : imageUpload
                                    ? "Loading.."
                                    : "Upload"}
                                </button>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  {/* <div className=""></div> */}
                </div>
                <div className="py-[20px] lg:max-w-[80%]  mx-auto flex flex-col md:grid md:grid-cols-2 gap-3 gap-x-10 items-start justify-center lg:px-0 px-[20px]">
                  <h3 style={{ fontSize: "22px" }}>Potential Partner</h3>
                </div>

                {/* ///////////////////////potential Partner///////////////// */}
                <div className="py-[20px] lg:max-w-[80%]  mx-auto flex flex-col md:grid md:grid-cols-2 gap-3 gap-x-10 items-start justify-center lg:px-0 px-[20px]">
                  <div className="inputDiv">
                    <label htmlFor="partnerAge" className="login-input-label ">
                      Age Range :
                    </label>
                    <select
                      id="partnerAge"
                      name="partnerAge"
                      onChange={InputHandler}
                      disabled={isStatus}
                      value={formData.partnerAge}
                      className={`login-input w-full  mt-2 custom-input  ${
                        isStatus ? "disable_input" : "bg-white"
                      }`}
                    >
                      <option className="text-gray-100 " value="">
                        Choose appropiate answer
                      </option>

                      {partnerAgeArray?.map((sts, inx) => (
                        <option value={sts} key={inx} className="py-2">
                          {sts}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* /////////////////gender/////////////// */}
                  <div className="">
                    <label
                      htmlFor="partnerGender"
                      className="login-input-label "
                    >
                      Gender :
                    </label>
                    <div className="flex md:gap-x-5 gap-x-2  py-3  md:px-4">
                      <div>
                        <input
                          type="radio"
                          name="partnerGender"
                          id="male"
                          value="male"
                          className="peer hidden"
                          disabled={true}
                          checked={formData.partnerGender === "male"}
                        />
                        <label htmlFor="male" className="custom-radio">
                          {" "}
                          male{" "}
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="partnerGender"
                          id="female"
                          value="female"
                          className="peer hidden"
                          disabled={true}
                          checked={formData.partnerGender === "female"}
                        />
                        <label htmlFor="female" className="custom-radio">
                          female{" "}
                        </label>
                      </div>
                      {/* <div>
                      <input
                        type="radio"
                        name="gender"
                        id="other"
                        value="other"
                        className="peer hidden"
                        checked={formData.gender === "other"}
                        onChange={InputHandler}
                      />
                      <label htmlFor="other" className="custom-radio">
                        other{" "}
                      </label>
                    </div> */}
                    </div>
                  </div>
                  {/* //////marital status ///////// */}
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerMaritalStatus"
                      className="login-input-label "
                    >
                      Marital Status :
                    </label>
                    <select
                      id="partnerMaritalStatus"
                      name="partnerMaritalStatus"
                      onChange={InputHandler}
                      disabled={isStatus}
                      value={formData.partnerMaritalStatus}
                      className={`login-input w-full  mt-2 custom-input  ${
                        isStatus ? "disable_input" : "bg-white"
                      }`}
                    >
                      <option className="text-gray-100 " value="">
                        Choose marital status
                      </option>
                      {marital_status?.map((sts, inx) => (
                        <option value={sts} key={inx} className="py-2">
                          {sts}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/*----------- religion -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerReligion"
                      className="login-input-label "
                    >
                      Religion :
                    </label>
                    <select
                      id="partnerReligion"
                      name="partnerReligion"
                      onChange={InputHandler}
                      disabled={isStatus}
                      value={formData.partnerReligion}
                      className={`login-input w-full  mt-2 custom-input  ${
                        isStatus ? "disable_input" : "bg-white"
                      }`}
                    >
                      <option value="">
                        {isPartnerOtherMuslim ? "Other" : "Select"}
                      </option>

                      {religionType?.map((sts, inx) => (
                        <option value={sts} key={inx} className="py-2">
                          {sts}
                        </option>
                      ))}
                      <option value="Any">Any</option>
                    </select>
                  </div>
                  {isPartnerOtherMuslim ? (
                    <div className="inputDiv">
                      <label
                        htmlFor="partnerReligion"
                        className="login-input-label "
                      >
                        Other Muslim*:
                      </label>

                      <input
                        type="text"
                        name="partnerReligion"
                        value={formData.partnerReligion}
                        placeholder="Other Muslim"
                        className="login-input w-full mt-2 custom-input"
                        onChange={otherOptionHandler}
                        disabled={isStatus}
                        pattern="^[A-Za-z][A-Za-z\s]*$"
                        title="Enter only alphabet"
                        maxLength={64}
                        required
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {/*----------- background -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerBackground"
                      className="login-input-label "
                    >
                      Background:
                    </label>
                    <select
                      className={`login-input w-full  mt-2 custom-input  ${
                        isStatus ? "disable_input" : "bg-white"
                      }`}
                      id="partnerBackground"
                      name="partnerBackground"
                      value={formData.partnerBackground}
                      disabled={isStatus}
                      onChange={InputHandler}
                    >
                      <option value="">
                        {isPartnerOtherBackground ? "Other" : "Select"}
                      </option>

                      {nativeBackOptions.map((items, index) => {
                        return (
                          <>
                            <option key={index} value={items}>
                              {items}
                            </option>
                          </>
                        );
                      })}
                      <option value="Any">Any</option>
                    </select>
                  </div>
                  {isPartnerOtherBackground ? (
                    <div className="inputDiv">
                      <label
                        htmlFor="partnerBackground"
                        className="login-input-label "
                      >
                        Other Ethnicity*:
                      </label>

                      <input
                        type="text"
                        name="partnerBackground"
                        value={formData.partnerBackground}
                        placeholder="Other Ethnicity"
                        className="login-input w-full mt-2 custom-input"
                        onChange={otherOptionHandler}
                        disabled={isStatus}
                        pattern="^[A-Za-z][A-Za-z\s]*$"
                        title="Enter only alphabet"
                        maxLength={64}
                        required
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="inputDiv">
                    <label
                      htmlFor="partnerIncome"
                      className="login-input-label "
                    >
                      Income(in dollar) :
                    </label>
                    <select
                      id="partnerIncome"
                      name="partnerIncome"
                      onChange={InputHandler}
                      value={formData.partnerIncome}
                      disabled={isStatus}
                      className={`login-input w-full  mt-2 custom-input  ${
                        isStatus ? "disable_input" : "bg-white"
                      }`}
                    >
                      <option className="text-gray-100 " value="">
                        Choose Income Range
                      </option>
                      {incomeRanges?.map((sts, inx) => (
                        <option value={sts} key={inx} className="py-2">
                          {sts}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/*----------- city -----------*/}
                  {/* <div className="inputDiv">
                    <label htmlFor="partnerCity" className="login-input-label ">City:</label>

                    <input
                      type="text"
                      name="partnerCity"
                      id="partnerCity"
                      placeholder="City"
                      className="login-input w-full mt-2 custom-input"
                      pattern="^[A-Za-z][A-Za-z\s]*$"
                      maxLength={`100`}
                      disabled={isStatus}
                      title="Please enter address without leading white space"
                      onChange={InputHandler}
                      value={formData.partnerCity}

                    />
                  </div> */}
                  {/*----------- state -----------*/}
                  {/* <div className="inputDiv">
                    <label htmlFor="partnerState" className="login-input-label ">State:</label>

                    <input
                      type="text"
                      name="partnerState"
                      placeholder="State"
                      className="login-input w-full mt-2 custom-input"
                      onChange={InputHandler}
                      disabled={isStatus}
                      pattern="^[A-Za-z][A-Za-z\s]*$"
                      maxLength={`100`}
                      value={formData.partnerState}
                      title="Please enter address without leading white space"

                    />
                  </div> */}

                  {/*----------- country -----------*/}
                  {/* <div className="inputDiv">
                    <label htmlFor="partnerCountry" className="login-input-label ">Country:</label>

                    <input
                      type="text"
                      name="partnerCountry"
                      placeholder="Country"
                      className="login-input w-full mt-2 custom-input"
                      onChange={InputHandler}
                      disabled={isStatus}
                      pattern="^[A-Za-z][A-Za-z\s]*$"
                      maxLength={`100`}
                      value={formData.partnerCountry}
                      title="Please enter address without leading white space"

                    />
                  </div> */}
                  {/*----------- Relocate -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerRelocate"
                      className="login-input-label "
                    >
                      Willing to relocate :
                    </label>
                    <select
                      id="partnerRelocate"
                      name="partnerRelocate"
                      onChange={InputHandler}
                      disabled={isStatus}
                      value={formData.partnerRelocate}
                      className={`login-input w-full  mt-2 custom-input  ${
                        isStatus ? "disable_input" : "bg-white"
                      }`}
                    >
                      <option className="text-gray-100 " value="">
                        Choose appropiate answer
                      </option>

                      <option value={true} className="py-2">
                        Yes
                      </option>
                      <option value={false} className="py-2">
                        No
                      </option>
                    </select>
                  </div>

                  {/*----------- education -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerEducation"
                      className="login-input-label "
                    >
                      Education :
                    </label>
                    <select
                      id="partnerEducation"
                      name="partnerEducation"
                      onChange={InputHandler}
                      disabled={isStatus}
                      value={formData.partnerEducation}
                      className={`login-input w-full  mt-2 custom-input  ${
                        isStatus ? "disable_input" : "bg-white"
                      }`}
                    >
                      <option className="text-gray-100 " value="">
                        Choose Education
                      </option>
                      {educationLevels?.map((sts, inx) => (
                        <option value={sts} key={inx} className="py-2">
                          {sts}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/*----------- height -----------*/}
                  {/* <div className="inputDiv">
                    <label
                      htmlFor="partnerHeight"
                      className="login-input-label "
                    >
                      Height :
                    </label>

                    <input
                      type="text"
                      name="partnerHeight"
                      placeholder="Height (cm)"
                      className="login-input w-full mt-2 custom-input"
                      onChange={InputHandler}
                      value={formData.partnerHeight}
                      disabled={isStatus}
                      pattern="^([1-9]|[1-9]\d|1\d{2}|200)$"
                      title="Please enter height in inches without leading 0 and up to 3 digits."
                    />
                  </div> */}
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerHeight"
                      className="login-input-label "
                    >
                      Height*:
                    </label>
                    <select
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                      id="partnerHeight"
                      name="partnerHeight"
                      // value={nativeLanguage}
                      value={formData.partnerHeight}
                      onChange={InputHandler}
                      required
                    >
                      <option value="">Select...</option>
                      <option value="Less than 5.0">Less than 5.0</option>
                      <option value="5.0 to 5.5">5.0 to 5.5</option>
                      <option value="5.5 to 6.0">5.5 to 6.0</option>
                      <option value="Over 6.0">Over 6.0</option>
                      <option value="No preference">No preference</option>
                    </select>
                  </div>
                  {/*----------- weigth/bodytype -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerWeight"
                      className="login-input-label "
                    >
                      Weight/Body Type :
                    </label>
                    <select
                      id="partnerWeight"
                      name="partnerWeight"
                      value={formData.partnerWeight}
                      onChange={InputHandler}
                      disabled={isStatus}
                      className={`login-input w-full  mt-2 custom-input  ${
                        isStatus ? "disable_input" : "bg-white"
                      }`}
                    >
                      <option className="text-gray-100 " value="">
                        Choose Weight/Body Type
                      </option>
                      <option className="text-gray-100 " value="No-preference">
                        No preference
                      </option>
                      {bodyType?.map((sts, inx) => (
                        <option value={sts} key={inx} className="py-2">
                          {sts}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/*----------- Have Kids -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerIsKid"
                      className="login-input-label "
                    >
                      Do they have kids? :
                    </label>
                    <select
                      id="partnerIsKid"
                      name="partnerIsKid"
                      onChange={InputHandler}
                      disabled={isStatus}
                      value={formData.partnerIsKid}
                      className={`login-input w-full  mt-2 custom-input  ${
                        isStatus ? "disable_input" : "bg-white"
                      }`}
                    >
                      <option className="text-gray-100 " value="">
                        Choose appropiate answer
                      </option>

                      <option value={`No`} className="py-2">
                        No
                      </option>
                      <option value={`Yes`} className="py-2">
                        Yes
                      </option>
                      <option value={`Any`} className="py-2">
                        Any.
                      </option>
                    </select>
                  </div>

                  {/*----------- Want Kids -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerWantKid"
                      className="login-input-label "
                    >
                      Do they want kids? :
                    </label>
                    <select
                      id="partnerWantKid"
                      name="partnerWantKid"
                      onChange={InputHandler}
                      disabled={isStatus}
                      value={formData.partnerWantKid}
                      className={`login-input w-full  mt-2 custom-input  ${
                        isStatus ? "disable_input" : "bg-white"
                      }`}
                    >
                      <option className="text-gray-100 " value="">
                        Choose appropiate answer
                      </option>

                      <option value={true} className="py-2">
                        Yes
                      </option>
                      <option value={false} className="py-2">
                        No
                      </option>
                      <option value={"Any"} className="py-2">
                        Any
                      </option>
                    </select>
                  </div>
                  {/*----------- Immigration Legal Status -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerImmigrationStatus"
                      className="login-input-label "
                    >
                      Immigration Legal Status :
                    </label>
                    <select
                      id="partnerImmigrationStatus"
                      name="partnerImmigrationStatus"
                      onChange={InputHandler}
                      disabled={isStatus}
                      value={formData.partnerImmigrationStatus}
                      className={`login-input w-full  mt-2 custom-input  ${
                        isStatus ? "disable_input" : "bg-white"
                      }`}
                    >
                      <option className="text-gray-100 " value="">
                        Choose appropiate answer
                      </option>

                      {immigrationStatusArrays?.map((sts, inx) => (
                        <option value={sts} key={inx} className="py-2">
                          {sts}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* /////////////////////////////language///////////     */}
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerNativeLanguage"
                      className="login-input-label "
                    >
                      Native Language:
                    </label>
                    <select
                      className={`login-input w-full  mt-2 custom-input  ${
                        isStatus ? "disable_input" : "bg-white"
                      }`}
                      id="partnerNativeLanguage"
                      name="partnerNativeLanguage"
                      value={formData.partnerNativeLanguage}
                      onChange={InputHandler}
                      disabled={isStatus}
                    >
                      <option value="">
                        {isPartnerOtherLanguage ? "Other" : "Select"}
                      </option>
                      <option value="English">English</option>
                      <option value="other">Other</option>
                      <option value="Any">Any</option>
                    </select>
                  </div>
                  {isPartnerOtherLanguage ? (
                    <div className="inputDiv">
                      <label
                        htmlFor="partnerNativeLanguage"
                        className="login-input-label "
                      >
                        Other Native Language*:
                      </label>

                      <input
                        type="text"
                        name="partnerNativeLanguage"
                        value={formData.partnerNativeLanguage}
                        placeholder="Other Native Language"
                        className="login-input w-full mt-2 custom-input"
                        onChange={otherOptionHandler}
                        pattern="^[A-Za-z][A-Za-z\s]*$"
                        disabled={isStatus}
                        title="Enter only alphabet"
                        maxLength={100}
                        required
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  {/*-----------Spoken language -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerLanguageSpeak"
                      className="login-input-label "
                    >
                      Language Spoken:
                    </label>

                    <input
                      type="text"
                      id="partnerLanguageSpeak"
                      name="partnerLanguageSpeak"
                      placeholder="Language Spoken"
                      className="login-input w-full mt-2 custom-input capitalize"
                      onChange={InputHandler}
                      pattern="[^\s,].*"
                      disabled={isStatus}
                      title="Enter only letters and optional commas, but no white space at the beginning"
                      maxLength={100}
                      value={formData.partnerLanguageSpeak}
                    />
                  </div>
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerDetail"
                      className="login-input-label "
                    >
                      About Your Partner:
                    </label>

                    <textarea
                      id="partnerDetail"
                      type="text"
                      name="partnerDetail"
                      placeholder="About Your Partner"
                      className="login-input w-full mt-2 custom-input h-[80px]"
                      onChange={InputHandler}
                      pattern="^\S.*$"
                      disabled={isStatus}
                      title="Please enter partner details without leading white space"
                      maxLength={1000}
                      value={formData.partnerDetail}
                    ></textarea>
                  </div>
                <div className="w-full lg:max-w-[80%]  mx-auto">
                  {isError && (
                    <div className="py-2 px-4 rounded bg-[#e6c8c8e3] text-[red] text-[12px] font-medium mb-2">
                      {isError}
                    </div>
                  )}
                  {isSuccess && (
                    <div className="py-2 px-4 rounded bg-[#dcf6dcdd] text-[green] text-[12px] font-medium mb-2">
                      {isSuccess}
                    </div>
                  )}

                  {!isStatus && (
                    <div className="mt-6 text-right">
                      <button
                        type="submit"
                        disabled={isLoading || isUpdated}
                        className={`w-full px-3 max-w-[130px] bg-[#1f2432] text-[15px] font-medium  py-2 rounded-lg hover:border hover:bg-[white] hover:border-[gray] hover:text-[black] text-[white] transition-all delay-75
                    ${isUpdated ? "bg-[gray]" : ""}`}
                      >
                        {isLoading
                          ? "Loading.."
                          : isUpdated
                          ? "Updated"
                          : "Update"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewApplicationDetails;
