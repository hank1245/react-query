import axios from "axios";
import React from "react";
import { useQueries } from "react-query";

const fetchSuperHero = (id) => {
  return axios.get(`http://localhost:4000/superheroes/${id}`);
};

function DynamicParallelQueries({ heroIds }) {
  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );
  return <div>DynamicParallelQueries</div>;
}

export default DynamicParallelQueries;
