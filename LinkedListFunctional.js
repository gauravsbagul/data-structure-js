const Node = (node, nextNode = null) => {
    let data = node;
    let next = nextNode;

    return { data, next }
}

const LinkedList = () => {
    let head = null
    let size = 0;

    const insertFirst = (data) => {
        head = Node(data, head)
        size++
    }

    const insertLast = (data) => {
        let node = Node(data);
        let current

        if (!head) {
            head = node
        } else {
            current = head
            while (current.next) {
                current = current.next
            }
            current.next = node
            size++
        }
    }

    const insertAt = (data, index) => {

        if (index > 0 && index > size) {
            return
        }

        if (index === 0) {
            head = Node(data, head)
            return
        }
        let node = Node(data)
        let current, previous
        let count = 0
        current = head

        while (count < index) {
            previous = current
            count++
            current = current.next
        }

        node.next = current
        previous.next = node
        size++
    }
    //# [] => [] => [beforeData] => [] => []
    //#          <=    
    const insertBefore = (data, beforeData) => {

        if (!data || !beforeData) {
            return
        }

        let node = Node(data)
        let current, previous
        let count = 0
        current = head

        while (count < size) {
            previous = current
            count++
            current = current.next
            if (current.data == beforeData) {
                previous.next = node
                node.next = current
                size++
                break
            }
        }

    }


    const deleteAt = (index) => {
        if (index > 0 && index > size) {
            return
        }

        if (index === 0) {
            head = null
            return
        }

        let current = head
        let previous
        let count = 0

        while (count < index) {
            count++
            previous = current
            current = current.next
        }
        previous.next = current.next
        size--
    }

    const getAt = (index) => {

        let current = head
        let count = 0
        while (current) {
            if (count == index) {
                console.log(`node at ${index} is ~>[`, current.data, ']')
            }
            count++
            current = current.next
        }
    }

    const clearList = () => {
        head = null
        size = 0
    }

    const printListData = () => {
        let current = head
        const listArray = []
        while (current) {
            listArray.push(current.data)
            current = current.next
        }
        console.log('Log: ~> file: LinkedListFunctional.js ~> line 134 ~> printListData ~> listArray[', listArray.join(' ] ~> [ ') ,']')

        console.log('size ~>', size)
    }

    return { insertFirst, insertLast, insertAt, deleteAt, getAt, clearList, printListData, insertBefore }
}

const { insertFirst, insertLast, insertAt, deleteAt, getAt, clearList, printListData, insertBefore } = LinkedList()

insertFirst(40)
insertLast(1)
insertLast(23)
insertLast(98)
insertLast(100)
insertAt(99, 2)
deleteAt(3)
getAt(2)

printListData()

insertBefore('777', 98)

printListData()

//# OUTPUT
// node at 2 is ~>[ 99 ]
// Log: ~> file: LinkedListFunctional.js ~> line 134 ~> printListData ~> listArray[ 40 ] ~> [ 1 ] ~> [ 99 ] ~> [ 98 ] ~> [ 100 ]
// size ~> 5
// Log: ~> file: LinkedListFunctional.js ~> line 134 ~> printListData ~> listArray[ 40 ] ~> [ 1 ] ~> [ 99 ] ~> [ 777 ] ~> [ 98 ] ~> [ 100 ]
// size ~> 6