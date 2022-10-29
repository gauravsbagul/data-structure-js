const Node = (node, nextNode = null, prevNode = null) => {
    let data = node;
    let next = nextNode;
    let prev = prevNode;
    return { data, next, prev }
}


const DLL = () => {
    let head = null
    let tail = null
    let size = 0


    const insertFirst = (data) => {
        size++
        let node = Node(data, null, null)
        if (tail) {
            tail.next = node
            node.prev = tail
            tail = node
            return node
        }

        head = node
        tail = node
        return node
    }

    const insertBefore = (data, beforeData) => {
        if (!data || !beforeData) {
            return
        }

        let node = Node(data, null, null)
        let current, previous
        var count = 0
        current = head
        while (count < size) {
            count++

            if (current.data == beforeData) {
                node.next = current
                node.prev = current.prev
                current.prev.next = node
                current.prev = node
                size++
                break
            }
            current = current.next
        }

    }

    const deleteAt = (index) => {
        if (index > 0 && index > size) {
            return
        }

        if (index == 0) {
            head = null
            tail = null
        }

        let current = head
        let previous
        let count = 0

        while (count < index) {
            count++

            previous = current
            current = current.next
            current.prev = previous
        }
        previous.next = current.next
        current.next.prev = current.prev
        size--
    }


    const getAt = (index) => {
        let current = head
        let count = 0
        while (current) {
            if (count == index) {
                console.log(`node at ${index} ~> prev:${current.prev?.data} ~> current:${current.data} ~> next:${current.next?.data}`)
            }
            count++
            current = current.next
        }
    }


    const printDLL = () => {
        let current = head;
        while (current) {
            console.log(
                `${current.prev?.data || '@'} ~> ${current.data} ~> ${current.next?.data || '@'}`
            );
            current = current.next;
        }
    }



    return { insertFirst, printDLL, insertBefore, deleteAt, getAt }

}

const { insertFirst, printDLL, insertBefore, deleteAt, getAt } = DLL()


insertFirst(3)
insertFirst(7)
insertFirst(10)
insertFirst(13)
insertFirst(23)
insertFirst(34)
printDLL()
console.log('-----------------insertBefore-------------------')
insertBefore(10000, 13)
printDLL()
deleteAt(2)
console.log('-------------------deleteAt------------------')
printDLL()
getAt(3)

//# OUTPUT
// @ ~> 3 ~> 7
// 3 ~> 7 ~> 10
// 7 ~> 10 ~> 13
// 10 ~> 13 ~> 23
// 13 ~> 23 ~> 34
// 23 ~> 34 ~> @
// -----------------insertBefore-------------------
// @ ~> 3 ~> 7
// 3 ~> 7 ~> 10
// 7 ~> 10 ~> 10000
// 10 ~> 10000 ~> 13
// 10000 ~> 13 ~> 23
// 13 ~> 23 ~> 34
// 23 ~> 34 ~> @
// -------------------deleteAt------------------
// @ ~> 3 ~> 7
// 3 ~> 7 ~> 10000
// 7 ~> 10000 ~> 13
// 10000 ~> 13 ~> 23
// 13 ~> 23 ~> 34
// 23 ~> 34 ~> @
// node at 3 ~> prev:10000 ~> current:13 ~> next:23