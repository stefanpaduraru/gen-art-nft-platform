// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./lib/IERC2981.sol";
import "./lib/IMintoriaRandomizer.sol";

contract MintoriaStore is
  IERC2981,
  ERC165,
  ERC721,
  ERC721Enumerable,
  ERC721Burnable,
  Ownable
{
  using SafeMath for uint256;
  using Counters for Counters.Counter;
  bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;

  event CreateProject(
    uint256 indexed _projectId,
    address indexed _artistAddress,
    string _projectName,
    uint256 _pricePerTokenInWei,
    uint256 _projectFeePercentage,
    bool _useStorage
  );

  event UpdateProject(uint256 indexed _projectId);

  event Mint(
    address indexed _to,
    uint256 indexed _tokenId,
    uint256 indexed _projectId,
    bytes32 _hash
  );

  struct Project {
    string name;
    string artist;
    address artistAddress;
    uint256 iterations;
    uint256 maxIterations;
    uint256 maxTokensPerAddress;
    string description;
    string website;
    string license;
    string baseURI;
    string baseIpfsURI;
    uint256 pricePerTokenInWei;
    uint256 feePercentage;
    address collaboratorAddress;
    uint256 collaboratorPercentage;
    uint256 royaltyFeePercentage;
    mapping(address => uint256) addressToTokenCount;
    mapping(uint256 => string) scriptChunks;
    uint256 scriptChunksCount;
    string scriptMetadata;
    uint256[] tokenIds;
    bool useStorage;
    bool active;
    bool locked;
    bool paused;
  }

  struct Token {
    uint256 projectId;
    bytes32 hash;
  }

  IMintoriaRandomizer public mintoriaRandomizerContract;

  address public mintoriaAddress;

  uint256 public adminFeeSplitPercentage = 80;
  uint256 public mintoriaFeeSplitPercentage = 20;

  mapping(address => bool) public operators;
  mapping(address => bool) public minters;

  mapping(uint256 => Project) projects;
  mapping(uint256 => Token) tokens;

  uint256 public nextProjectId = 1;
  uint256 constant MAX_TOKENS_PER_PROJECT = 100_000;
  uint256 constant MAX_TOKENS_PER_ADDRESS = 10;

  modifier onlyMintoria() {
    require(msg.sender == mintoriaAddress, "Not Mintoria");
    _;
  }

  modifier onlyOperators() {
    require(operators[msg.sender], "Not an operator");
    _;
  }

  modifier onlyMinters() {
    require(minters[msg.sender], "Not a minter");
    _;
  }

  modifier onlyExistingToken(uint256 _tokenId) {
    require(_exists(_tokenId), "Non-existent token");
    _;
  }

  modifier onlyUnlockedProject(uint256 _projectId) {
    require(!projects[_projectId].locked, "Project is locked");
    _;
  }

  modifier onlyOperatorsOrArtist(uint256 _projectId) {
    require(
      operators[msg.sender] || msg.sender == projects[_projectId].artistAddress,
      "Not artist or an operator"
    );
    _;
  }

  modifier onlyValidFeePercentage(uint256 _percentage) {
    require(_percentage <= 100, "Max is 100%");
    _;
  }

  modifier onlyValidIterationCount(uint256 _iterations) {
    require(_iterations <= MAX_TOKENS_PER_PROJECT, "Max is 100,000");
    _;
  }

  modifier onlyHigherIterationCount(uint256 _iterations, uint256 _projectId) {
    require(
      _iterations > projects[_projectId].iterations,
      "Max iterations lower than current iterations"
    );
    _;
  }

  modifier onlyValidProjectFeePercentage(uint256 _feePercentage) {
    require(_feePercentage <= 100, "Max is 100%");
    _;
  }

  modifier onlyNoTokensMinted(uint256 _projectId) {
    require(
      projects[_projectId].iterations == 0,
      "Cannot update after tokens have been minted."
    );
    _;
  }

  modifier onlyActiveProjectOrArtist(uint256 _projectId, address _by) {
    require(
      projects[_projectId].active || _by == projects[_projectId].artistAddress,
      "Project is inactive"
    );
    _;
  }

  modifier onlyUnpausedProjectOrArtist(uint256 _projectId, address _by) {
    require(
      !projects[_projectId].paused || _by == projects[_projectId].artistAddress,
      "Project is paused"
    );
    _;
  }

  modifier onlyMaxTokensPerAddress(uint256 _projectId, address _to) {
    require(
      projects[_projectId].addressToTokenCount[_to].add(1) <=
        projects[_projectId].maxTokensPerAddress,
      "Cannot mint more than max tokens per address"
    );
    _;
  }

  modifier onlyMaxIterations(uint256 _projectId) {
    require(
      projects[_projectId].iterations.add(1) <=
        projects[_projectId].maxIterations,
      "Cannot mint more than project max iterations"
    );
    _;
  }

  modifier onlyValidChunkIndex(uint256 _projectId, uint256 _index) {
    require(
      _index < projects[_projectId].scriptChunksCount,
      "invalid chunk index"
    );
    _;
  }

  modifier onlyProjectsWithScriptChunks(uint256 _projectId) {
    require(
      projects[_projectId].scriptChunksCount > 0,
      "script chunks stack is empty"
    );
    _;
  }

  constructor(
    string memory _tokenName,
    string memory _tokenSymbol,
    address _mintoriaAddress,
    address _mintoriaRandomizerContractAddress
  ) ERC721(_tokenName, _tokenSymbol) {
    mintoriaAddress = _mintoriaAddress;
    mintoriaRandomizerContract = IMintoriaRandomizer(
      _mintoriaRandomizerContractAddress
    );
    operators[msg.sender] = true;
    minters[msg.sender] = true;
  }

  function setMintoriaAddress(address _mintoriaAddress) public onlyMintoria {
    mintoriaAddress = _mintoriaAddress;
  }

  function setMintoriaFeeSplitPercentage(uint256 _mintoriaFeeSplitPercentage)
    public
    onlyMintoria
    onlyValidFeePercentage(_mintoriaFeeSplitPercentage)
  {
    mintoriaFeeSplitPercentage = _mintoriaFeeSplitPercentage;
  }

  function setAdminFeeSplitPercentage(uint256 _adminFeeSplitPercentage)
    public
    onlyOwner
    onlyValidFeePercentage(_adminFeeSplitPercentage)
  {
    adminFeeSplitPercentage = _adminFeeSplitPercentage;
  }

  function setRandomizerAddress(address _mintoriaRandomizerContract)
    public
    onlyOperators
  {
    mintoriaRandomizerContract = IMintoriaRandomizer(
      _mintoriaRandomizerContract
    );
  }

  function addMintRights(address _address) public onlyOwner {
    minters[_address] = true;
  }

  function removeMintRights(address _address) public onlyOwner {
    minters[_address] = false;
  }

  function addOperatingRights(address _address) public onlyOwner {
    operators[_address] = true;
  }

  function removeOperatingRights(address _address) public onlyOwner {
    operators[_address] = false;
  }

  function createProject(
    address _artistAddress,
    string memory _projectName,
    uint256 _pricePerTokenInWei,
    uint256 _feePercentage,
    bool _useStorage
  ) public onlyOperators {
    uint256 projectId = nextProjectId;
    projects[projectId].name = _projectName;
    projects[projectId].pricePerTokenInWei = _pricePerTokenInWei;
    projects[projectId].artistAddress = _artistAddress;
    projects[projectId].feePercentage = _feePercentage;
    projects[projectId].useStorage = _useStorage;
    projects[projectId].maxIterations = MAX_TOKENS_PER_PROJECT;
    projects[projectId].maxTokensPerAddress = MAX_TOKENS_PER_ADDRESS;
    projects[projectId].paused = true;
    nextProjectId = nextProjectId.add(1);

    emit CreateProject(
      projectId,
      _artistAddress,
      _projectName,
      _pricePerTokenInWei,
      _feePercentage,
      _useStorage
    );
  }

  function getProjectDetails(uint256 _projectId)
    public
    view
    returns (
      string memory projectName,
      string memory artist,
      address artistAddress,
      string memory description,
      string memory website,
      string memory license,
      bool paused,
      bool active,
      bool locked
    )
  {
    projectName = projects[_projectId].name;
    artist = projects[_projectId].artist;
    artistAddress = projects[_projectId].artistAddress;
    description = projects[_projectId].description;
    website = projects[_projectId].website;
    license = projects[_projectId].license;
    paused = projects[_projectId].paused;
    active = projects[_projectId].active;
    locked = projects[_projectId].locked;
  }

  function getProjectTokenDetails(uint256 _projectId)
    public
    view
    returns (
      uint256 feePercentage,
      uint256 pricePerTokenInWei,
      uint256 iterations,
      uint256 maxIterations,
      uint256 maxTokensPerAddress
    )
  {
    feePercentage = projects[_projectId].feePercentage;
    pricePerTokenInWei = projects[_projectId].pricePerTokenInWei;
    iterations = projects[_projectId].iterations;
    maxIterations = projects[_projectId].maxIterations;
    maxTokensPerAddress = projects[_projectId].maxTokensPerAddress;
  }

  function getProjectURIDetails(uint256 _projectId)
    public
    view
    returns (
      string memory baseURI,
      string memory baseIpfsURI,
      bool useStorage
    )
  {
    baseURI = projects[_projectId].baseURI;
    baseIpfsURI = projects[_projectId].baseIpfsURI;
    useStorage = projects[_projectId].useStorage;
  }

  function getProjectExtraPaymentDetails(uint256 _projectId)
    public
    view
    returns (
      address collaboratorAddress,
      uint256 collaboratorPercentage,
      uint256 royaltyFeePercentage
    )
  {
    collaboratorAddress = projects[_projectId].collaboratorAddress;
    collaboratorPercentage = projects[_projectId].collaboratorPercentage;
    royaltyFeePercentage = projects[_projectId].royaltyFeePercentage;
  }

  function getProjectScriptDetails(uint256 _projectId)
    public
    view
    returns (string memory scriptMetadata, uint256 scriptChunksCount)
  {
    scriptMetadata = projects[_projectId].scriptMetadata;
    scriptChunksCount = projects[_projectId].scriptChunksCount;
  }

  function getProjectScriptChunkByIndex(uint256 _projectId, uint256 _index)
    public
    view
    returns (string memory)
  {
    return projects[_projectId].scriptChunks[_index];
  }

  function getProjectTokens(uint256 _projectId)
    public
    view
    returns (uint256[] memory)
  {
    return projects[_projectId].tokenIds;
  }

  function setProjectName(uint256 _projectId, string memory _name)
    public
    onlyUnlockedProject(_projectId)
    onlyOperatorsOrArtist(_projectId)
  {
    projects[_projectId].name = _name;

    emit UpdateProject(_projectId);
  }

  function setProjectArtistName(uint256 _projectId, string memory _artistName)
    public
    onlyUnlockedProject(_projectId)
    onlyOperatorsOrArtist(_projectId)
  {
    projects[_projectId].artist = _artistName;

    emit UpdateProject(_projectId);
  }

  function setProjectArtistAddress(uint256 _projectId, address _artistAddress)
    public
    onlyOperatorsOrArtist(_projectId)
  {
    projects[_projectId].artistAddress = _artistAddress;

    emit UpdateProject(_projectId);
  }

  function setProjectDescription(uint256 _projectId, string memory _description)
    public
    onlyOperatorsOrArtist(_projectId)
  {
    projects[_projectId].description = _description;

    emit UpdateProject(_projectId);
  }

  function setProjectWebsite(uint256 _projectId, string memory _website)
    public
    onlyOperatorsOrArtist(_projectId)
  {
    projects[_projectId].website = _website;

    emit UpdateProject(_projectId);
  }

  function setProjectLicense(uint256 _projectId, string memory _license)
    public
    onlyUnlockedProject(_projectId)
    onlyOperatorsOrArtist(_projectId)
  {
    projects[_projectId].license = _license;

    emit UpdateProject(_projectId);
  }

  function setProjectPricePerTokenInWei(
    uint256 _projectId,
    uint256 _pricePerTokenInWei
  ) public onlyOperatorsOrArtist(_projectId) {
    projects[_projectId].pricePerTokenInWei = _pricePerTokenInWei;

    emit UpdateProject(_projectId);
  }

  function setProjectMaxIterations(uint256 _projectId, uint256 _maxIterations)
    public
    onlyUnlockedProject(_projectId)
    onlyOperatorsOrArtist(_projectId)
    onlyValidIterationCount(_maxIterations)
    onlyHigherIterationCount(_maxIterations, _projectId)
  {
    projects[_projectId].maxIterations = _maxIterations;

    emit UpdateProject(_projectId);
  }

  function setProjectMaxTokensPerAddress(
    uint256 _projectId,
    uint256 _maxTokensPerAddress
  )
    public
    onlyUnlockedProject(_projectId)
    onlyOperatorsOrArtist(_projectId)
    onlyValidIterationCount(_maxTokensPerAddress)
  {
    projects[_projectId].maxTokensPerAddress = _maxTokensPerAddress;

    emit UpdateProject(_projectId);
  }

  function setProjectFeePercentage(uint256 _projectId, uint256 _feePercentage)
    public
    onlyOperators
    onlyUnlockedProject(_projectId)
    onlyValidProjectFeePercentage(_feePercentage)
  {
    projects[_projectId].feePercentage = _feePercentage;

    emit UpdateProject(_projectId);
  }

  function setProjectBaseURI(uint256 _projectId, string memory _baseURI)
    public
    onlyOperatorsOrArtist(_projectId)
  {
    projects[_projectId].baseURI = _baseURI;

    emit UpdateProject(_projectId);
  }

  function setProjectBaseIpfsURI(uint256 _projectId, string memory _baseIpfsURI)
    public
    onlyOperatorsOrArtist(_projectId)
  {
    projects[_projectId].baseIpfsURI = _baseIpfsURI;

    emit UpdateProject(_projectId);
  }

  function setProjectCollaborator(
    uint256 _projectId,
    address _collaboratorAddress,
    uint256 _collaboratorPercentage
  )
    public
    onlyOperatorsOrArtist(_projectId)
    onlyValidFeePercentage(_collaboratorPercentage)
  {
    projects[_projectId].collaboratorAddress = _collaboratorAddress;
    projects[_projectId].collaboratorPercentage = _collaboratorPercentage;

    emit UpdateProject(_projectId);
  }

  function setProjectRoyaltyFeePercentage(
    uint256 _projectId,
    uint256 _royaltyFeePercentage
  )
    public
    onlyOperatorsOrArtist(_projectId)
    onlyValidFeePercentage(_royaltyFeePercentage)
  {
    projects[_projectId].royaltyFeePercentage = _royaltyFeePercentage;

    emit UpdateProject(_projectId);
  }

  function addProjectScriptChunk(uint256 _projectId, string memory _scriptChunk)
    public
    onlyUnlockedProject(_projectId)
    onlyOperatorsOrArtist(_projectId)
  {
    projects[_projectId].scriptChunks[
      projects[_projectId].scriptChunksCount
    ] = _scriptChunk;
    projects[_projectId].scriptChunksCount = projects[_projectId]
      .scriptChunksCount
      .add(1);

    emit UpdateProject(_projectId);
  }

  function setProjectScriptChunkByIndex(
    uint256 _projectId,
    uint256 _index,
    string memory _scriptChunk
  )
    public
    onlyUnlockedProject(_projectId)
    onlyOperatorsOrArtist(_projectId)
    onlyValidChunkIndex(_projectId, _index)
  {
    projects[_projectId].scriptChunks[_index] = _scriptChunk;

    emit UpdateProject(_projectId);
  }

  function removeProjectLastScriptChunk(uint256 _projectId)
    public
    onlyUnlockedProject(_projectId)
    onlyOperatorsOrArtist(_projectId)
    onlyProjectsWithScriptChunks(_projectId)
  {
    delete projects[_projectId].scriptChunks[
      projects[_projectId].scriptChunksCount - 1
    ];
    projects[_projectId].scriptChunksCount = projects[_projectId]
      .scriptChunksCount
      .sub(1);

    emit UpdateProject(_projectId);
  }

  function setProjectScriptMetadata(
    uint256 _projectId,
    string memory _scriptMetadata
  ) public onlyUnlockedProject(_projectId) onlyOperatorsOrArtist(_projectId) {
    projects[_projectId].scriptMetadata = _scriptMetadata;

    emit UpdateProject(_projectId);
  }

  function toggleActiveProject(uint256 _projectId) public onlyOperators {
    projects[_projectId].active = !projects[_projectId].active;

    emit UpdateProject(_projectId);
  }

  function togglePausedProject(uint256 _projectId)
    public
    onlyOperatorsOrArtist(_projectId)
  {
    projects[_projectId].paused = !projects[_projectId].paused;

    emit UpdateProject(_projectId);
  }

  function toggleLockedProject(uint256 _projectId)
    public
    onlyOperators
    onlyUnlockedProject(_projectId)
  {
    projects[_projectId].locked = true;

    emit UpdateProject(_projectId);
  }

  function toggleProjectStorage(uint256 _projectId)
    public
    onlyUnlockedProject(_projectId)
    onlyOperatorsOrArtist(_projectId)
    onlyNoTokensMinted(_projectId)
  {
    projects[_projectId].useStorage = !projects[_projectId].useStorage;

    emit UpdateProject(_projectId);
  }

  function getTokenById(uint256 _tokenId)
    public
    view
    returns (uint256 projectId, bytes32 hash)
  {
    projectId = tokens[_tokenId].projectId;
    hash = tokens[_tokenId].hash;
  }

  function mint(
    address _to,
    uint256 _projectId,
    address _by
  )
    external
    onlyMinters
    onlyActiveProjectOrArtist(_projectId, _by)
    onlyUnpausedProjectOrArtist(_projectId, _by)
    onlyMaxTokensPerAddress(_projectId, _to)
    onlyMaxIterations(_projectId)
    returns (uint256 _tokenId)
  {
    uint256 tokenId = _mintProjectToken(_projectId, _to);
    return tokenId;
  }

  function _mintProjectToken(uint256 _projectId, address _to)
    internal
    returns (uint256 _tokenId)
  {
    uint256 nextTokenId = (_projectId * MAX_TOKENS_PER_PROJECT) +
      projects[_projectId].iterations;
    projects[_projectId].iterations = projects[_projectId].iterations.add(1);

    bytes32 nextTokenHash = keccak256(
      abi.encodePacked(
        mintoriaRandomizerContract.getValue(),
        block.number - 1,
        blockhash(block.number - 1),
        projects[_projectId].iterations,
        msg.sender
      )
    );
    tokens[nextTokenId].hash = nextTokenHash;
    tokens[nextTokenId].projectId = _projectId;

    projects[_projectId].addressToTokenCount[_to] = projects[_projectId]
      .addressToTokenCount[_to]
      .add(1);
    projects[_projectId].tokenIds.push(nextTokenId);

    _mint(_to, nextTokenId);
    emit Mint(_to, nextTokenId, _projectId, nextTokenHash);

    return nextTokenId;
  }

  function tokenURI(uint256 _tokenId)
    public
    view
    override(ERC721)
    onlyExistingToken(_tokenId)
    returns (string memory)
  {
    return
      string(
        abi.encodePacked(
          projects[tokens[_tokenId].projectId].baseURI,
          Strings.toString(_tokenId)
        )
      );
  }

  function royaltyInfo(uint256 _tokenId, uint256 _salePrice)
    external
    view
    override
    onlyExistingToken(_tokenId)
    returns (address receiver, uint256 royaltyAmount)
  {
    Project storage project = projects[tokens[_tokenId].projectId];
    uint256 royaltyFeePercentage = project.royaltyFeePercentage;
    address artistAddress = project.artistAddress;

    if (royaltyFeePercentage > 0) {
      return (artistAddress, (_salePrice * royaltyFeePercentage) / 100);
    }
    return (address(0), 0);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC165, ERC721, ERC721Enumerable)
    returns (bool)
  {
    if (interfaceId == _INTERFACE_ID_ERC2981) {
      return true;
    }
    return super.supportsInterface(interfaceId);
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, amount);
  }
}
