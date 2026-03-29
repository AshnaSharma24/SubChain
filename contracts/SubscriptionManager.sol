// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SubscriptionManager {

    struct Subscription {
        uint256 id;
        string service;
        address user;
        uint256 amount;
        uint256 startTime;
        uint256 duration;
        bool active;
    }

    uint256 public subscriptionCounter;

    mapping(uint256 => Subscription) public subscriptions;
    mapping(address => uint256[]) public userSubscriptions;

    event Subscribed(uint256 id, address user, string service);
    event Cancelled(uint256 id);
    event Renewed(uint256 id);

    function subscribe(string memory _service, uint256 _duration) public payable {
        require(msg.value > 0, "Pay ETH");

        uint256 id = subscriptionCounter++;

        subscriptions[id] = Subscription(
            id,
            _service,
            msg.sender,
            msg.value,
            block.timestamp,
            _duration,
            true
        );

        userSubscriptions[msg.sender].push(id);

        emit Subscribed(id, msg.sender, _service);
    }

    function cancelSubscription(uint256 _id) public {
        require(subscriptions[_id].user == msg.sender);
        subscriptions[_id].active = false;

        emit Cancelled(_id);
    }

    function renewSubscription(uint256 _id) public payable {
        Subscription storage sub = subscriptions[_id];

        require(sub.user == msg.sender);
        require(msg.value >= sub.amount);

        sub.startTime = block.timestamp;

        emit Renewed(_id);
    }

    function getMySubscriptions() public view returns (Subscription[] memory) {
        uint256[] memory ids = userSubscriptions[msg.sender];
        Subscription[] memory result = new Subscription[](ids.length);

        for (uint i = 0; i < ids.length; i++) {
            result[i] = subscriptions[ids[i]];
        }

        return result;
    }
}
