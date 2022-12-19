import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import CRMPipeline from "./Crm";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CRMPipeline />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App