# Crowd Funding Daap Local Installation Steps:

### 1. Clone the repository:
### `git clone https://github.com/AnandJNairGit/crowd-funding-web3.git`

### 2. Navigate to the project directory:
### `cd crowd-funding-web3`

### 3. Install the required dependencies using npm:
### `npm i`
### 4. Set up the environment variables for the application:

>Get your Pinata API Key and Secret from your Pinata account.
In the project root directory, create a new file called `.env`.
>Open the `.env` file in a text editor and add the following lines:
```
REACT_APP_PINATA_API_KEY=<YOUR PINATA API KEY>
REACT_APP_PINATA_API_SECRET=<YOUR PINATA API SECRET>
REACT_APP_CONTRACT_ADDRESS=<ADDRESS OF DEPLOYED CONTRACT>
```
### Start the application:
### `npm start`
The application should now be running on http://localhost:3000.
