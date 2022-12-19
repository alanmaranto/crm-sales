import { Grid, GridItem, Card, Paper } from "./atomic-ui/atoms";
import { ListPaper } from "./atomic-ui/molecules";
import { Layout } from "./components/layouts";
import "./crm.scss";

const salesLeads = [
  {
    // random identifier
    nationalId: 39000,
    birthdate: "24/06/1987",
    firstName: "Lionel",
    lastName: "Messi",
    email: "lionelmessi@gmail.com",
  },
  {
    nationalId: 39001,
    birthdate: "05/02/1985",
    firstName: "Cristiano",
    lastName: "Ronaldo",
    email: "cristianoronaldo@gmail.com",
  },
  {
    nationalId: 39002,
    birthdate: "20/12/1998",
    firstName: "Kylian",
    lastName: "Mbappe",
    email: "kylianmbappe@gmail.com",
  },
];

function CRMPipeline() {
  return (
    <Layout>
      <Grid>
        <GridItem>
          <Paper>
            <Card header="Sales leads" />
            <ListPaper>
              {salesLeads.map(
                ({ nationalId, birthdate, firstName, lastName, email }) => (
                  <Card type="secondary" key={nationalId}>
                    <div className="crm-card-container">
                      <span className="crm-card-container--name">
                        {firstName} {lastName}
                      </span>
                      <span className="crm-card-container--email">{email}</span>
                      <div className="crm-card-container--key">
                        Birthdate:
                        <span className="crm-card-container--key__value">
                          {birthdate}
                        </span>
                      </div>
                      <div className="crm-card-container--key">
                        National Id:
                        <span className="crm-card-container--key__value">
                          {nationalId}
                        </span>
                      </div>
                      {/* useDate-fns to visualize */}
                      {/* <span>National Id: {nationalId}</span> */}
                    </div>
                  </Card>
                )
              )}
            </ListPaper>
          </Paper>
        </GridItem>
      </Grid>
    </Layout>
  );
}

export default CRMPipeline;

// install notistack
