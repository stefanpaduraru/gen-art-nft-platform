import Web3 from "web3";
import config from "../config/config";
import { ethers } from "ethers";
import Web3Token from "web3-token";
import { Network, Networks } from "../types/network";

export const getWeb3Provider = (network: Network = Networks.Mainnet) => {
  const provider =
    network === Networks.Mainnet
      ? config.WEB3_PROVIDER_MAINNET
      : config.WEB3_PROVIDER_TESTNET;

  const web3 = new Web3(Web3.givenProvider || provider);
  return web3;
};

export const disconnect = async () => {
  const web3 = getWeb3Provider();
  web3.eth.clearSubscriptions((e, r) => console.log(e, r));
};

export const getLatestBlock = () => {
  const web3 = getWeb3Provider();
  return web3.eth.getBlockNumber();
};

export const isConnected = async (network: Network) => {
  const web3 = getWeb3Provider(network);
  const accounts = await web3.eth.getAccounts();

  return !!accounts.length;
};

export const getCurrentAccount = async () => {
  const web3 = getWeb3Provider();
  const accounts = await web3.eth.getAccounts();

  return accounts[0] || false;
};

export const isNetworkValid = async (network: Network = Networks.Mainnet) => {
  const currentNetwork = await getNetwork(network);
  if (network === Networks.Mainnet) {
    return currentNetwork === config.WEB3_NETWORK_MAINNET;
  }
  if (network === Networks.Testnet) {
    return currentNetwork === config.WEB3_NETWORK_TESTNET;
  }
  return false;
};

export const getNetwork = async (network: Network = Networks.Mainnet) => {
  const web3 = getWeb3Provider(network);
  return web3.eth.net.getNetworkType();
};

export const canMint = async (network: Network) => {
  const canMint =
    (await isConnected(network)) && (await isNetworkValid(network));
  return canMint;
};

export const switchNetwork = async (networkId: number = 4) => {
  const chainId = `0x${networkId.toString(16)}`;

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainId }],
    });
    return true;
  } catch (switchError: any) {
    console.log(switchError);
    return false;
  }
};

export const checkNetworkAndSwitch = async (network: Network) => {
  const chainId = getChainIdByNetwork(network);
  const validNetwork = await isNetworkValid(network);
  if (!validNetwork) {
    const switchedNetwork = await switchNetwork(chainId);
    return switchedNetwork;
  }
  return true;
};

export const getChainIdByNetwork = (network: Network) =>
  network === Networks.Mainnet
    ? parseInt(config.WEB3_CHAIN_ID_MAINNET || "", 10)
    : parseInt(config.WEB3_CHAIN_ID_TESTNET || "", 10);

export const getAddress = async (): Promise<string> => {
  if (!window.ethereum) {
    throw new Error("Ethereum API not available");
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  return address;
};

export const getJWToken = async (): Promise<string> => {
  if (!window.ethereum) {
    throw new Error("Ethereum API not available");
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const token = await Web3Token.sign(
    async (msg: string) => await signer.signMessage(msg),
    "1d"
  );
  return token;
};
