const Stack = () => {
    let items = []

    const push = (item) => {
        items.push(item)
        return
    }

    const pop = () => {
        if (items.length == 0)
            return "Stack is Empty";
        return items.pop()
    }

    const pick = () => {
        return items[items.length - 1]
    }

    const isEmpty = () => {
        return items.length === 0
    }

    const printStack = () => {
        let item = ''
        for (let i = 0; i < items.length; i++) {
            item += items[i] + (i == items.length - 1 ? '' : ' ~> ')
        }
        console.log(item)

    }

    return { push, pop, pick, isEmpty, printStack }

}

const { push, pop, pick, isEmpty, printStack } = Stack()

push(2)
push(4)
push(6)
push(12)
push(654)
const picked = pick()
console.log('Log: ~> file: js ~> line 43 ~> picked', picked)
const popped = pop()
console.log('Log: ~> file: js ~> line 45 ~> popped', popped)
const isEmptyStack = isEmpty()
console.log('Log: ~> file: js ~> line 47 ~> isEmptyStack', isEmptyStack)
printStack()


const postFix = (expression) => {
    const { push, pop } = Stack()

    for (let i = 0; i < expression.length; i++) {
        const item = expression[i];
        if (!isNaN(item)) {
            push(Number(item))
        } else {
            let value1 = pop()
            let value2 = pop()
            if (value1 !== 'Stack is Empty' && value2 !== 'Stack is Empty') {

                switch (item) {
                    case '+': {
                        push(value1 + value2)
                        break
                    }
                    case '-': {
                        push(value2 - value1)
                        break
                    }
                    case '/': {
                        push(value2 / value1)
                        break
                    }
                    case '*': {
                        push(value1 * value2)
                        break
                    }
                }
            }
            else return 'Stack is Empty'
        }
    }
    return pop();
}

console.log(postFix("123-+4+")); //# 4
console.log(postFix("43*1+"));   //# 13
console.log(postFix("43*1-+"));  //# Stack is Empty

