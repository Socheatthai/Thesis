import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function SearchResults() {
  const { addressId } = useParams();
  const [allResults, setAllResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [relativeDate, setRelativeDate] = useState("");
  const [year, setYear] = useState("");
  const [view, setView] = useState(30);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchTransactions = async (offset) => {
      setIsLoading(true);
      try {
        const response = await axios.post(`http://localhost:5001/address/${addressId}`, { offset });
        if (offset === 0) {
          setAllResults(response.data.result);
          setFilteredResults(response.data.result.slice(0, view));
        } else {
          setAllResults((prevResults) => [...prevResults, ...response.data.result]);
          setFilteredResults((prevResults) => [...prevResults, ...response.data.result]);
        }
      } catch (error) {
        console.log("Error fetching transactions:", error);
      }
      setIsLoading(false);
    };

    fetchTransactions(offset);
  }, [addressId, offset, view]);

  const handleViewNext = () => {
    setOffset((prevOffset) => prevOffset + 30);
  };

  const handleAnalyticsClick = () => {
    navigate(`/analysis/${addressId}`);
  };

  const handleVisualizationClick = () => {
    navigate(`/visualization/${addressId}`);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    let startDate = null;
    let endDate = null;

    if (relativeDate) {
      switch (relativeDate) {
        case "1day":
          startDate = moment().subtract(1, 'days').startOf('day').unix();
          endDate = moment().endOf('day').unix();
          break;
        case "2days":
          startDate = moment().subtract(2, 'days').startOf('day').unix();
          endDate = moment().endOf('day').unix();
          break;
        case "1week":
          startDate = moment().subtract(1, 'weeks').startOf('day').unix();
          endDate = moment().endOf('day').unix();
          break;
        case "1month":
          startDate = moment().subtract(1, 'months').startOf('day').unix();
          endDate = moment().endOf('day').unix();
          break;
        case "2months":
          startDate = moment().subtract(2, 'months').startOf('day').unix();
          endDate = moment().endOf('day').unix();
          break;
        case "3months":
          startDate = moment().subtract(3, 'months').startOf('day').unix();
          endDate = moment().endOf('day').unix();
          break;
        case "1year":
          startDate = moment().subtract(1, 'years').startOf('day').unix();
          endDate = moment().endOf('day').unix();
          break;
        default:
          startDate = null;
          endDate = null;
      }
    } else if (year) {
      startDate = moment().year(year).startOf('year').unix();
      endDate = moment().year(year).endOf('year').unix();
    }

    console.log("Start date (Unix):", startDate);
    console.log("End date (Unix):", endDate);

    const filtered = allResults.filter((txn) => {
      const txnTime = parseInt(txn.timeStamp, 10); // Parse timeStamp as integer
      console.log("Transaction time (Unix):", txnTime);
      console.log("Transaction time (Readable):", moment.unix(txnTime).format('YYYY-MM-DD'));
      return startDate === null || (txnTime >= startDate && txnTime <= endDate);
    });

    setFilteredResults(filtered.slice(0, view));
    setIsLoading(false);
  };

  return (
    <div className="w-full h-full container-fluid flex-1 justify-center p-6 container-fluid bg-[#111F2C]">
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <>
          <div className="w-full container-fluid mt-4 p-6 bg-gray-100 rounded-xl shadow-md flex justify-between items-center">
            <p className="text-sm text-black">
              Latest {filteredResults.length} transactions
            </p>

            <div className="flex space-x-4 items-center">
              <div className="flex items-center">
                <label className="text-sm text-black ml-4">Year: </label>
                <select
                  className="border-[#243C4C] rounded-md px-2 py-1 text-sm bg-[#243C4C] text-white"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="">Select</option>
                  {Array.from({ length: 10 }, (_, i) => moment().year() - i).map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleSubmit}
                className="text-sm text-white bg-gradient-to-br from-green-600 to-green-500 rounded-md px-4 py-2 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition duration-300 ease-in-out"
              >
                Submit
              </button>
            </div>
          </div>
          {filteredResults.length === 0 ? (
            <p className="text-center text-white mt-5">No data available for the selected date range.</p>
          ) : (
            <div className="w-full container-fluid bg-[#111F2C] p-5">
              <div className="flex items-center justify-between">
                <p className="text-lg text-green-400 mr-5">
                  Address: <span className="text-blue-500 text-sm">{addressId}</span>
                </p>
                <div className="flex space-x-4">
                  <button
                    className="text-sm text-white bg-gradient-to-br from-blue-600 to-blue-500 rounded-md px-4 py-2 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition duration-300 ease-in-out"
                  >
                    <span className="flex items-center">
                      <Link to={`/check/${addressId}`}>Check</Link>
                      <svg
                        className="w-4 h-4 text-gray-800 dark:text-white ml-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 21 21"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z"
                        />
                      </svg>
                    </span>
                  </button>
                  <button
                    className="text-sm text-white bg-gradient-to-br from-green-600 to-green-500 rounded-md px-4 py-2 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    onClick={handleVisualizationClick}
                  >
                    <Link to={`/visualization/${addressId}`}>Visualization</Link>
                  </button>
                  <button
                    className="text-sm text-white bg-gradient-to-br from-green-600 to-green-500 rounded-md px-4 py-2 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    onClick={handleAnalyticsClick}
                  >
                    <Link to={`/analysis/${addressId}`}>Analytics</Link>
                  </button>
                </div>
              </div>

              <table className="h-full w-full space-x-4 spacey-2 container-fluid bg-[#111F2C] mt-5">
                <thead>
                  <tr>
                    <th className="text-sm text-white">Transaction Hash</th>
                    <th className="text-sm text-white">Method</th>
                    <th className="text-sm text-white">Block</th>
                    <th className="text-sm text-blue-500">Time</th>
                    <th className="text-sm whitespace-nowrap text-white">From</th>
                    <th></th>
                    <th className="text-sm whitespace-nowrap text-white">To</th>
                    <th className="text-sm text-white">Value</th>
                    <th className="text-sm text-blue-500">Txn Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.map((txn, index) => (
                    <tr key={index}>
                      <td className="text-sm text-green-500">
                        <Link to={`/txhash/${txn.hash}`}>{txn.hash.slice(0, 18)}...</Link>
                      </td>
                      <td className="text-sm">
                        <span className="text-gray-300 text-xs">{txn.functionName}</span>
                      </td>
                      <td className="text-sm text-green-500">
                        <Link to={`/block/${txn.blockNumber}`}>{txn.blockNumber}</Link>
                      </td>
                      <td className="text-sm whitespace-nowrap text-gray-400">{moment.unix(txn.timeStamp).format('YYYY-MM-DD')}</td>
                      <td className="text-sm whitespace-nowrap ">
                        <span className={`text-xs inline-block px-1 py-0.5 rounded ${txn.from.toLowerCase() !== addressId.toLowerCase() ? "bg-green-700 text-green-200" : "bg-yellow-700 text-yellow-200"}`}>
                          {txn.from.toLowerCase() !== addressId.toLowerCase() ? "IN" : "OUT"}
                        </span>
                        <span className="text-blue-500 text-xs ml-1 whitespace-nowrap">
                          <Link to={`/address/${txn.from}`}>{txn.from}</Link>
                        </span>
                      </td>
                      <td></td>
                      <td className="text-sm whitespace-nowrap">
                        <span className="text-blue-500 text-xs">
                          <Link to={`/address/${txn.to}`}>{txn.to}</Link>
                        </span>
                      </td>
                      <td className="text-sm whitespace-nowrap text-gray-300">{(parseInt(txn.value) / 10 ** 18).toFixed(5)} ETH</td>
                      <td className="text-sm text-gray-300">{(parseInt(txn.gasPrice) / 10 ** 18).toFixed(12)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {filteredResults.length > 0 && filteredResults.length < allResults.length && (
            <div className="bg-opacity-70 shadow-md md-10 p-6 h-full w-full container-fluid bg-[#111F2C]">
              <div className="flex justify-center">
                <button
                  className="text-sm text-white bg-gradient-to-br from-green-600 to-green-500 rounded-md px-4 py-2 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition duration-300 ease-in-out"
                  onClick={handleViewNext}
                >
                  View More
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
