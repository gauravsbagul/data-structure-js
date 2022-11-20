// const preOrder = [9, 1, 5, 6, -1, -1, 3, -1, 7, 8, -1, -1, -1, 1213, 291, -1, -1, -1, 10, -1, 123, 99]
const arr = [8, 5, 3, 1, 4, 6, 10, 11, 14]
const Node = (node, l = null, r = null) => {
    const data = node
    const left = l;
    const right = r

    return { data, left, right }
}


const BinarySearchTree = () => {
    let tree = null
    const rangeArray = []

    const insertNode = (root, node) => {
        if (root === null) {
            return Node(node)
        }

        if (root.data > node) {
            root.left = insertNode(root.left, node)
        }

        if (root.data < node) {
            root.right = insertNode(root.right, node)
        }

        return root
    }

    const generateTree = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            tree = insertNode(tree, arr[i])
        }
        return tree
    }

    const searchNode = (root, searchQuery) => {

        if (root === null) {
            return null
        }

        if (root.data === searchQuery) {
            return {
                data: root.data,
                left: root.left.data,
                right: root.right.data
            }
        }

        if (searchQuery < root.data) {
            return searchNode(root.left, searchQuery)
        }

        if (searchQuery > root.data) {
            return searchNode(root.right, searchQuery)
        }
    }

    const printTree = (root) => {
        console.log('Log: ~> file: BinarySearchTree.js ~> line 64 ~> printTree ~> root', JSON.stringify(root || tree, undefined, 4))
    }

    const printInOrder = (root) => {
        if (root === null) {
            return
        }

        printInOrder(root.left)
        console.log(root.data)
        printInOrder(root.right)
    }


    const getNextSuccessor = (root) => {
        while (root.left !== null) {
            root = root.left
        }
        return root
    }

    const deleteNodeData = (root, deleteQuery) => {

        if (root.data > deleteQuery) {
            root.left = deleteNodeData(root.left, deleteQuery)
        } else if (root.data < deleteQuery) {
            root.right = deleteNodeData(root.right, deleteQuery)
        } else {
            if (root.left == null && root.right == null) {
                return null
            }

            if (root.left == null) {
                return root.right
            }
            else if (root.right == null) {
                return root.left
            }

            let rightNode = getNextSuccessor(root.right)
            root.data = rightNode.data
            root.right = deleteNodeData(root.right, rightNode.data)
            // return  root.right
        }
        return root
    }

    const printInRange = (root, min, max) => {

        if (root === null) {
            return null
        }

        if (root.data >= min && root.data <= max) {
            printInRange(root.left, min, max)
            rangeArray.push(root.data)
            printInRange(root.right, min, max)
        } else if (root.data >= max) {
            printInRange(root.left, min, max)
        } else if (max <= root.data) {
            printInRange(root.right, min, max)
        }
    }

    const printRangeArray = () => rangeArray


    const rootToLeaf = (root, path) => {

        if (root === null) {
            return null
        }

        path.push(root.data)

        if (!root.left && !root.right) {
            console.log('Log: ~> file: BinarySearchTree.js ~> line 138 ~> rootToLeaf ~> path', path.join(' ~> '))

        } else {
            rootToLeaf(root.left, path)
            rootToLeaf(root.right, path)
        }
        path.splice(path.length - 1)// pending

    }

    return { generateTree, searchNode, printTree, deleteNodeData, printInOrder, printInRange, printRangeArray, rootToLeaf }
}

const { generateTree, searchNode, printTree, deleteNodeData, printInOrder, printInRange, printRangeArray, rootToLeaf } = BinarySearchTree()

let root = generateTree(arr)
printTree(root)
printInOrder(root)
let searchResult = searchNode(root, 100)

const deletedNode = deleteNodeData(root, 5)
console.log('Log: ~> file: BinarySearchTree.js ~> line 124 ~> deletedNode')
printInOrder(deletedNode)
printTree(searchResult)

printInRange(root, 3, 10)
console.log('Log: ~> file: BinarySearchTree.js ~> line 149 ~> BinarySearchTree.rangeArray', printRangeArray())
 
rootToLeaf(root, [])