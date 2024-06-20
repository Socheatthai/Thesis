const express = require("express");
const app = express();
const port = 5001;
const Moralis = require("moralis").default;
const cors = require("cors");
const axios = require("axios"); // Corrected typo here
require("dotenv").config({ path: ".env" });

app.use(cors());
app.use(express.json());

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

// Create a pre-configured axios instance
// const axiosInstance = axios.create({
//   baseURL: ETHERSCAN_BASE_URL,
//   params: {
//     apikey: ETHERSCAN_API_KEY
//   }
// });

// Function to fetch data from Etherscan API
async function fetchEtherscanData(params) {
  try {
    const response = await axiosInstance.get('', { params });
    return response.data;
  } catch (error) {
    console.error('API call error:', error.message);
    throw new Error('Failed to fetch data from Etherscan API.');
  }
}


app.get("/getethprice", async (req, res) => {
  try {
    const response = await Moralis.EvmApi.token.getTokenPrice({
      address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      chain: "0x1",
    });

    return res.status(200).json(response);
  } catch (e) {
    console.log(`Something went wrong ${e}`);
    return res.status(400).json();
  }
});

app.post("/analysis/:addressId", async (req, res) => {
  try {
    const { addressId } = req.params;
    const { offset } = req.body

    const response = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${addressId}&startblock=0&endblock=99999999&page=1&offset=${offset}&sort=asc&apikey=U6PTUIYIF6NRAMBC9A97MUSDWX3DCA87M6`);
    return res.status(200).json(response.data); // Return the response data instead of the whole response object
  } catch (e) {
    console.log(`Something went wrong ${e}`);
    return res.status(400).json();
  }
});

app.get('/visualization/:addressId', async (req, res) => {
  try {
    const { addressId } = req.params;
    const { offset } = req.query;

    const response = await axios.get(`https://api.etherscan.io/api`, {
      params: {
        module: "account",
        action: "txlist",
        address: addressId,
        startblock: 0,
        endblock: 99999999,
        page: 1,
        offset: offset,
        sort: "asc",
        apikey: ETHERSCAN_API_KEY,
      },
    });

    // console.log("API response data:", response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data from Etherscan:", error);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
});


app.post("/address/:addressId", async (req, res) => {
  try {
    const { addressId } = req.params;
    const { offset } = req.body

    const response = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${addressId}&startblock=0&endblock=99999999&page=1&offset=${offset}&sort=asc&apikey=U6PTUIYIF6NRAMBC9A97MUSDWX3DCA87M6`);
    return res.status(200).json(response.data); // Return the response data instead of the whole response object
  } catch (e) {
    console.log(`Something went wrong ${e}`);
    return res.status(400).json();
  }
});

app.post("/date", async (req, res) => {
  try {
    const { startdate } = req.body;
    const { enddate } = req.body;

    const response = await axios.get(`https://api.etherscan.io/api?module=stats&action=dailyavggaslimit&startdate=${startdate}&enddate=${enddate}&sort=asc&apikey=U6PTUIYIF6NRAMBC9A97MUSDWX3DCA87M6`);
    return res.status(200).json(response.data);

  } catch (error) {
    console.log('Something went wrong ${error}');
    return res.status(400).json();

  }
})

app.get("/hash/:txhash", async (req, res) => {
  try {
    const { txhash } = req.params;

    const response = await axios.get(`https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${txhash}&apikey=U6PTUIYIF6NRAMBC9A97MUSDWX3DCA87M6`);
    return res.status(200).json(response.data);


  } catch (error) {
    console.log('Something went wrong ${error}');
    return res.status(400).json();

  }
})

// Endpoint to analyze transactions for a given transaction hash
app.get("/txhanalysis/:txhash", async (req, res) => {
  try {
    const { txhash } = req.params;
    const response = await axios.get(`https://api.etherscan.io/api`, {
      params: {
        module: "account",
        action: "txlistinternal",
        txhash: txhash,
        apikey: ETHERSCAN_API_KEY,
      },
    });

    console.log("Etherscan API Response:", response.data); // Log the API response

    if (response.data.status !== "1") {
      return res.status(400).json({ error: "Failed to fetch data" });
    }

    const transactions = response.data.result;
    const dailyTransactionCount = {};
    const dailyTransactionValue = {};
    const dailyTransactionErrors = {};

    transactions.forEach(tx => {
      const date = new Date(parseInt(tx.timeStamp, 10) * 1000).toISOString().split('T')[0];
      if (!dailyTransactionCount[date]) {
        dailyTransactionCount[date] = 0;
        dailyTransactionValue[date] = 0;
        dailyTransactionErrors[date] = 0;
      }
      dailyTransactionCount[date] += 1;
      dailyTransactionValue[date] += parseFloat(tx.value) / (10 ** 18);
      if (tx.isError === "1") {
        dailyTransactionErrors[date] += 1;
      }
    });

    console.log("Daily Transaction Count:", dailyTransactionCount);
    console.log("Daily Transaction Value:", dailyTransactionValue);
    console.log("Daily Transaction Errors:", dailyTransactionErrors);

    res.json({
      dailyTransactionCount,
      dailyTransactionValue,
      dailyTransactionErrors,
    });
  } catch (error) {
    console.error("Error fetching data from Etherscan:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.get("/blockanalysis/:blockNo", async (req, res) => {
  try {
    const { blockNo } = req.params;
    const response = await axios.get(`https://api.etherscan.io/api`, {
      params: {
        module: 'account',
        action: 'txlistinternal',
        startblock: blockNo,
        endblock: blockNo,
        page: 1,
        offset: 10,
        sort: 'asc',
        apikey: ETHERSCAN_API_KEY,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(`Error fetching data from Etherscan: ${error}`);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.get("/block/:blockNo", async (req, res) => {
  try {
    const { blockNo } = req.params;



    const response = await axios.get(`https://api.etherscan.io/api?module=account&action=txlistinternal&startblock=${blockNo}&endblock=${blockNo}&page=1&offset=1&sort=asc&apikey=U6PTUIYIF6NRAMBC9A97MUSDWX3DCA87M6`);
    return res.status(200).json(response.data)

  } catch (error) {
    console.log('Something went wrong ${error}');
    return res.status(400).json();

  }


})

app.get("/check/:checkId", async (req, res) => {
  try {
    const { checkId } = req.params;

    const response = await axios.get(`https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${checkId}&apikey=U6PTUIYIF6NRAMBC9A97MUSDWX3DCA87M6`);
    return res.status(200).json(response.data); // Return the response data instead of the whole response object
  } catch (e) {
    console.log(`Something went wrong ${e}`);
    return res.status(400).json();
  }
});

app.get("/watch/:watchHash", async (req, res) => {
  try {
    const { watchHash } = req.params;

    const response = await axios.get(`https://api.etherscan.io/api?module=transaction&action=getstatus&txhash=${watchHash}&apikey=U6PTUIYIF6NRAMBC9A97MUSDWX3DCA87M6`);
    return res.status(200).json(response.data); // Return the response data instead of the whole response object
  } catch (e) {
    console.log(`Something went wrong ${e}`);
    return res.status(400).json();
  }
});

app.get("/see/:seeNo", async (req, res) => {
  try {
    const { seeNo } = req.params;

    const response = await axios.get(`https://api.etherscan.io/api?module=block&action=getblockreward&blockno=${seeNo}&apikey=U6PTUIYIF6NRAMBC9A97MUSDWX3DCA87M6`);
    return res.status(200).json(response.data);

  } catch (error) {
    console.log('Something went wrong ${error}');
    return res.status(400).json();

  }
})



Moralis.start({
  apiKey: MORALIS_API_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls`);
  });
});
