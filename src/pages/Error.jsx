import { useRouteError } from "react-router-dom";
import { motion } from "framer-motion";
import { Eyebrow, PillLink } from "../components";
import Wrapper from "../assets/wrappers/ErrorPage";
import PublicStyles from "../assets/wrappers/PublicStyles";
import imgError from "../assets/images/errorPage.svg";

const Error = () => {
  const error = useRouteError();
  const notFound = error?.status === 404;

  return (
    <>
      <PublicStyles />
      <Wrapper className="public-site">
        <motion.div
          className="error-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {notFound && <img src={imgError} alt="" />}
          <Eyebrow>{notFound ? "Error 404" : "Something went wrong"}</Eyebrow>
          <h1>{notFound ? "This dish isn't on the menu." : "We dropped the plate."}</h1>
          <p>
            {notFound
              ? "The page you're looking for doesn't exist or has moved."
              : "An unexpected error occurred. Please try again in a moment."}
          </p>
          <PillLink to="/" tone="dark">Back home</PillLink>
        </motion.div>
      </Wrapper>
    </>
  );
};

export default Error;
