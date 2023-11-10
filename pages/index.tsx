import { useRouter } from "next/router";
import { useEffect } from "react";

const HomePage: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    router.push("/newTest")
  }, [])
  
  return (
    <>
    </>
  );
};

export default HomePage;