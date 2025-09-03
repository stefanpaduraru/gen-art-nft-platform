// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./lib/IMintoriaStoreContract.sol";

contract MintoriaMain {
  using SafeMath for uint256;
  IMintoriaStoreContract public mintoriaStoreContract;

  constructor(address _mintoriaStoreContract) {
    mintoriaStoreContract = IMintoriaStoreContract(_mintoriaStoreContract);
  }

  function purchase(uint256 _projectId)
    public
    payable
    returns (uint256 _tokenId)
  {
    return purchaseTo(msg.sender, _projectId);
  }

  function purchaseTo(address _to, uint256 _projectId)
    private
    returns (uint256 _tokenId)
  {
    uint256 feePercentage;
    uint256 pricePerTokenInWei;
    uint256 iterations;
    uint256 maxIterations;
    (
      feePercentage,
      pricePerTokenInWei,
      iterations,
      maxIterations,

    ) = mintoriaStoreContract.getProjectTokenDetails(_projectId);
    require(
      iterations.add(1) <= maxIterations,
      "Maximum number of iterations reached"
    );
    require(
      msg.value >= pricePerTokenInWei,
      "Must send minimum value to mint!"
    );

    _splitFunds(_projectId);
    uint256 tokenId = mintoriaStoreContract.mint(_to, _projectId, msg.sender);

    return tokenId;
  }

  function _splitFunds(uint256 _projectId) internal {
    uint256 feePercentage;
    uint256 pricePerTokenInWei;
    address artistAddress;
    address collaboratorAddress;
    uint256 collaboratorPercentage;

    if (msg.value > 0) {
      (feePercentage, pricePerTokenInWei, , , ) = mintoriaStoreContract
        .getProjectTokenDetails(_projectId);

      (, , artistAddress, , , , , , ) = mintoriaStoreContract.getProjectDetails(
        _projectId
      );

      (collaboratorAddress, collaboratorPercentage, ) = mintoriaStoreContract
        .getProjectExtraPaymentDetails(_projectId);

      uint256 refund = msg.value.sub(pricePerTokenInWei);
      if (refund > 0) {
        payable(msg.sender).transfer(refund);
      }

      uint256 totalFees = pricePerTokenInWei.div(100).mul(feePercentage);
      uint256 mintoriaAmount = totalFees
        .mul(mintoriaStoreContract.mintoriaFeeSplitPercentage())
        .div(100);
      if (mintoriaAmount > 0) {
        mintoriaStoreContract.mintoriaAddress().transfer(mintoriaAmount);
      }

      uint256 contractOwnerAmount = totalFees.div(100).mul(
        mintoriaStoreContract.adminFeeSplitPercentage()
      );
      if (contractOwnerAmount > 0) {
        mintoriaStoreContract.owner().transfer(contractOwnerAmount);
      }

      uint256 projectFunds = pricePerTokenInWei.sub(totalFees);
      uint256 collaboratorAmount;
      if (collaboratorPercentage > 0) {
        collaboratorAmount = projectFunds.div(100).mul(collaboratorPercentage);
        if (collaboratorAmount > 0) {
          payable(collaboratorAddress).transfer(collaboratorAmount);
        }
      }
      uint256 creatorFunds = projectFunds.sub(collaboratorAmount);
      if (creatorFunds > 0) {
        payable(artistAddress).transfer(creatorFunds);
      }
    }
  }
}
