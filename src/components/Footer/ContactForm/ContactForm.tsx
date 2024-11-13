import React, { ChangeEvent } from "react";
import { useMutation } from "@apollo/client";
import { NEW_FEEDBACK } from "@/lib/mutations/newFeedBack";
import { FeedBackFormType } from "@/utils/types";
import { useToast } from "@/context/customToastContext";
// import { Loading } from "@/components/Loading/Loading";
export const ContactForm = () => {
  const [feedbackForm, setFeedbackForm] = React.useState<FeedBackFormType>({
    feedbackUserEmail: "",
    feedbackUserMessage: "",
    feedbackUserSubject: "",
  });
  const { toast } = useToast();
  const handleFeedBackFormChange = (event: any) => {
    setFeedbackForm({
      ...feedbackForm,
      [event.target.name]: event.target.value,
    });
  };
  const [newFeedBack, { data, loading, error }] = useMutation(NEW_FEEDBACK);
  const handleFeedBackFormSubmit = async () => {
    if (feedbackForm.feedbackUserEmail.trim() === "") {
      toast("Please Provide an email address", "error", 2000);
      return;
    }
    if (!feedbackForm.feedbackUserEmail.trim().includes("@")) {
      toast("Please Provide an email address", "error", 2000);
      return;
    }
    if (feedbackForm.feedbackUserMessage.trim() === "") {
      toast("Please Provide valie message", "error", 2000);
      return;
    }
    // console.log(feedbackForm);
    await newFeedBack({
      variables: {
        feedback: {
          feedbackUserEmail: feedbackForm.feedbackUserEmail,
          feedbackUserSubject: feedbackForm.feedbackUserSubject
            ? feedbackForm.feedbackUserSubject
            : null,
          feedbackUserMessage: feedbackForm.feedbackUserMessage,
        },
      },
    });
    if (data.newFeedBack.success) {
      setFeedbackForm({
        ...feedbackForm,
        feedbackUserEmail: "",
        feedbackUserMessage: "",
        feedbackUserSubject: "",
      });
      toast(
        data.newFeedBack.message
          ? data.newFeedBack.message
          : "FeedBack Received!",
        "success",
        3000
      );
    }
    if (!data.newFeedBack.success) {
      toast(
        "  Server is not responding! Sorry for the inconvenience.",
        "error",
        3000
      );
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="card bg-base-100 w-84 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Contact Us</h2>
            <p>
              If you’ve encountered an issue or have feedback to share, please
              let me know! Your input is valuable and will help improve the
              project. I'm here to assist with any technical issues or feature
              suggestions you may have.
            </p>

            <label className="input input-bordered flex items-center gap-2 mt-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Your Email"
                name="feedbackUserEmail"
                onChange={handleFeedBackFormChange}
                value={feedbackForm.feedbackUserEmail}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Your Subject"
                name="feedbackUserSubject"
                onChange={handleFeedBackFormChange}
                value={feedbackForm.feedbackUserSubject}
              />
            </label>

            <textarea
              className="textarea textarea-bordered mt-1.5"
              placeholder="Your Message"
              name="feedbackUserMessage"
              onChange={handleFeedBackFormChange}
              value={feedbackForm.feedbackUserMessage}
            ></textarea>

            <div className="card-actions justify-end">
              <button
                className="btn btn-primary mt-1.5"
                onClick={handleFeedBackFormSubmit}
                disabled={loading}
              >
                {loading ? "Loading..." : "Meowww"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
