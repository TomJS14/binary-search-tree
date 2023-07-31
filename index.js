/** @format */

class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  findMinValue() {
    let node = this;
    while (node.left !== null) {
      node = node.left;
    }
    return node.value;
  }
}

class Tree {
  constructor(array) {
    if (array && array.length > 0) {
      this.root = this.constructBalancedTree(array);
    } else {
      this.root = null;
    }
  }

  /* Methods here */

  addToTree(data) {
    if (data === undefined) {
      throw new Error("Data to add must be provided");
    }
    const addNode = (node, data) => {
      if (node === null) {
        return new Node(data);
      }
      if (data < node.value) {
        node.left = addNode(node.left, data);
      } else if (data > node.value) {
        node.right = addNode(node.right, data);
      }
      return node;
    };
    this.root = addNode(this.root, data);
  }

  delete(data) {
    if (data === undefined) {
      throw new Error("Data to add must be provided");
    }
    if (this.root === null) {
      return;
    }
    const node = this.root;
    const deleteNode = function (node, data) {
      if (node === null) {
        return null;
      }
      if (data < node.value) {
        node.left = deleteNode(node.left, data);
      } else if (data > node.value) {
        node.right = deleteNode(node.right, data);
      } else {
        if (node.left === null) {
          return node.right;
        } else if (node.right === null) {
          return node.left;
        }
        node.value = findMinValue(node.right);

        node.right = deleteNode(node.right, node.value);
      }
      return node;
    };
    return deleteNode(node, data);
  }

  find(data) {
    const node = this.root;
    const searchTree = function (node) {
      if (node === null) {
        return `Value not found, returned ${null}`;
      }
      if (data < node.value) {
        return searchTree(node.left);
      } else if (data > node.value) {
        return searchTree(node.right);
      } else {
      }
      return `${node.value} was found!`;
    };

    return searchTree(node);
  }

  //traverse the tree by each level e.g. 1, 2, 3...
  levelOrder() {
    /* Use an array to set a F.I.F.O queue to keep track of node addresses,
    return the visited nodes and enqueue the child nodes
    (convention is left first)
    once a node is visited, 'print' the value and pop off the queue,
    now move to the first in the queue and repeat*/
    const node = this.root;
    if (node === null) return;
    const arrayOfNodes = [];
    let q = [];
    q.push(node);
    //while there is at least 1 discovered node
    while (q.length > 0 || q.length !== 0) {
      let currentNode = q.shift(); //take the first node from the queue
      arrayOfNodes.push(currentNode.value); //print the nodes value
      if (currentNode.left !== null) {
        //if there's a left child, add it to the queue and repeat above
        q.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        //if there's a right child, add it to the queue and repeat above
        q.push(currentNode.right);
      }
    }
    return arrayOfNodes; //return the completed array with all visited node values
  }
  //Traverse the tree and print values in ascending order
  inOrder() {
    //Call left nodes until at leaf, print the value, then call right nodes..repeat
    const node = this.root;
    const arrayOfValues = [];
    const searchOrder = function (node) {
      if (node === null) return;
      if (node.left !== null) {
        searchOrder(node.left); //recursively traverse left child nodes
      }
      arrayOfValues.push(node.value);
      if (node.right !== null) {
        searchOrder(node.right); //recursively traverse right child nodes
      }
    };
    searchOrder(node);
    return arrayOfValues;
  }

  preOrder() {
    //Print current value, then call it's left, then call it's right
    const node = this.root;
    const arrayOfValues = [];
    const searchOrder = function (node) {
      if (node === null) return;
      arrayOfValues.push(node.value);
      if (node.left !== null) {
        searchOrder(node.left);
      }
      if (node.right !== null) {
        searchOrder(node.right);
      }
    };

    searchOrder(node);
    return arrayOfValues;
  }

  postOrder() {
    //call left to get to left leaf, then call right, then print node
    const node = this.root;
    const arrayOfValues = [];
    const searchOrder = function (node) {
      if (node === null) return;
      if (node.left !== null) {
        searchOrder(node.left);
      }
      if (node.right !== null) {
        searchOrder(node.right);
      }
      arrayOfValues.push(node.value);
    };
    searchOrder(node);
    return arrayOfValues;
  }

  height(value) {
    const node = this.root;

    if (value < 0 || value > this.length) {
      throw new Error("Invalid value");
    }
    //function to find the node with the given value in the BST
    const searchNode = function (node, targetValue) {
      if (node === null) return null;
      if (node.value === targetValue) {
        return node;
      }
      if (targetValue < node.value) {
        return searchNode(node.left, targetValue);
      } else {
        return searchNode(node.right, targetValue);
      }
    };

    // Find the node with the given value
    const targetNode = searchNode(node, value);

    if (targetNode === null) {
      return `Value doesn't exist in the tree`;
      //find the height of the node with the given value
    } else {
      const calculateHeight = function (node) {
        if (node === null) return -1;
        const leftHeight = calculateHeight(node.left);
        const rightHeight = calculateHeight(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
      };
      return `Height of ${value} is ${calculateHeight(targetNode)}`;
    }
  }

  depthOrder(value) {
    const node = this.root;

    if (value < 0) {
      throw new Error("Invalid value");
    }

    //function to find the node with the given value in the BST
    const searchNode = function (node, targetValue) {
      if (node === null) return null;
      if (node.value === targetValue) {
        return node;
      }
      if (targetValue < node.value) {
        return searchNode(node.left, targetValue);
      } else {
        return searchNode(node.right, targetValue);
      }
    };

    // Find the node with the given value
    const targetNode = searchNode(node, value);

    if (targetNode === null) return `${value} not found in the tree`;
    let currentDepth = 0;
    let q = [];
    q.push(node);
    //while there is at least 1 discovered node
    while (q.length > 0) {
      const nodesAtCurrentLevel = q.length;
      for (let i = 0; i < nodesAtCurrentLevel; i++) {
        let currentNode = q.shift();
        if (currentNode.value === value) {
          return `Depth of ${value} is ${currentDepth}`;
        }
        if (currentNode.left !== null) {
          q.push(currentNode.left);
        }
        if (currentNode.right !== null) {
          q.push(currentNode.right);
        }
      }
      currentDepth++;
    }
    //return the depth
  }

  isBalanced() {
    const node = this.root;

    function checkHeightAndBalance(rootNode) {
      if (rootNode === null) {
        return 0; // Height of an empty subtree is 0
      }

      // Calculate the heights of left and right subtrees
      let leftHeight = checkHeightAndBalance(rootNode.left);
      let rightHeight = checkHeightAndBalance(rootNode.right);

      // If any subtree is unbalanced, return -1
      if (
        leftHeight === -1 ||
        rightHeight === -1 ||
        Math.abs(leftHeight - rightHeight) > 1
      ) {
        return -1; //-1 for an imbalanced tree
      }

      // Return the height of the current subtree
      return Math.max(leftHeight, rightHeight) + 1;
    }

    // Start checking height and balance from the root node
    if (checkHeightAndBalance(node) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  rebalance() {
    if (this.isBalanced() == true) {
      return "Already balanced";
    } else {
      const sortedArray = this.inOrder();
      this.root = this.constructBalancedTree(sortedArray);
      return "Tree has been rebalanced, all is well in the world";
    }
  }

  constructBalancedTree(array) {
    if (array.length === 0) {
      return null;
    }
    const middle = Math.floor(array.length / 2);

    const rootNode = new Node(array[middle]);
    rootNode.left = this.constructBalancedTree(array.slice(0, middle));
    rootNode.right = this.constructBalancedTree(array.slice(middle + 1));
    return rootNode;
  }
}

// Helper function to create a random array
function createRandomArray() {
  array = [];
  function randomNumber() {
    return Math.floor(Math.random() * 100);
  }
  while (array.length < 20) {
    const num = randomNumber();
    if (!array.includes(num)) {
      array.push(num);
    }
  }

  array.sort((a, b) => a - b);

  return array;
}

// Helper function to print a visual representation of the BST
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

/* Usage */

function script() {
  const randomArray = createRandomArray(); //create a random array
  const theTree = new Tree(randomArray); //create a new tree
  console.log(theTree.isBalanced()); //check it is balanced => True
  theTree.addToTree(100); //add values to unbalance
  theTree.addToTree(101); //add values to unbalance
  theTree.addToTree(102); //add values to unbalance
  console.log("After adding values", theTree.isBalanced()); //Check if balanced => false
  console.log("In order", theTree.inOrder());
  console.log("Level Order", theTree.levelOrder());
  console.log("Post Order", theTree.postOrder());
  theTree.rebalance();
  console.log("After rebalancing", theTree.isBalanced()); //Check if balanced => true
  prettyPrint(theTree.root);
  console.log("In order", theTree.inOrder());
  console.log("Level Order", theTree.levelOrder());
  console.log("Post Order", theTree.postOrder());
}

//call script
script();
