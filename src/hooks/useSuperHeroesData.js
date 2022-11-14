import { useQuery } from "react-query";
import axios from "axios";

const fetchHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("heroes", fetchHeroes, {
    onSuccess,
    onError,
  });
};

export default useSuperHeroesData;
