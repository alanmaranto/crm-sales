import { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Grid, Spinner } from "./atomic-ui/atoms";
import { SalesColumn } from "./components/crm/SalesColumn";
import { Layout } from "./components/layouts";
import { useSalesUsers } from "./components/users/hooks/useSalesUsers";
import { salesUserStatuses, scores } from "./constants";
import { calculateScore, isDataMatches } from "./helpers/score";
import {
  updateSalesUserStatus,
  getArchiveUserByNationalId,
  getRegistryUserByNationalId,
} from "./providers";

export function CRMPipeline() {
  const [loading, setLoading] = useState();

  const { salesUsers, refetch, isLoading } = useSalesUsers();
  const { mutate: updateStatus } = useMutation(updateSalesUserStatus, {
    onSuccess: () => {
      refetch();
    },
  });

  const runModel = useCallback(
    async (value, user) => {
      setLoading(true);

      const registryUser = await getRegistryUserByNationalId(user.id);
      const archivesUser = await getArchiveUserByNationalId(user.id);
      let score = await calculateScore(user, registryUser, archivesUser);
      console.log("score", score);

      if (score > 100) score = 100;
      // To simulate the api request
      setTimeout(() => {
        if (score > 60 && score <= 100) {
          toast.success(
            `User: ${user.firstName} ${user.lastName} is now a prospect`
          );
          updateStatus({ id: user.id, data: user, status: "prospect" });
        } else {
          toast.error(
            `User: ${user.firstName} ${user.lastName} does not accomplish the requirements`
          );
        }
        setLoading(false);
      }, 3000);
    },
    [updateStatus, salesUsers]
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Layout>
      {loading && <Spinner />}
      <Grid>
        <SalesColumn
          users={salesUsers}
          title="Leads"
          status={salesUserStatuses.LEAD}
          onClick={runModel}
        />
        <SalesColumn
          users={salesUsers}
          title="Prospects"
          status={salesUserStatuses.PROSPECT}
          onClick={runModel}
        />
      </Grid>
    </Layout>
  );
}

export default CRMPipeline;
