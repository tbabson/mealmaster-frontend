import { Outlet, useLocation, useNavigation } from "react-router-dom";
import { MotionConfig, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { Navbar, Footer, Loading } from "../components";
import Wrapper from "../assets/wrappers/HomeLayout";
import PublicStyles from "../assets/wrappers/PublicStyles";

const HomeLayout = () => {
  const navigation = useNavigation();
  const { pathname } = useLocation();
  const isLoading = navigation.state === "loading";
  const isLanding = pathname === "/";
  const lenisRef = useRef(null);

  // Smooth, inertial scrolling (skipped for people who prefer reduced motion)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -96 } });
    lenisRef.current = lenis;
    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Start every new page at the top
  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <PublicStyles />
      <Wrapper className="public-site">
        <Navbar />
        <main className={`main-content ${isLanding ? "is-flush" : ""}`}>
          {isLoading ? (
            <Loading variant="page" />
          ) : (
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet />
            </motion.div>
          )}
        </main>
        <Footer />
      </Wrapper>
    </MotionConfig>
  );
};

export default HomeLayout;
