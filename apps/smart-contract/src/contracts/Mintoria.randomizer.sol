// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

contract MintoriaRandomizer {
  function getValue() external view returns (bytes32) {
    return
      keccak256(
        abi.encodePacked(
          block.number,
          blockhash(block.number - 1),
          blockhash(block.number - 2),
          block.timestamp,
          (block.timestamp % 200) + 1
        )
      );
  }
}
