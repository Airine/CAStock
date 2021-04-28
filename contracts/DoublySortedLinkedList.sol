// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <=0.8.4;

struct DataValue {
    bytes data;
    uint256 value;
}

// By default, in ascending order, and circular
contract DoublySortedLinkedList {
    
    struct Node {
        DataValue dv;
        uint256 prev;
        uint256 next;
    }

    // nodes[0].next is head, and nodes[0].prev is tail
    Node[] public nodes;

    constructor () {
        nodes.push(Node(DataValue(new bytes(0), 0), 0, 0));
    }

    function insertAfter(uint256 id, DataValue memory dv) internal returns (uint256 newID) {
        require (id == 0 || isValidNode(id));
        
        Node storage node = nodes[id];

        nodes.push(Node({
            dv:     dv,
            prev:   id,
            next:   node.next
        }));

        newID = nodes.length - 1;

        nodes[node.next].prev = newID;
        node.next = newID;
    }

    function remove(uint256 id) public {
        require (id != 0 || isValidNode(id));

        // retrieve the node
        Node storage node = nodes[id];

        nodes[node.next].prev = node.prev;
        nodes[node.prev].next = node.next;

        delete nodes[id];
    }

    function insert(DataValue memory dv) public returns (uint256 newID) {
        uint256 head = nodes[0].next;
        uint256 tail = nodes[0].prev;

        uint256 target = head;

        uint256 value = dv.value;

        while (target != tail) {

            if (value < nodes[target].dv.value) {
                return insertAfter(nodes[target].prev, dv);
            }
            target = nodes[target].next;
        }
        insertAfter(tail, dv);
    }

    function isValidNode(uint256 id) internal view returns (bool) {
        return id != 0 && (id == nodes[0].next || nodes[id].prev != 0);
    }
}