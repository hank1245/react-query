import useSuperHeroesData from "../hooks/useSuperHeroesData";
import { useState } from "react";
import { Link } from "react-router-dom";

export const RQHeroes = () => {
  const [time, setTime] = useState(3000);
  const onSuccess = (data) => {
    if (data.length > 3) {
      setTime(0);
    }
  };

  const onError = (error) => {
    console.log("error data fetcing", error);
  };
  const { data, isLoading, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError, time);
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Heroes Page</h2>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
    </>
  );
};

export default RQHeroes;
