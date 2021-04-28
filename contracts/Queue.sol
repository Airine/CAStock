// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <=0.8.4;

contract Queue {
    mapping(uint256 => bytes) queue;
    uint256 first = 1;
    uint256 last = 0;

    function enqueue(bytes memory data) public {
        last += 1;
        queue[last] = data;
    }

    function dequeue() public returns (bytes memory data) {
        require(last >= first);  // non-empty queue

        data = queue[first];

        delete queue[first];
        first += 1;
    }
}