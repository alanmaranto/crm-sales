import { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Grid, Spinner } from "./atomic-ui/atoms";
import { SalesColumn } from "./components/crm/SalesColumn";
import { Layout } from "./components/layouts";
import { useSalesUsers } from "./components/users/hooks/useSalesUsers";
import { salesUserStatuses, scores } from "./constants";
import { isDataMatches } from "./helpers/score";
import {
  updateSalesUserStatus,
  getArchiveUserByNationalId,
  getRegistryUserByNationalId,
} from "./providers";

const getSalesScore = () => Math.round(Math.random() * 100);

function CRMPipeline() {
  const [loading, setLoading] = useState();

  const { salesUsers, refetch, isLoading } = useSalesUsers();
  const { mutate: updateStatus, isError: updateError } = useMutation(
    updateSalesUserStatus,
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const runModel = useCallback(
    async (value, user) => {
      setLoading(true);
      let score = 0;

      const { birthdate, email, firstName, lastName } = user;
      const userToCompare = {
        birthdate,
        email,
        firstName,
        lastName,
      };

      const nationaRegistryUser = await getRegistryUserByNationalId(user.id);
      const nationaArchivesUser = await getArchiveUserByNationalId(user.id);

      // if not found NR
      if (!nationaRegistryUser) {
        score += scores.NR_NOT_FOUND;
      } else {
        // check if sales data matches with national registry data
        const matches = await isDataMatches(userToCompare, nationaRegistryUser);
        if (matches) {
          score += scores.NR_VALIDATED;
        } else {
          score += scores.NR_WRONG_DATA;
        }
      }

      if (!nationaArchivesUser.error) {
        score += scores.NA_YES_RECORDS;
      } else {
        score += scores.NA_NO_RECORDS;
      }

      const salesScore = getSalesScore();
      score += salesScore;

      if (score > 100) score = 100;

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
