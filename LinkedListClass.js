class Node {
    constructor (data, next = null) {
        this.data = data
        this.next = next
    }
}

class LinkedList {
    constructor () {
        this.head = null;
        this.size = 0
    }
    // Insert first node
    insertFirst(data) {
        this.head = new Node(data, this.head)
        this.size++
    }
    // Insert last node
    insertLast(data) {
        let node = new Node(data)
        let current;

        if (!this.head) {
            this.head = node
        } else {
            current = this.head
            while (current.next) {
                current = current.next
            }

            current.next = node
        }
        this.size++
    }

    // Insert at index

    insertAt(data, index) {
        if (index > 0 && index > this.size) {
            return null
        }
        if (index === 0) {
            this.head = new Node(data, this.head)
            return
        }
        const node = new Node(data)
        let current, previous;
        current = this.head
        let count = 0;
        while (count < index) {
            previous = current
            count++
            current = current.next
        }
        node.next = current
        previous.next = node
        this.size++
    }
    // Get at index
    getAt(index) {
        let current = this.head
        let count = 0
        while (current) {
            if (count == index) {
                console.log(`node at index ${index} ~>`, current.data)
            }
            count++
            current = current.next
        }
        return
    }
    // Remove at index
    removeAt(index) {
        if (index > 0 && index > this.size) {
            return
        }
        let current = this.head
        let previous;
        let count = 0

        if (index === 0) {
            this.head = current.next
        } else {
            while (count < index) {
                count++
                previous = current
                current = current.next
            }
            previous.next = current.next
        }
        console.log(`deleting node at index ${index}`)
        this.size--
    }
    // Clear list
    clearList() {
        this.head = null
        this.size = 0
    }
    // Print list
    printListData() {
        let current = this.head
        const listArray = []
        while (current) {
            listArray.push(current.data)
            current = current.next
        }
        console.log('Log: ~> file: LinkedListFunctional.js ~> line 134 ~> printListData ~> listArray', listArray.join(' ~> '))

        console.log('size ~>', this.size)
    }
}

const ll = new LinkedList()
ll.insertFirst(123)
ll.insertFirst(100)

ll.insertFirst(123)
ll.insertLast(400)
ll.insertLast(200)
ll.insertLast(450)
ll.insertAt(1234321, 2)


ll.printListData()
ll.getAt(3)
ll.removeAt(2)
ll.printListData()