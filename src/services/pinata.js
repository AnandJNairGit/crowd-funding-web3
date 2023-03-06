import axios from "axios";
const PINATA_API_KEY = process.env.REACT_APP_PINATA_API_KEY;
const PINATA_API_SECRET = process.env.REACT_APP_PINATA_API_SECRET;

export const uploadImageToIPFS = async (image) => {
  console.log(process.env);
  if (image) {
    try {
      const formData = new FormData();
      formData.append("file", image);

      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `${PINATA_API_KEY}`,
          pinata_secret_api_key: `${PINATA_API_SECRET}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("the pinata response is ------------>", resFile);

      const ImgHash = resFile.data.IpfsHash;
      return ImgHash;
    } catch (error) {
      console.log("Error sending File to IPFS: ");
      console.log(error);
    }
  }
};

export const uploadJSONToIPFS = async (jsonData) => {
  if (jsonData) {
    try {
      const res = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: JSON.stringify(jsonData),
        headers: {
          pinata_api_key: `${PINATA_API_KEY}`,
          pinata_secret_api_key: `${PINATA_API_SECRET}`,
          "Content-Type": "application/json",
        },
      });
      console.log("the json response is----------->>>", res);
      const metaDataHash = res.data.IpfsHash;
      return metaDataHash;
    } catch (error) {
      console.log("Error sending json to IPFS: ");
      console.log(error);
    }
  }
};

export const getMetaData = async (ipfsURI) => {
  let metaData = await axios.get("https://ipfs.moralis.io/ipfs/" + ipfsURI, {
    headers: {
      Accept: "text/plain",
    },
  });

  return metaData;
};
