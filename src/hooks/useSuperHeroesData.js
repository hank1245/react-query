import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const fetchHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const addSuperHero = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("heroes", fetchHeroes, {
    onSuccess,
    onError,
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("heroes");
      const previousHeroData = queryClient.getQueryData("heroes");
      queryClient.setQueryData("heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return {
        previousHeroData,
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("heroes", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("heroes");
    },
  });
};

export default useSuperHeroesData;
