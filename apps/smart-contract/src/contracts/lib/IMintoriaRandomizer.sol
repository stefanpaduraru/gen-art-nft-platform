// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

interface IMintoriaRandomizer {
  function getValue() external view returns (bytes32);
}
