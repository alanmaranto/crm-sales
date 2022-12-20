import { useCallback } from "react";
import { Grid } from "./atomic-ui/atoms";
import { SalesColumn } from "./components/crm/SalesColumn";
import { Layout } from "./components/layouts";
import {
  getRegistryUserByNationalId,
  getArchiveUserByNationalId,
} from "./components/users/hooks/useNationalRegistryUsers";
import { useSalesUsers } from "./components/users/hooks/useSalesUsers";
import { salesUserStatuses } from "./constants/sales-users";
import { scores } from "./constants/scores";
import { isDataMatches } from "./helpers/score";

const getSalesScore = () => Math.round(Math.random() * 100);

function CRMPipeline() {
  const { salesUsers } = useSalesUsers();

  const runModel = useCallback(async (value, user) => {
    const { birthdate, email, firstName, lastName } = user;
    const userToCompare = {
      birthdate,
      email,
      firstName,
      lastName,
    };

    let score = 0;
    console.log("salesScore", score);
    const nationaRegistryUser = await getRegistryUserByNationalId(
      user.nationalId
    );
    // const nationaArchivesUser = await getArchiveUserByNationalId(user);
    console.log(nationaRegistryUser);

    const userRegistryMatches = await isDataMatches(
      userToCompare,
      nationaRegistryUser
    );
    console.log("userRegistryMatches", userRegistryMatches);

    //
    if (userRegistryMatches) {
      score += scores.NR_VALIDATED;
    } else {
      score += scores.NR_WRONG_DATA;
    }

    console.log(score);

    score += getSalesScore();

    console.log("final score: " + score);

    if (score > 100) score = 100;
    console.log('mayor', score)

    if (score > 60 && score <= 100) {
      console.log('first', score)
      // put request using user.nationalID to change status from lead to prospect
      // fetch with the new status
    }

    return score;
  }, []);

  return (
    <Layout>
      <div></div>
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
