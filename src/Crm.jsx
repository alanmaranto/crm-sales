import { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { Grid } from "./atomic-ui/atoms";
import Spinner from "./atomic-ui/atoms/Spinner/Spinner";
import { SalesColumn } from "./components/crm/SalesColumn";
import { Layout } from "./components/layouts";
import {
  getRegistryUserByNationalId,
  getArchiveUserByNationalId,
} from "./components/users/hooks/useNationalRegistryUsers";
import {
  updateSalesUserStatus,
  useSalesUsers,
} from "./components/users/hooks/useSalesUsers";
import { salesUserStatuses } from "./constants/sales-users";
import { scores } from "./constants/scores";
import { isDataMatches } from "./helpers/score";

const getSalesScore = () => Math.round(Math.random() * 100);

function CRMPipeline() {
  const [loading, setLoading] = useState();
  const { salesUsers, refetch } = useSalesUsers();
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
      console.log("salesScore", score);

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
      console.log("registry", score);
      setTimeout(() => {}, 3000);

      if (!nationaArchivesUser.error) {
        score += scores.NA_YES_RECORDS;
      } else {
        score += scores.NA_NO_RECORDS;
      }

      console.log("archive", score);

      const salesScore = getSalesScore();
      console.log("sales", salesScore);
      console.log("score", score);

      score += salesScore;

      if (score > 100) score = 100;

      setTimeout(() => {
        if (score > 60 && score <= 100) {
          console.log("APROBADO", score);
          updateStatus({ id: user.id, data: user, status: "prospect" });
        } else {
          console.log("NO-APROBADO", score);
        }
        setLoading(false);
      }, 3000);
      // return score;
    },
    [updateStatus, salesUsers]
    // return {score}
  );

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
