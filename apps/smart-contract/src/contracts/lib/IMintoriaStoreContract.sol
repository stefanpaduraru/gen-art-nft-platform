// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.11;

interface IMintoriaStoreContract {
  function operators(address sender) external view returns (bool);

  function getProjectDetails(uint256 _projectId)
    external
    view
    returns (
      string memory,
      string memory,
      address,
      string memory,
      string memory,
      string memory,
      bool,
      bool,
      bool
    );

  function getProjectTokenDetails(uint256 _projectId)
    external
    view
    returns (
      uint256,
      uint256,
      uint256,
      uint256,
      uint256
    );

  function getProjectExtraPaymentDetails(uint256 _projectId)
    external
    view
    returns (
      address,
      uint256,
      uint256
    );

  function owner() external view returns (address payable);

  function mintoriaAddress() external view returns (address payable);

  function adminFeeSplitPercentage() external view returns (uint256);

  function mintoriaFeeSplitPercentage() external view returns (uint256);

  function mint(
    address _to,
    uint256 _projectId,
    address _by
  ) external returns (uint256 tokenId);
}
