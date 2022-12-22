# CRM Sales Automation

The following exercise consists of automating a CRM pipeline for the sales team considering various points that the team needs to move a lead to a prospect.

I chose to show the information in two columns: Lead and Prospect, each column contains cards with the user's information.

It is assumed that the leads were already obtained and arrived from a certain acquisition channel (marketing campaign, google or facebook ads, instagram posts/stories, etc.), they were saved in the database with their personal information **(firstName, lastName, email, status (lead or prospect), birthDate, id)**

**Internal scoring system**

- Sales user matches in the National Registry database **adds 20** pts
- Sales user does not match in the National Registry database or does not exist **subtract 100 points**
- Sales user exists in the Judicial Archives database **subtract 100 points**
- Sales user does not exist in the Judicial Archives database **adds 20 points**


**Considerations**

* I created three databases, one to validate the national identifier, another to validate if the user has a judicial record and finally the sales database.

* The scoring system to move a lead to be a prospect is if the score is greater than **60**

* To move a lead to a prospect, it must first be checked in parallel that the national identifier number exists in the national registration database and the information matches the information in the sales database, in addition that the user does not have judicial records and the **random** score generated by the sales database system is also taken into account.

**Technical overview**
1. The requests to the databases are simulated handling sucess, loading and errors
2. Feedback of the result of running the model is added through notifiers

**Algorithm**

1. We get the user information from the sales database and display it in the pipeline.
For this I decided to use the `react query` data handler, this information will contain the status of the user **(lead or prospect)** and will allow it to be classified in its corresponding column (so far I go)

2. Each lead contains a `run model` button that will trigger the automatic model check by id

3. The verification happens by calculating and adding the result of different scoring systems already mentioned in the section `internal scoring system`

3. The positive result of the verification will automatically move the positive leads to prospects


**Future improvements**
1. Add transition effect of a card from the lead column to prospects when the model result is positive
2. Add a button that takes all the users that are in the "lead" column and does the check automatically

**Technical improvements**
1. Look for an alternative to vite due to the problems it has to integrate with the jest library and do better unit tests with jest and component tests with react-testing-library

**How to test**

Lionel Messi, Cristiano Ronaldo, Kylian Mbappé and Javier Hernández are users who should fail the verification.

James Rodríguez and Memo Ochoa passed the verifications and only trusted the Random Sales Score Generator, whose probability of approval is 79% (based on scoring rules).

For example
James Rdz passed the national registry and national archived, James has 40 points (20 each) and we would only need 21 points from the random sales system to approve him as a prospect.

