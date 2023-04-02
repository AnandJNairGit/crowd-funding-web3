//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.9.0;

// import "hardhat/console.sol";

contract CrowdFunding {
    address _admin;

    uint256 campaignId;
    bool public AllowCrowdFunding = true;
    bool public AllowCampaignCreation = true;

    struct Campaign {
        uint256 id;
        address recepient;
        uint256 requiredFunding;
        string ipfsUrl;
        uint256 deadline;
        bool approved;
        bool completed;
        uint256 raisedAmount;
        bool amountReceived;
    }

    struct Funder {
        address account;
        uint256 amount;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => Funder[]) public campaignFunders;
    address[] adminAccessAccounts;

    uint256 public minimumContribution;
    uint256 public creationPrice;
    uint256 public raisedCreationAmount;

    constructor(uint256 _minimumContribution, uint256 _creationPrice) {
        _admin = msg.sender;
        minimumContribution = _minimumContribution;
        creationPrice = _creationPrice;
    }

    // to update contract instance in frontend
    event updateContractInstance(string info);

    modifier onlyAdmin() {
        require(msg.sender == _admin, "Only Admin can access this funtion");
        _;
    }
    modifier onlyAdminAccessAccounts() {
        require(
            doesAdminAccountExist(msg.sender),
            "Only Admins can access this funtion"
        );
        _;
    }

    modifier ifCampaignExist(uint256 _campaignId) {
        require(campaigns[_campaignId].id != 0, "Campaign does not exist");
        _;
    }

    modifier isCrowdFundingEnabled() {
        require(
            AllowCrowdFunding,
            "Please wait. Funding is disabled right now"
        );
        _;
    }

    modifier isCampaignCreationEnabled() {
        require(
            AllowCampaignCreation,
            "Please wait. Campaign creation is disabled right now"
        );
        _;
    }

    function doesAdminAccountExist(address account) public view returns (bool) {
        if (account == _admin) {
            return true;
        } else {
            for (uint256 i = 0; i < adminAccessAccounts.length; i++) {
                if (account == adminAccessAccounts[i]) {
                    return true;
                }
            }
            return false;
        }
    }

    function grantAdminAccess(address account) public onlyAdmin {
        if (!doesAdminAccountExist(account)) {
            bool addAccount = true;
            for (uint256 i = 0; i < adminAccessAccounts.length; i++) {
                if (adminAccessAccounts[i] == address(0)) {
                    adminAccessAccounts[i] = account;
                    addAccount = false;
                }
            }
            if (addAccount) {
                adminAccessAccounts.push(account);
            }
        }
    }

    function revokeAdminAccess(address account) public onlyAdmin {
        for (uint256 i = 0; i < adminAccessAccounts.length; i++) {
            if (adminAccessAccounts[i] == account) {
                delete adminAccessAccounts[i];
                break;
            }
        }
    }

    function getAdminAccessAccounts() public view returns (address[] memory) {
        return adminAccessAccounts;
    }

    function updateCrowdFundingStatus(bool status)
        public
        onlyAdminAccessAccounts
    {
        AllowCrowdFunding = status;
        emit updateContractInstance("CrowdFundingStatus");
    }

    function updateCampaignCreationStatus(bool status)
        public
        onlyAdminAccessAccounts
    {
        AllowCampaignCreation = status;
        emit updateContractInstance("CampaignCreationStatus");
    }

    function updateMinimumContribution(uint256 _minimumContribution)
        public
        onlyAdminAccessAccounts
    {
        minimumContribution = _minimumContribution;
        emit updateContractInstance("MinimumContribution");
    }

    function updateCreationPrice(uint256 _creationPrice)
        public
        onlyAdminAccessAccounts
    {
        creationPrice = _creationPrice;
        emit updateContractInstance("CreationPrice");
    }

    function isAdmin() public view returns (bool) {
        return msg.sender == _admin;
    }

    function createCampaignRequest(
        string memory ipfsUrl,
        uint256 requiredFunding,
        uint256 deadline
    ) public payable isCampaignCreationEnabled {
        require(
            msg.value == creationPrice,
            "Fund should be greater than or equal to minimum contribution"
        );
        raisedCreationAmount += msg.value;
        campaignId++;
        campaigns[campaignId] = Campaign(
            campaignId,
            msg.sender,
            requiredFunding,
            ipfsUrl,
            deadline,
            false,
            false,
            0,
            false
        );
    }

    function approveCamaignRequest(uint256 _campaignId)
        public
        onlyAdminAccessAccounts
        ifCampaignExist(_campaignId)
    {
        campaigns[_campaignId].approved = true;
    }

    function _getCampaignList(
        bool approved,
        bool completed,
        bool refundable
    ) private view returns (Campaign[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i <= campaignId; i++) {
            if (
                campaigns[i].approved == approved &&
                campaigns[i].completed == completed
            ) {
                if (refundable) {
                    // console.log(
                    //     "deadline met----->",
                    //     campaigns[i].deadline < block.timestamp
                    // );
                    // console.log(
                    //     "raised less than required----->",
                    //     campaigns[i].raisedAmount < campaigns[i].requiredFunding
                    // );
                    // console.log(
                    //     "raised more than 0----->",
                    //     campaigns[i].raisedAmount < campaigns[i].requiredFunding
                    // );
                    // console.log(
                    //     "raised amount----->",
                    //     campaigns[i].raisedAmount
                    // );

                    if (
                        campaigns[i].deadline < block.timestamp &&
                        campaigns[i].raisedAmount <
                        campaigns[i].requiredFunding &&
                        campaigns[i].raisedAmount > 0
                    ) {
                        count++;
                    }
                } else {
                    count++;
                }
            }
        }
        // console.log("the count is------->", count);

        Campaign[] memory campaignList = new Campaign[](count);
        uint256 index = 0;
        for (uint256 i = 1; i <= campaignId; i++) {
            if (
                campaigns[i].approved == approved &&
                campaigns[i].completed == completed
            ) {
                if (refundable) {
                    if (
                        campaigns[i].deadline < block.timestamp &&
                        campaigns[i].raisedAmount <
                        campaigns[i].requiredFunding &&
                        campaigns[i].raisedAmount > 0
                    ) {
                        campaignList[index] = campaigns[i];
                        index++;
                    }
                } else {
                    campaignList[index] = campaigns[i];
                    index++;
                }
            }
        }

        return campaignList;
    }

    function getOnGoingCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory onGoingCampaigns = _getCampaignList(
            true,
            false,
            false
        );
        return onGoingCampaigns;
    }

    function getPendingCampaigns()
        public
        view
        onlyAdminAccessAccounts
        returns (Campaign[] memory)
    {
        Campaign[] memory pendingCampaigns = _getCampaignList(
            false,
            false,
            false
        );
        return pendingCampaigns;
    }

    function getCompletedCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory completedCampaigns = _getCampaignList(
            true,
            true,
            false
        );
        return completedCampaigns;
    }

    function getRefundableCampaigns()
        public
        view
        onlyAdminAccessAccounts
        returns (Campaign[] memory)
    {
        Campaign[] memory completedCampaigns = _getCampaignList(
            true,
            false,
            true
        );
        return completedCampaigns;
    }

    function getMycampaigns() public view returns (Campaign[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i <= campaignId; i++) {
            if (campaigns[i].recepient == msg.sender) {
                count++;
            }
        }

        Campaign[] memory campaignList = new Campaign[](count);
        uint256 index = 0;
        for (uint256 i = 1; i <= campaignId; i++) {
            if (campaigns[i].recepient == msg.sender) {
                campaignList[index] = campaigns[i];
                index++;
            }
        }

        return campaignList;
    }

    function getCampaignById(uint256 _campaignId)
        public
        view
        ifCampaignExist(_campaignId)
        returns (Campaign memory)
    {
        return campaigns[_campaignId];
    }

    function getMyCampaignById(uint256 _campaignId)
        public
        view
        ifCampaignExist(_campaignId)
        returns (Campaign memory)
    {
        require(
            msg.sender == campaigns[_campaignId].recepient,
            "You are not owner of this campaign"
        );
        return campaigns[_campaignId];
    }

    function _updateCampaignFunders(
        address account,
        uint256 amount,
        uint256 _campaignId
    ) private {
        bool newAccount = true;
        for (uint256 i; i < campaignFunders[_campaignId].length; i++) {
            if (campaignFunders[_campaignId][i].account == account) {
                campaignFunders[_campaignId][i].amount += amount;
                newAccount = false;
            }
        }
        if (newAccount) {
            campaignFunders[_campaignId].push(Funder(account, amount));
        }
    }

    function fundCampaign(uint256 _campaignId)
        public
        payable
        ifCampaignExist(_campaignId)
        isCrowdFundingEnabled
    {
        require(
            msg.value >= minimumContribution,
            "Fund should be greater than or equal to minimum contribution"
        );
        require(
            campaigns[_campaignId].approved,
            "Please wait for the campaign to approve"
        );
        // require(campaigns[_campaignId].raisedAmount < campaigns[_campaignId].requiredFunding, "Campaign closed");
        require(!campaigns[_campaignId].completed, "Campaign closed");

        require(
            block.timestamp < campaigns[_campaignId].deadline,
            "Dedline has met"
        );

        if (
            campaigns[_campaignId].raisedAmount + msg.value >=
            campaigns[_campaignId].requiredFunding
        ) {
            uint256 remainingAmount = campaigns[_campaignId].raisedAmount +
                msg.value -
                campaigns[_campaignId].requiredFunding;
            if (remainingAmount != 0) {
                payable(msg.sender).transfer(remainingAmount);
                _updateCampaignFunders(
                    msg.sender,
                    msg.value - remainingAmount,
                    _campaignId
                );

                campaigns[_campaignId].raisedAmount +=
                    msg.value -
                    remainingAmount;
            }
            campaigns[_campaignId].completed = true;
        } else {
            _updateCampaignFunders(msg.sender, msg.value, _campaignId);
            campaigns[_campaignId].raisedAmount += msg.value;
        }
    }

    function refundCampaign(uint256 _campaignId)
        public
        ifCampaignExist(_campaignId)
        onlyAdminAccessAccounts
    {
        require(
            block.timestamp > campaigns[_campaignId].deadline,
            "Dedline has not met"
        );
        for (uint256 i = 0; i < campaignFunders[_campaignId].length; i++) {
            campaignFunders[_campaignId][0];
            address payable funder = payable(
                campaignFunders[_campaignId][i].account
            );

            funder.transfer(campaignFunders[_campaignId][i].amount);
        }
        delete campaignFunders[_campaignId];
        campaigns[_campaignId].raisedAmount = 0;
    }

    function getCampaignFunders(uint256 _campaignId)
        public
        view
        ifCampaignExist(_campaignId)
        returns (Funder[] memory)
    {
        return campaignFunders[_campaignId];
    }

    function withdrawCreationAmount() public {
        require(raisedCreationAmount > 0, "No Creation amount raised");
        address payable admin = payable(_admin);
        admin.transfer(raisedCreationAmount);
        raisedCreationAmount = 0;
    }

    function transactRaisedAmount(uint256 _campaignId)
        public
        ifCampaignExist(_campaignId)
    {
        require(
            !campaigns[_campaignId].amountReceived,
            "Amount Has already transacted"
        );
        address payable recepient = payable(campaigns[_campaignId].recepient);
        recepient.transfer(campaigns[_campaignId].raisedAmount);
        campaigns[_campaignId].amountReceived = true;
    }
}
