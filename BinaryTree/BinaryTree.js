
//# const preOrder = [9, 1, 5, -1, -1, 6, -1, -1, 3, -1, 7, 8]
const preOrder = [9, 1, 5, 6, -1, -1, 3, -1, 7, 8, -1, -1, -1, 1213, 291, -1, -1, -1, 10, -1, 123, 99]
const subTree = [10, -1, 123, 99]


const Node = (node, l = null, r = null) => {
    const data = node
    const left = l;
    const right = r

    return { data, left, right }
}

const BinaryTree = () => {
    let index = -1
    let tree = null

    // Generate tree
    const buildTree = (rawArray) => {
        index++
        if (rawArray[index] === -1 || !rawArray[index]) {
            return null
        }
        const newNode = Node(rawArray[index])
        newNode.left = buildTree(rawArray)
        newNode.right = buildTree(rawArray)
        tree = newNode
        return newNode
    }

    // Print tree
    const printTree = (tree) => {
        console.log('Log: ~> file: BinaryTree.js ~> line 30 ~> printTree ~> tree', JSON.stringify(tree, undefined, 4))
    }

    // Pre Order preOrderTraversal AKA DFS
    const preOrderArray = []
    const preOrderTraversal = (root) => {
        if (!root) {
            return null
        }
        preOrderArray.push(root.data)
        preOrderTraversal(root.left)
        preOrderTraversal(root.right)
    }

    // In Order preOrderTraversal AKA DFS
    const inOrderArray = []
    const inOrderTraversal = (root) => {
        if (!root) {
            return null
        }
        inOrderTraversal(root.left)
        inOrderArray.push(root.data)
        inOrderTraversal(root.right)
    }

    // Post Order preOrderTraversal AKA DFS
    const postOrderArray = []
    const postOrderTraversal = (root) => {
        if (!root) {
            return null
        }
        postOrderTraversal(root.left)
        postOrderTraversal(root.right)
        postOrderArray.push(root.data)
    }

    // Level Order AKA BFS
    const levelOrder = (root) => {
        let queue = []
        if (!root) {
            return null
        }
        queue.push(root)
        queue.push(null)
        while (queue.length) {
            const current = queue.shift()
            if (!current) {
                console.log('\n')
                if (!queue.length) {
                    break
                } else {
                    queue.push(null)
                }
            } else {
                console.log(current.data)
                if (current.left) {
                    queue.push(current.left)
                }
                if (current.right) {
                    queue.push(current.right)
                }
            }
        }
    }

    // Count Nodes 
    const countNodes = (root) => {
        if (!root) {
            return 0
        }

        const leftNodes = countNodes(root.left)
        const rightNods = countNodes(root.right)

        return leftNodes + rightNods + 1
    }

    // Sum of Nodes 
    const sumOfNodes = (root) => {
        if (!root) {
            return 0
        }

        const leftNodes = sumOfNodes(root.left)
        const rightNods = sumOfNodes(root.right)

        return leftNodes + rightNods + root.data
    }

    // Height of Tree
    const heightOfTree = (root) => {
        if (!root) {
            return 0
        }

        const leftHeight = heightOfTree(root.left)
        const rightHeight = heightOfTree(root.right)

        return Math.max(leftHeight, rightHeight) + 1
    }

    // Diameter of the tree
    const diameterOfTree = (root) => {
        if (!root) {
            return 0
        }
        let diameterLeft = diameterOfTree(root.left)
        let diameterRight = diameterOfTree(root.right)
        let diameterRoot = heightOfTree(root.left) + heightOfTree(root.right) + 1
        return Math.max(diameterLeft, Math.max(diameterRight, diameterRoot))
    }

    // Check for identical tree
    const isIdentical = (root, subRoot) => {

        if (!subRoot && !root) {
            return true
        }

        if (!root || !subRoot) {
            return false
        }
        if (root.data = subRoot.data) {
            return isIdentical(root.left, subRoot.left) && isIdentical(root.right, subRoot.right)
        }

        return false
    }

    // Check for subTree's existence
    const isSubTree = (root, subRoot) => {
        if (!subRoot) {
            return true
        }

        if (!root) {
            return false
        }

        if (root.data === subRoot.data) {
            if (isIdentical(root, subRoot)) {
                return true
            }
        }

        return isSubTree(root.left, subRoot) || isSubTree(root.right, subRoot)

    }

    // Replace the old node with new node
    const replaceNode = (root, oldData, newData) => {

        if (!oldData || !root) {
            return null
        }

        if (root.data === oldData) {
            root.data = newData
            return
        }

        replaceNode(root.left, oldData, newData)
        replaceNode(root.right, oldData, newData)
    }

    // Search for given node and return only its children's data
    const searchNode = (root, queryData) => {

        if (!queryData || !root) {
            return null
        }

        if (root.data === queryData) {
            return {
                data: root.data,
                left: root.left?.data || null,
                right: root.right?.data || null,
            }
        }

        const leftSearch = searchNode(root.left, queryData)
        const rightSearch = searchNode(root.right, queryData)
        return leftSearch || rightSearch
    }

    const eitherSideNodes = []
    let maxLevelR = 0
    // Side visible node
    const eitherSideVisible = (root, level, side) => {

        const [first, second] = side === 'l' ? ['left', 'right'] : ['right', 'left']

        if (!root) {
            return null
        }

        if (maxLevelR < level) {
            eitherSideNodes.push(root.data)
            maxLevelR = level
        }

        eitherSideVisible(root[first], level + 1, side)
        eitherSideVisible(root[second], level + 1, side)
    }


    const nodesArray = []
    const leftNodesView = []
    // Left side visible node
    //!IMPORTANT: NOT WORKING AS EXPECTED
    const leftSideVisible = (root) => {

        if (!root) {
            return null
        }

        nodesArray.push(root)
        let count = 0
        while (heightOfTree(root) >= count) {
            const current = nodesArray[count]
            if (current) {
                leftNodesView.push(current.data)
            }
            count++
            if (current?.left) {
                nodesArray.push(current.left)
            }
            if (current && !current?.left) {
                nodesArray.push(current?.right)
            }
        }
    }

    // Get all leaf nodes
    const leafs = []
    const leafNode = (root) => {
        if (!root) {
            return null
        }
        if (!root.left && !root.right) {
            leafs.push(root.data)
        }
        leafNode(root.left)
        leafNode(root.right)
    }

    return { buildTree, printTree, preOrderTraversal, preOrderArray, inOrderTraversal, inOrderArray, postOrderTraversal, postOrderArray, levelOrder, countNodes, sumOfNodes, heightOfTree, diameterOfTree, isSubTree, replaceNode, searchNode, eitherSideVisible, eitherSideNodes, leftSideVisible, nodesArray, leftNodesView, leafNode, leafs }
}

const { buildTree, printTree, preOrderTraversal, preOrderArray, inOrderTraversal, inOrderArray, postOrderTraversal, postOrderArray, levelOrder, countNodes, sumOfNodes, heightOfTree, diameterOfTree, isSubTree, replaceNode, searchNode, eitherSideVisible, eitherSideNodes, leftSideVisible, leftSideNodes, leftNodesView, leafNode, leafs } = BinaryTree()

const root = buildTree(preOrder)

printTree(root)

console.log('Log: ~> file: BinaryTree.js ~> line 130 ~> preOrderTraversal')
preOrderTraversal(root)

console.log('Log: ~> file: BinaryTree.js ~> line 290 ~> preOrderArray', preOrderArray)

console.log('Log: ~> file: BinaryTree.js ~> line 133 ~> inOrderTraversal')
inOrderTraversal(root)
console.log('Log: ~> file: BinaryTree.js ~> line 297 ~> inOrderArray', inOrderArray)

console.log('Log: ~> file: BinaryTree.js ~> line 136 ~> postOrderTraversal')
postOrderTraversal(root)
console.log('Log: ~> file: BinaryTree.js ~> line 301 ~> postOrderArray', postOrderArray)

console.log('Log: ~> file: BinaryTree.js ~> line 139 ~> levelOrder')
levelOrder(root)

console.log('Log: ~> file: BinaryTree.js ~> line 142 ~> countNodes')
const countOfNodes = countNodes(root)
console.log('Log: ~> file: BinaryTree.js ~> line 132 ~> countOfNodes', countOfNodes)

console.log('Log: ~> file: BinaryTree.js ~> line 102 ~> countNodes')

const sum = sumOfNodes(root)
console.log('Log: ~> file: BinaryTree.js ~> line 147 ~> sum', sum)

const height = heightOfTree(root)
console.log('Log: ~> file: BinaryTree.js ~> line 166 ~> height', height)

const diameter = diameterOfTree(root)
console.log('Log: ~> file: BinaryTree.js ~> line 179 ~> diameter', diameter)

const subRoot = BinaryTree().buildTree(subTree)

printTree(subRoot)

const isSubTreeIncludes = isSubTree(root, subRoot)
console.log('Log: ~> file: BinaryTree.js ~> line 240 ~> isSubTreeIncludes', isSubTreeIncludes)

replaceNode(root, 7, 100)

printTree(root)

const search = searchNode(root, 3)
console.log('Log: ~> file: BinaryTree.js ~> line 284 ~> search', search)

leftSideVisible(root)

console.log('Log: ~> file: BinaryTree.js ~> line 340 ~> leftNodesView', leftNodesView)

eitherSideVisible(root, 1, 'r')

console.log('Log: ~> file: BinaryTree.js ~> line 302 ~> eitherSideNodes', eitherSideNodes)

leafNode(root)
console.log('Log: ~> file: BinaryTree.js ~> line 361 ~> leaf', leafs)
