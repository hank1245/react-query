import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

const fetchHeroes = () => {
  return request({ url: "/superheroes" });
};

const addSuperHero = (hero) => {
  return request({ url: "/superheroes", method: "post", data: hero });
};

const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("heroes", fetchHeroes, {
    onSuccess,
    onError,
    refetchOnWindowFocus: true,
    staleTime: 2,
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
