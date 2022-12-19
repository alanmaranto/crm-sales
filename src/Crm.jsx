import { Grid } from "./atomic-ui/atoms";
import { SalesColumn } from "./components/crm/SalesColumn";
import { Layout } from "./components/layouts";
import { useSalesUsers } from "./components/users/hooks/useSalesUsers";
import { salesUserStatuses } from "./constants/sales-users";

function CRMPipeline() {
  const { salesUsers } = useSalesUsers();
  const runModel = () => {};

  return (
    <Layout>
      <div>
        <button onClick={runModel}>Run model</button>
      </div>
      <Grid>
        <SalesColumn
          users={salesUsers}
          title="Leads"
          status={salesUserStatuses.LEAD}
        />
        <SalesColumn
          users={salesUsers}
          title="Prospects"
          status={salesUserStatuses.PROSPECT}
        />
      </Grid>
    </Layout>
  );
}

export default CRMPipeline;
