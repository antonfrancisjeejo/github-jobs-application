import React, { useState } from "react";
import useFetchJobs from "./useFetchJobs";
import { Container } from "react-bootstrap";
import Job from "./Job";
import JobsPagination from "./JobsPagination";
import SearchForm from "./SearchForm";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs();

  const handleParamChange = (event) => {
    const param = event.target.name;
    const value = event.target.value;
    setPage(1);
    setParams((prevPrams) => {
      return {
        ...prevPrams,
        [param]: value,
      };
    });
  };
  return (
    <Container className="my-4">
      <h1 className="mb-4">GitHub Jobs</h1>
      <p className="text-primary">Powered by AR Projects Ltd</p>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobsPagination page={page} setpage={setPage} hasNextPage={hasNextPage} />
      {loading && <h1>Loading ...</h1>}
      {error && <h1>Error Try Refereshing ...</h1>}
      {jobs.map((job) => {
        return <Job key={job.id} job={job} />;
      })}
      <JobsPagination page={page} setpage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

export default App;
